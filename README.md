# Fukuoka Family Trip 2026

手機優先的福岡 9 日家庭旅行行程網站，日期為 2026/08/11–08/19。

GitHub Pages：<https://erickaoshoulin.github.io/fukuoka-family-trip-2026/>

網站包含：

- Day 1–9 每日行程卡與快速日期選擇
- Day 4–8 JR 周遊券標記與 5 日使用區間
- 航班摘要、已訂餐廳與室內景點提醒
- 每個景點、餐廳、交通點的 Google 地圖入口
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

網站資料集中在 `app/page.tsx`，地圖連結使用 Google Maps search URL；若要更換分店或補上住宿，直接修改對應的 `mapQuery` 即可。

公開頁面只保留航班時間，不包含原始機票截圖中的訂位代碼或個人資料。
