"use client";

import { useState, type CSSProperties } from "react";
import {
  accommodations,
  dayPlans,
  lastChecked,
  type ItineraryItem,
  type StopKind,
} from "./itinerary-data";

const filters = [
  { key: "all", label: "全部 9 天" },
  { key: "jr", label: "JR Pass 日" },
  { key: "indoor", label: "室內優先" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

function MapButton({ item }: { item: ItineraryItem }) {
  if (!item.mapUrl) return null;

  return (
    <a
      className="map-button"
      href={item.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`在 Google 地圖開啟 ${item.title}`}
    >
      <span aria-hidden="true">↗</span> Google 地圖
    </a>
  );
}

function OfficialButton({ item }: { item: ItineraryItem }) {
  if (!item.officialUrl) return null;

  return (
    <a
      className="official-button"
      href={item.officialUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`開啟 ${item.title} 的官方資訊`}
    >
      官方資訊 ↗
    </a>
  );
}

function StatusPills({ statuses }: { statuses: ItineraryItem["statuses"] }) {
  return (
    <span className="status-pills" aria-label={`狀態：${statuses.join("、")}`}>
      {statuses.map((status) => (
        <span className="status-pill" key={status}>
          {status}
        </span>
      ))}
    </span>
  );
}

function StopIcon({ kind = "spot" }: { kind?: StopKind }) {
  const icon =
    kind === "food"
      ? "餐"
      : kind === "shopping"
        ? "買"
        : kind === "transit"
          ? "站"
          : kind === "flight"
            ? "飛"
            : kind === "hotel"
              ? "宿"
              : "點";

  return (
    <span className={`stop-icon stop-icon-${kind}`} aria-hidden="true">
      {icon}
    </span>
  );
}

function AgendaRow({ item, index }: { item: ItineraryItem; index: number }) {
  return (
    <div className="agenda-row">
      <div className="agenda-order" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="agenda-time">{item.time ?? "彈性"}</div>
      <StopIcon kind={item.kind} />
      <div className="agenda-copy">
        <div className="agenda-title-line">
          <strong>{item.title}</strong>
          <StatusPills statuses={item.statuses} />
        </div>
        <p>{item.detail}</p>
        {(item.duration || item.cost) && (
          <div className="item-meta">
            {item.duration && <span>時長：{item.duration}</span>}
            {item.cost && <span>費用：{item.cost}</span>}
          </div>
        )}
        <div className="item-actions">
          <MapButton item={item} />
          <OfficialButton item={item} />
        </div>
      </div>
    </div>
  );
}

function LocationCard({ item }: { item: ItineraryItem }) {
  return (
    <article className="location-card">
      <div className="location-heading">
        <StopIcon kind={item.kind} />
        <strong>{item.title}</strong>
      </div>
      <p>{item.detail}</p>
      <StatusPills statuses={item.statuses} />
      <div className="item-actions">
        <MapButton item={item} />
        <OfficialButton item={item} />
      </div>
    </article>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [shared, setShared] = useState(false);

  const visibleDays = dayPlans.filter((plan) => {
    if (selectedDay !== null && plan.dayNumber !== selectedDay) return false;
    if (filter === "jr") return plan.railPassDay !== undefined;
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
      title: "2026 福岡・北九州・豪斯登堡親子旅行",
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
          <a href="#accommodation">住宿</a>
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
            2026 福岡・<em>北九州・豪斯登堡</em>
          </h1>
          <p className="hero-lede">
            親子旅行九天八夜，一天一個主景點，把室內舒適、美食預約與交通緩衝留在同一張行程卡裡。
          </p>
          <div className="hero-meta" aria-label="旅行摘要">
            <span>2026.08.11 — 08.19</span>
            <span>2 大 2 小</span>
            <span>JST／Asia-Tokyo</span>
            <span className="pass-pill">JR PASS · 8/14–8/18</span>
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
          <p>台灣與日本各自使用當地時間；公開頁面只保留航班資訊，不放訂位憑證。</p>
        </div>
        <div className="flight-grid">
          <article className="flight-card outbound">
            <div className="flight-card-top">
              <span className="flight-label">去程 · 8/11 週二</span>
              <span className="flight-status">EVA Air</span>
            </div>
            <div className="flight-route">
              <div>
                <strong>TPE</strong>
                <small>08:00<br />台灣時間</small>
              </div>
              <div className="flight-line"><span>BR106</span><i>✈</i></div>
              <div className="align-right">
                <strong>FUK</strong>
                <small>11:20<br />日本時間</small>
              </div>
            </div>
            <div className="flight-actions">
              <MapButton item={{ id: "tpe", title: "桃園機場 T2", detail: "", kind: "flight", statuses: ["交通"], mapUrl: "https://www.google.com/maps/search/?api=1&query=Taiwan%20Taoyuan%20International%20Airport%20Terminal%202" }} />
              <a className="official-button" href="https://booking.evaair.com/flyeva/eva/b2c/flight-schedules.aspx?lang=zh-tw" target="_blank" rel="noopener noreferrer">EVA 航班查詢 ↗</a>
            </div>
          </article>
          <article className="flight-card return">
            <div className="flight-card-top">
              <span className="flight-label">回程 · 8/19 週三</span>
              <span className="flight-status">EVA Air</span>
            </div>
            <div className="flight-route">
              <div>
                <strong>FUK</strong>
                <small>12:20<br />日本時間</small>
              </div>
              <div className="flight-line"><span>BR105</span><i>✈</i></div>
              <div className="align-right">
                <strong>TPE</strong>
                <small>13:45<br />台灣時間</small>
              </div>
            </div>
            <div className="flight-actions">
              <MapButton item={{ id: "fuk", title: "福岡機場國際線", detail: "", kind: "flight", statuses: ["交通"], mapUrl: "https://www.google.com/maps/search/?api=1&query=Fukuoka%20Airport%20International%20Terminal" }} />
              <a className="official-button" href="https://booking.evaair.com/flyeva/eva/b2c/flight-status.aspx?lang=zh-tw" target="_blank" rel="noopener noreferrer">航班狀態 ↗</a>
            </div>
          </article>
        </div>
      </section>

      <section className="overview-band" aria-label="行程總覽">
        <div className="stats">
          <div><strong>09</strong><span>天的故事</span></div>
          <div><strong>08</strong><span>晚住宿</span></div>
          <div><strong>05</strong><span>JR Pass 日</span></div>
        </div>
        <div className="route-ribbon" aria-label="旅程路線">
          <span>FUK</span><i>→</i><span>中洲</span><i>→</i><span>北九州</span><i>→</i><span>天神／博多</span><i>→</i><span>豪斯登堡</span><i>→</i><span>海之中道</span>
        </div>
      </section>

      <section className="accommodation-section" id="accommodation" aria-labelledby="accommodation-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">STAY TIMELINE</p>
            <h2 id="accommodation-title">住宿切換，先看這條線。</h2>
          </div>
          <p className="section-note">每次換飯店都把寄放行李與 Check-in 留成明確節點。</p>
        </div>
        <div className="accommodation-grid">
          {accommodations.map((stay, index) => (
            <article className="accommodation-card" key={`${stay.name}-${index}`}>
              <div className="accommodation-period">{stay.period}</div>
              <h3>{stay.name}</h3>
              <p>{stay.detail}</p>
              <div className="item-actions">
                <a className="map-button" href={stay.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`在 Google 地圖開啟 ${stay.name}`}><span aria-hidden="true">↗</span> Google 地圖</a>
                {stay.officialUrl && <a className="official-button" href={stay.officialUrl} target="_blank" rel="noopener noreferrer">官方資訊 ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="itinerary-section" id="itinerary" aria-labelledby="itinerary-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE DAILY EDIT</p>
            <h2 id="itinerary-title">每天一張卡，照著走就好。</h2>
          </div>
          <p className="section-note">地點提供 Google 地圖與可用的官方資訊入口；狀態以文字呈現，不只靠顏色。</p>
        </div>

        <div className="day-picker" aria-label="快速選擇日期">
          <button className={selectedDay === null ? "active" : ""} type="button" onClick={() => setSelectedDay(null)}>全部</button>
          {dayPlans.map((plan) => (
            <button className={selectedDay === plan.dayNumber ? "active" : ""} key={plan.dayNumber} type="button" onClick={() => jumpToDay(plan.dayNumber)} aria-label={`查看 Day ${plan.dayNumber}，${plan.title}`}>
              <b>{String(plan.dayNumber).padStart(2, "0")}</b>
              <span>{plan.date}</span>
            </button>
          ))}
        </div>

        <div className="filter-row" aria-label="篩選行程">
          <span>篩選：</span>
          {filters.map((filterItem) => (
            <button key={filterItem.key} className={filter === filterItem.key ? "active" : ""} type="button" onClick={() => setFilter(filterItem.key)} aria-pressed={filter === filterItem.key}>{filterItem.label}</button>
          ))}
          {selectedDay !== null && <button className="clear-day" type="button" onClick={() => setSelectedDay(null)}>顯示全部日期 ×</button>}
        </div>

        <div className="day-list">
          {visibleDays.map((plan) => (
            <article className={`day-card${plan.railPassDay ? " has-pass" : ""}${plan.warnings.length ? " has-warning" : ""}`} id={`day-${plan.dayNumber}`} key={plan.dayNumber} style={{ "--day-accent": plan.accent } as CSSProperties}>
              <div className="day-marker">
                <span>DAY</span>
                <strong>{String(plan.dayNumber).padStart(2, "0")}</strong>
                <small>{plan.weekday}</small>
              </div>
              <div className="day-content">
                <div className="day-topline">
                  <div>
                    <p className="day-date">{plan.date} · {plan.weekday}</p>
                    <h3><span aria-hidden="true">{plan.emoji}</span> {plan.title}</h3>
                  </div>
                  {plan.railPassDay && <span className="jr-badge">JR KYUSHU RAIL PASS · DAY {plan.railPassDay}/5</span>}
                </div>
                <p className="day-summary">{plan.summary}</p>
                <div className="tag-row"><span className="tag-label">狀態</span><span className="tag-statuses"><StatusPills statuses={plan.status} /></span></div>

                <div className="stay-line">
                  <span className="detail-label">住宿</span>
                  <strong>{plan.accommodation.name}</strong>
                  <span>{plan.accommodation.period}｜{plan.accommodation.detail}</span>
                  <div className="item-actions">
                    <a className="map-button" href={plan.accommodation.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`在 Google 地圖開啟 ${plan.accommodation.name}`}><span aria-hidden="true">↗</span> Google 地圖</a>
                    {plan.accommodation.officialUrl && <a className="official-button" href={plan.accommodation.officialUrl} target="_blank" rel="noopener noreferrer">官方資訊 ↗</a>}
                  </div>
                </div>

                {plan.warnings.length > 0 && (
                  <aside className={`warning-box${plan.dayNumber === 3 ? " critical-warning" : ""}`} aria-label={`${plan.title} 行前警示`}>
                    <strong>{plan.dayNumber === 3 ? "⚠ Day 3 時間衝突" : "⚠ 行前確認"}</strong>
                    {plan.warnings.map((warning) => <p key={warning}>{warning}</p>)}
                  </aside>
                )}

                <div className="detail-grid">
                  <div><b>交通</b><p>{plan.transport}</p></div>
                  <div><b>餐飲</b><p>{plan.meals.join("｜")}</p></div>
                  {plan.duration && <div><b>時間</b><p>{plan.duration}</p></div>}
                  {plan.cost && <div><b>費用</b><p>{plan.cost}</p></div>}
                </div>

                <div className="agenda-section">
                  <div className="subsection-heading"><span>DAILY FLOW</span><strong>行程節點</strong></div>
                  <div className="agenda-list">
                    {plan.events.map((event, index) => <AgendaRow item={event} index={index} key={event.id} />)}
                  </div>
                </div>

                <div className="locations-section">
                  <div className="subsection-heading"><span>MAP STOPS</span><strong>地點與官方連結</strong></div>
                  <div className="location-grid">
                    {plan.locations.map((location) => <LocationCard item={location} key={location.id} />)}
                  </div>
                </div>

                {plan.notes.length > 0 && <div className="notes-inline"><b>備註</b>{plan.notes.map((note) => <p key={note}>{note}</p>)}</div>}
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
            <h2 id="pass-title">8/14–8/18 · JR Pass Day 1–5。</h2>
            <p>已按連續效期標示：8/14 Day 1、8/15 Day 2、8/16 Day 3、8/17 Day 4、8/18 Day 5。票種與涵蓋範圍尚待購票資料確認；福岡地鐵、計程車、高速船不因持有 JR Pass 就標示為免費。</p>
          </div>
          <div className="pass-window"><span>VALID</span><strong>8/14<br />— 8/18</strong></div>
        </div>
        <div className="pass-day-row" aria-label="JR Pass 連續效期日數">
          {["8/14", "8/15", "8/16", "8/17", "8/18"].map((date, index) => <div key={date}><strong>Day {index + 1}</strong><span>{date}</span></div>)}
        </div>
        <div className="notes-grid">
          <article><span className="note-number">01</span><h3>Day 3 先確認票券流程</h3><p>07:40 報到與約 08:00 出發互相衝突，網站完整保留並列為第一優先待確認。</p></article>
          <article><span className="note-number">02</span><h3>八月把室內當主場</h3><p>麵包超人、KidZania、生命之旅與 Marine World 都保留降溫餘裕；海濱公園只作彈性行程。</p></article>
          <article><span className="note-number">03</span><h3>出發前再點一次官方連結</h3><p>列車指定席、船班、天候、分店、營業時間與機場登機門都可能變動；本頁最後檢查日為 {lastChecked}。</p></article>
        </div>
      </section>

      <footer className="site-footer">
        <div><span className="footer-mark">FUK</span><strong>2026 福岡・北九州・豪斯登堡親子旅行</strong></div>
        <span>8.11 — 8.19 · 2026 · 2 大 2 小</span>
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
