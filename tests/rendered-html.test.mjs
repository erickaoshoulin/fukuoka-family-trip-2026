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
  assert.match(html, /一起去福岡/);
  assert.match(html, /生命之旅・小倉・門司港/);
  assert.match(html, /JR PASS/);
  assert.match(html, /Google 地圖/);
  assert.match(html, /福岡麵包超人兒童博物館/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps booking-code information out of the public page", async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /F6XVYB/i);
  assert.match(html, /公開頁面只保留航班時間，不放訂位代碼/);
});
