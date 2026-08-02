"use client";

import { useState, type CSSProperties } from "react";

type Stop = {
  name: string;
  detail: string;
  mapQuery: string;
  kind?: "flight" | "food" | "spot" | "shopping" | "transit";
};

type DayPlan = {
  day: number;
  date: string;
  weekday: string;
  title: string;
  summary: string;
  emoji: string;
  accent: string;
  tags: string[];
  transport: string;
  stops: Stop[];
  dinner?: string;
  jrPass?: boolean;
  indoor?: boolean;
};

const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const dayPlans: DayPlan[] = [
  {
    day: 1,
    date: "8/11",
    weekday: "週二",
    title: "抵達福岡・中洲夜散步",
    summary: "先把行李放好，從機場一路進入福岡的夜晚。",
    emoji: "✈️",
    accent: "#ff836c",
    tags: ["抵達日", "慢慢走", "晚餐已訂"],
    transport: "福岡機場 → 市區；以地鐵或計程車銜接住宿",
    stops: [
      {
        name: "福岡機場 FUK",
        detail: "BR106｜08:00 TPE → 11:20 FUK",
        mapQuery: "Fukuoka Airport",
        kind: "flight",
      },
      {
        name: "中洲・中洲川端",
        detail: "入住後逛街、河畔散步，留體力給後面行程",
        mapQuery: "中洲川端 福岡",
        kind: "spot",
      },
      {
        name: "利花苑 中洲店",
        detail: "晚餐｜已訂位",
        mapQuery: "利花苑 中洲店 福岡",
        kind: "food",
      },
    ],
    dinner: "利花苑",
  },
  {
    day: 2,
    date: "8/12",
    weekday: "週三",
    title: "麵包超人・Canal City 採買",
    summary: "室內親子主場，下午把 ON／HOKA 一次買齊。",
    emoji: "🍞",
    accent: "#f2b84b",
    tags: ["室內優先", "親子", "購物"],
    transport: "中洲川端／博多市區移動；雨天也好走",
    stops: [
      {
        name: "福岡麵包超人兒童博物館",
        detail: "上午主景點｜預留親子體驗時間",
        mapQuery: "福岡麵包超人兒童博物館",
        kind: "spot",
      },
      {
        name: "Canal City Hakata",
        detail: "逛街、用餐，接續品牌採買",
        mapQuery: "Canal City Hakata",
        kind: "shopping",
      },
      {
        name: "On Running Fukuoka",
        detail: "ON 鞋款採買｜出發前確認店舖營業時間",
        mapQuery: "On Running Fukuoka",
        kind: "shopping",
      },
      {
        name: "HOKA Fukuoka",
        detail: "HOKA 鞋款採買｜可與 Canal City 一起安排",
        mapQuery: "HOKA Fukuoka",
        kind: "shopping",
      },
      {
        name: "春吉金魚",
        detail: "晚餐｜已訂位",
        mapQuery: "春吉金魚 福岡",
        kind: "food",
      },
    ],
    dinner: "春吉金魚",
    indoor: true,
  },
  {
    day: 3,
    date: "8/13",
    weekday: "週四",
    title: "KidZania・LaLaport",
    summary: "小小職人體驗接購物中心，節奏集中、移動不折返。",
    emoji: "👮",
    accent: "#4b9fb2",
    tags: ["室內優先", "KidZania", "親子"],
    transport: "前往 LaLaport Fukuoka；全天以館內活動為主",
    stops: [
      {
        name: "KidZania Fukuoka",
        detail: "上午至下午｜先確認預約與入場時間",
        mapQuery: "KidZania Fukuoka",
        kind: "spot",
      },
      {
        name: "Mitsui Shopping Park LaLaport Fukuoka",
        detail: "逛街、吃飯，接續親子休息時間",
        mapQuery: "Mitsui Shopping Park LaLaport Fukuoka",
        kind: "shopping",
      },
    ],
    indoor: true,
  },
  {
    day: 4,
    date: "8/14",
    weekday: "週五",
    title: "生命之旅・小倉・門司港",
    summary: "北九州一日移動日；先看恐龍，再把小倉與港町收進來。",
    emoji: "🦖",
    accent: "#8e72b8",
    tags: ["JR PASS", "博物館", "北九州"],
    transport: "JR 周遊券 Day 1／5｜福岡 → 小倉 → 門司港",
    stops: [
      {
        name: "北九州市立生命之旅博物館",
        detail: "上午主景點｜恐龍與自然史館",
        mapQuery: "北九州市立生命之旅博物館",
        kind: "spot",
      },
      {
        name: "小倉站・小倉市區",
        detail: "午餐與市區散步；依體力彈性調整",
        mapQuery: "小倉站 福岡",
        kind: "transit",
      },
      {
        name: "門司港レトロ",
        detail: "傍晚港町散步，保留拍照時間",
        mapQuery: "門司港レトロ",
        kind: "spot",
      },
    ],
    jrPass: true,
    indoor: true,
  },
  {
    day: 5,
    date: "8/15",
    weekday: "週六",
    title: "天神・CELINE・泰元",
    summary: "把購物集中在天神，晚餐用燒肉收尾。",
    emoji: "🛍️",
    accent: "#de6d89",
    tags: ["JR PASS", "天神", "晚餐已訂"],
    transport: "JR 周遊券 Day 2／5｜市區以步行與地鐵銜接",
    stops: [
      {
        name: "天神站・天神商圈",
        detail: "上午開始逛街，預留百貨退稅時間",
        mapQuery: "天神站 福岡",
        kind: "shopping",
      },
      {
        name: "CELINE 岩田屋本店",
        detail: "CELINE 採買｜出發前確認專櫃營業時間",
        mapQuery: "CELINE 岩田屋本店 福岡",
        kind: "shopping",
      },
      {
        name: "燒肉 泰元",
        detail: "晚餐｜已訂位",
        mapQuery: "焼肉 泰元 福岡",
        kind: "food",
      },
    ],
    dinner: "燒肉泰元",
    jrPass: true,
  },
  {
    day: 6,
    date: "8/16",
    weekday: "週日",
    title: "豪斯登堡一整天",
    summary: "把時間留給園區，不塞第二個景點，晚上住好、睡飽。",
    emoji: "🌷",
    accent: "#e6a044",
    tags: ["JR PASS", "全日主景點", "少轉車"],
    transport: "JR 周遊券 Day 3／5｜福岡 → 豪斯登堡",
    stops: [
      {
        name: "豪斯登堡 Huis Ten Bosch",
        detail: "全日園區｜依季節活動與體力調整順序",
        mapQuery: "Huis Ten Bosch Nagasaki",
        kind: "spot",
      },
    ],
    jrPass: true,
  },
  {
    day: 7,
    date: "8/17",
    weekday: "週一",
    title: "豪斯登堡 → 福岡・華味鳥",
    summary: "上午從容離開，回到福岡後用水炊料理補充能量。",
    emoji: "🚆",
    accent: "#5b87c7",
    tags: ["JR PASS", "回福岡", "晚餐已訂"],
    transport: "JR 周遊券 Day 4／5｜豪斯登堡 → 博多",
    stops: [
      {
        name: "豪斯登堡 Huis Ten Bosch",
        detail: "退房／出發前最後散步",
        mapQuery: "Huis Ten Bosch Nagasaki",
        kind: "spot",
      },
      {
        name: "博多站",
        detail: "回到福岡後先整理行李、休息",
        mapQuery: "博多站 福岡",
        kind: "transit",
      },
      {
        name: "博多華味鳥",
        detail: "晚餐｜已訂位",
        mapQuery: "博多華味鳥 本店 福岡",
        kind: "food",
      },
    ],
    dinner: "華味鳥",
    jrPass: true,
  },
  {
    day: 8,
    date: "8/18",
    weekday: "週二",
    title: "海之中道・水族館・最後採買",
    summary: "親子友善的海邊室內景點，下午回天神／博多補最後清單。",
    emoji: "🚢",
    accent: "#4caaa0",
    tags: ["JR PASS", "水族館", "最後採買"],
    transport: "JR 周遊券 Day 5／5｜海之中道 → 天神／博多",
    stops: [
      {
        name: "海之中道海濱公園",
        detail: "上午移動與散步；依天氣調整停留時間",
        mapQuery: "海之中道海濱公園",
        kind: "spot",
      },
      {
        name: "Marine World 海之中道水族館",
        detail: "主要景點｜室內比例高，適合八月",
        mapQuery: "Marine World 海之中道水族館",
        kind: "spot",
      },
      {
        name: "天神商圈",
        detail: "最後採買、退稅與伴手禮",
        mapQuery: "天神商圈 福岡",
        kind: "shopping",
      },
      {
        name: "博多站・JR Hakata City",
        detail: "最後補貨與回程前整理",
        mapQuery: "JR Hakata City",
        kind: "shopping",
      },
    ],
    jrPass: true,
    indoor: true,
  },
  {
    day: 9,
    date: "8/19",
    weekday: "週三",
    title: "帶著回憶返台",
    summary: "不排景點，提早到機場，舒服結束九天旅程。",
    emoji: "✈️",
    accent: "#70838d",
    tags: ["返程日", "提早到機場"],
    transport: "市區 → 福岡機場；建議預留退稅與安檢時間",
    stops: [
      {
        name: "福岡機場 FUK",
        detail: "12:20 FUK → 13:45 TPE",
        mapQuery: "Fukuoka Airport International Terminal",
        kind: "flight",
      },
    ],
  },
];

const filters = [
  { key: "all", label: "全部 9 天" },
  { key: "jr", label: "JR Pass 日" },
  { key: "indoor", label: "室內優先" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

function MapButton({ query }: { query: string }) {
  return (
    <a
      className="map-button"
      href={mapsUrl(query)}
      target="_blank"
      rel="noreferrer"
      aria-label={`在 Google 地圖開啟 ${query}`}
    >
      <span aria-hidden="true">↗</span> Google 地圖
    </a>
  );
}

function StopIcon({ kind = "spot" }: { kind?: Stop["kind"] }) {
  const icon =
    kind === "food"
      ? "餐"
      : kind === "shopping"
        ? "買"
        : kind === "transit"
          ? "站"
          : kind === "flight"
            ? "飛"
            : "點";

  return <span className={`stop-icon stop-icon-${kind}`}>{icon}</span>;
}

export default function Home() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [shared, setShared] = useState(false);

  const visibleDays = dayPlans.filter((plan) => {
    if (selectedDay !== null && plan.day !== selectedDay) return false;
    if (filter === "jr") return plan.jrPass;
    if (filter === "indoor") return plan.indoor;
    return true;
  });

  const jumpToDay = (day: number) => {
    setSelectedDay(day);
    window.setTimeout(() => {
      document.getElementById(`day-${day}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const shareTrip = async () => {
    const shareData = {
      title: "福岡 9 日家庭行程",
      text: "8/11–8/19 福岡親子旅行行程與 Google 地圖清單",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 2400);
    } catch {
      setShared(false);
    }
  };

  return (
    <main className="trip-page">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="回到行程首頁">
          <span className="wordmark-mark">F</span>
          <span>
            FUKUOKA <small>FAMILY GUIDE</small>
          </span>
        </a>
        <nav className="topnav" aria-label="頁面導覽">
          <a href="#itinerary">每日行程</a>
          <a href="#transport">交通</a>
          <a href="#notes">備忘</a>
        </nav>
        <button className="share-button top-share" type="button" onClick={shareTrip}>
          <span aria-hidden="true">⌁</span> {shared ? "已複製" : "分享"}
        </button>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <span className="sun">✦</span>
          <span className="art-flower flower-one">✿</span>
          <span className="art-flower flower-two">✿</span>
          <span className="art-train">▰ ▰ ▰</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">FAMILY FIELD GUIDE · 9 DAYS / 8 NIGHTS</p>
          <h1 id="hero-title">
            一起去福岡，<em>慢慢玩。</em>
          </h1>
          <p className="hero-lede">
            一天一個主景點，把室內舒適、美食預約與 JR 周遊券串成一條不趕路的家庭旅行線。
          </p>
          <div className="hero-meta" aria-label="旅行摘要">
            <span>2026.08.11 — 08.19</span>
            <span>福岡・北九州・佐世保</span>
            <span className="pass-pill">JR PASS · DAY 4–8</span>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="#itinerary">
              看每日行程 <span aria-hidden="true">↓</span>
            </a>
            <button className="text-button" type="button" onClick={shareTrip}>
              分享給旅伴 <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        <div className="hero-stamp" aria-label="福岡旅程標記">
          <span>TRIP</span>
          <strong>FUK</strong>
          <small>TAIPEI → FUKUOKA</small>
        </div>
      </section>

      <section className="flight-panel" id="transport" aria-labelledby="flight-title">
        <div className="section-intro compact-intro">
          <p className="eyebrow">FLIGHT NOTES</p>
          <h2 id="flight-title">先把兩段飛行記好</h2>
          <p>公開頁面只保留航班時間，不放訂位代碼。</p>
        </div>
        <div className="flight-grid">
          <article className="flight-card outbound">
            <div className="flight-card-top">
              <span className="flight-label">去程 · 8/11 週二</span>
              <span className="flight-status">EVA Air</span>
            </div>
            <div className="flight-route">
              <div><strong>TPE</strong><small>08:00</small></div>
              <div className="flight-line"><span>BR106</span><i>✈</i></div>
              <div className="align-right"><strong>FUK</strong><small>11:20</small></div>
            </div>
            <MapButton query="Taiwan Taoyuan International Airport Terminal 2" />
          </article>
          <article className="flight-card return">
            <div className="flight-card-top">
              <span className="flight-label">回程 · 8/19 週三</span>
              <span className="flight-status">返台</span>
            </div>
            <div className="flight-route">
              <div><strong>FUK</strong><small>12:20</small></div>
              <div className="flight-line"><span>BR · 回程</span><i>✈</i></div>
              <div className="align-right"><strong>TPE</strong><small>13:45</small></div>
            </div>
            <MapButton query="Fukuoka Airport International Terminal" />
          </article>
        </div>
      </section>

      <section className="overview-band" aria-label="行程總覽">
        <div className="stats">
          <div><strong>09</strong><span>天的故事</span></div>
          <div><strong>01</strong><span>每日主景點</span></div>
          <div><strong>05</strong><span>JR Pass 日</span></div>
        </div>
        <div className="route-ribbon" aria-label="旅程路線">
          <span>FUK</span><i>→</i><span>中洲</span><i>→</i><span>小倉</span><i>→</i><span>門司港</span><i>→</i><span>豪斯登堡</span><i>→</i><span>海之中道</span>
        </div>
      </section>

      <section className="itinerary-section" id="itinerary" aria-labelledby="itinerary-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE DAILY EDIT</p>
            <h2 id="itinerary-title">每天一張卡，照著走就好。</h2>
          </div>
          <p className="section-note">每個地點都附 Google 地圖入口，點一下就能導航。</p>
        </div>

        <div className="day-picker" aria-label="快速選擇日期">
          <button
            className={selectedDay === null ? "active" : ""}
            type="button"
            onClick={() => setSelectedDay(null)}
          >
            全部
          </button>
          {dayPlans.map((plan) => (
            <button
              className={selectedDay === plan.day ? "active" : ""}
              key={plan.day}
              type="button"
              onClick={() => jumpToDay(plan.day)}
              aria-label={`查看 Day ${plan.day}，${plan.title}`}
            >
              <b>{String(plan.day).padStart(2, "0")}</b>
              <span>{plan.date}</span>
            </button>
          ))}
        </div>

        <div className="filter-row" aria-label="篩選行程">
          <span>篩選：</span>
          {filters.map((item) => (
            <button
              key={item.key}
              className={filter === item.key ? "active" : ""}
              type="button"
              onClick={() => setFilter(item.key)}
              aria-pressed={filter === item.key}
            >
              {item.label}
            </button>
          ))}
          {selectedDay !== null && (
            <button className="clear-day" type="button" onClick={() => setSelectedDay(null)}>
              顯示全部日期 ×
            </button>
          )}
        </div>

        <div className="day-list">
          {visibleDays.map((plan) => (
            <article
              className={`day-card${plan.jrPass ? " has-pass" : ""}`}
              id={`day-${plan.day}`}
              key={plan.day}
              style={{ "--day-accent": plan.accent } as CSSProperties}
            >
              <div className="day-marker">
                <span>DAY</span>
                <strong>{String(plan.day).padStart(2, "0")}</strong>
                <small>{plan.weekday}</small>
              </div>
              <div className="day-content">
                <div className="day-topline">
                  <div>
                    <p className="day-date">{plan.date} · {plan.weekday}</p>
                    <h3><span aria-hidden="true">{plan.emoji}</span> {plan.title}</h3>
                  </div>
                  {plan.jrPass && <span className="jr-badge">JR PASS</span>}
                </div>
                <p className="day-summary">{plan.summary}</p>
                <div className="tag-row">
                  {plan.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="stops-list">
                  {plan.stops.map((stop, index) => (
                    <div className="stop-row" key={`${plan.day}-${stop.name}`}>
                      <div className="stop-order">{String(index + 1).padStart(2, "0")}</div>
                      <StopIcon kind={stop.kind} />
                      <div className="stop-copy">
                        <strong>{stop.name}</strong>
                        <span>{stop.detail}</span>
                      </div>
                      <MapButton query={stop.mapQuery} />
                    </div>
                  ))}
                </div>
                <div className="day-bottomline">
                  <span><b>移動</b> {plan.transport}</span>
                  {plan.dinner && <span className="dinner-note"><b>晚餐</b> {plan.dinner}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pass-section" id="notes" aria-labelledby="pass-title">
        <div className="pass-card">
          <div className="pass-deco" aria-hidden="true">JR</div>
          <div>
            <p className="eyebrow">5-DAY RAIL WINDOW</p>
            <h2 id="pass-title">Day 4–8，JR 周遊券上場。</h2>
            <p>北九州、門司港、豪斯登堡、海之中道都集中在這段；實際可搭路線與指定席規則，請以手上的票種與官方公告為準。</p>
          </div>
          <div className="pass-window"><span>VALID</span><strong>8/14<br />— 8/18</strong></div>
        </div>
        <div className="notes-grid">
          <article>
            <span className="note-number">01</span>
            <h3>預約都放進晚餐節點</h3>
            <p>利花苑、春吉金魚、泰元、華味鳥已訂位；當天移動只要照卡片走即可。</p>
          </article>
          <article>
            <span className="note-number">02</span>
            <h3>八月把室內當主場</h3>
            <p>麵包超人、KidZania、生命之旅、水族館都留了遮陽與降溫餘裕。</p>
          </article>
          <article>
            <span className="note-number">03</span>
            <h3>地圖先收藏，當天再確認</h3>
            <p>連結是 Google 地圖搜尋入口；分店、營業時間與臨時休館請出發前再確認。</p>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <div><span className="footer-mark">FUK</span><strong>福岡家庭旅行手冊</strong></div>
        <span>8.11 — 8.19 · 2026</span>
      </footer>

      <nav className="mobile-bar" aria-label="手機快速導覽">
        <a href="#top"><span aria-hidden="true">⌂</span>首頁</a>
        <a href="#itinerary"><span aria-hidden="true">☷</span>行程</a>
        <button type="button" onClick={shareTrip}><span aria-hidden="true">⌁</span>{shared ? "已複製" : "分享"}</button>
        <a href="#notes"><span aria-hidden="true">✦</span>備忘</a>
      </nav>
    </main>
  );
}
