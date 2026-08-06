import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Fukuoka itinerary", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /FUKUOKA FAMILY GUIDE/i);
  assert.match(html, /2026 福岡.*北九州.*豪斯登堡/);
  assert.match(html, /北九州恐龍.*Outlet/);
  assert.equal((html.match(/JR KYUSHU RAIL PASS · DAY/g) ?? []).length, 5);
  assert.match(html, /8\/14[\s\S]{0,120}8\/18/);
  assert.match(html, /Google 地圖/);
  assert.match(html, /福岡麵包超人兒童博物館/);
  assert.match(html, /博多華味鳥.*博多站筑紫口/);
  assert.match(html, /18:00/);
  assert.match(html, /Day 3 時間衝突/);
  assert.match(html, /報到與出發時間/);
  assert.match(html, /Marine World/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps booking-code information out of the public page", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /公開頁面只保留航班資訊，不放訂位憑證/);
  assert.doesNotMatch(html, /訂位代碼|訂位姓名|reservation code|booking code/i);
});
