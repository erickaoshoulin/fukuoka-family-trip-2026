# Fukuoka Family Trip 2026

手機優先的「2026 福岡・北九州・豪斯登堡親子旅行」行程網站，日期為 2026/08/11–08/19，9 天 8 夜、2 大 2 小。

GitHub Pages：<https://erickaoshoulin.github.io/fukuoka-family-trip-2026/>

網站包含：

- Day 1–9 每日行程卡與快速日期選擇
- Day 1–9 每日活動、交通、餐飲、購物、住宿與行前提醒
- JR Kyushu Rail Pass 8/14–8/18 連續 Day 1–5 標記
- 航班摘要、已訂餐廳、室內景點與天候彈性提醒
- 每個重要景點、餐廳、交通點與飯店的 Google 地圖入口
- 可用的官方景點、交通、機場與餐廳資訊連結
- 手機分享按鈕與連結預覽圖

## 本機執行

```bash
pnpm install
pnpm dev
```

正式建置：

```bash
pnpm build
pnpm test
```

網站資料集中在 `app/itinerary-data.ts`，地圖連結使用不需 API key 的 Google Maps search URL；若要更換分店或補上住宿，直接修改資料層的 `mapQuery` 與 `officialUrl` 即可。

公開頁面只保留航班、行程、住宿、餐廳名稱與狀態，不包含訂位代碼、訂位姓名、旅客姓名或其他可查詢／修改／取消訂位的憑證。不要把私人訂位資料加入 repository、前端環境變數或部署成品。

頁面最後一次官方資訊檢查日期：2026/08/06。列車班次、船班、天候、營業時間、登機門與 Day 7 華味鳥分店請依出發前最新公告或訂位畫面確認。
