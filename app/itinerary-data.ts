export type StopKind =
  | "flight"
  | "food"
  | "spot"
  | "shopping"
  | "transit"
  | "hotel";

export type ItineraryStatus =
  | "已預約"
  | "自由安排"
  | "待確認"
  | "親子景點"
  | "交通"
  | "飯店"
  | "用餐"
  | "購物"
  | "建議提前劃位"
  | "時間衝突"
  | "依天候調整";

export type ItineraryItem = {
  id: string;
  title: string;
  detail: string;
  kind: StopKind;
  time?: string;
  statuses: ItineraryStatus[];
  mapQuery?: string;
  mapUrl?: string;
  officialUrl?: string;
  duration?: string;
  cost?: string;
};

export type Accommodation = {
  period: string;
  name: string;
  detail: string;
  mapQuery: string;
  mapUrl: string;
  officialUrl?: string;
};

export type DayPlan = {
  dayNumber: number;
  date: string;
  weekday: string;
  title: string;
  summary: string;
  emoji: string;
  accent: string;
  accommodation: Accommodation;
  railPassDay?: number;
  events: ItineraryItem[];
  locations: ItineraryItem[];
  transport: string;
  meals: string[];
  status: ItineraryStatus[];
  cost?: string;
  duration?: string;
  notes: string[];
  warnings: string[];
  indoor?: boolean;
};

export const lastChecked = "2026/08/06";

export const officialLinks = {
  evaTimetable:
    "https://booking.evaair.com/flyeva/eva/b2c/flight-schedules.aspx?lang=zh-tw",
  evaFlightStatus:
    "https://booking.evaair.com/flyeva/eva/b2c/flight-status.aspx?lang=zh-tw",
  jrPass: "https://www.jrkyushu.co.jp/english/kyushurailpass/",
  kidZania: "https://www.kidzania.jp/fukuoka/",
  kidZaniaFlow: "https://www.kidzania.jp/en/guide/flow/fukuoka.html",
  lifeMuseum: "https://www.kmnh.jp/",
  outlet: "https://the-outlets-kitakyushu.aeonmall.com/",
  aeon: "https://yahatahigashi.aeonmall.jp/guide/hours",
  huisTenBosch: "https://www.huistenbosch.co.jp/",
  huisTrainAccess: "https://www.huistenbosch.co.jp/access/train/",
  hotelAmsterdam: "https://english.huistenbosch.co.jp/hotels/am/",
  hotelAmsterdamService:
    "https://english.huistenbosch.co.jp/hotels/am/service/",
  hanamidori: "https://www.hanamidori.net/",
  taigen: "https://www.taigen.jp/honkan.html",
  bayside: "https://www.baysideplace.jp/",
  ferryRoute: "https://yasuda-gp.net/hakata/uminaka-3",
  marineWorld: "https://marine-world.jp/general-guide/hours/",
  seasidePark: "https://uminaka-park.jp/guide/open-hour/",
  fukuokaAirport: "https://www.fukuoka-airport.jp/en/",
  airportInternationalFlow:
    "https://www.fukuoka-airport.jp/en/flight/flow_int/index.html?depArv=dep",
  matcha: "https://www.fukuoka-airport.jp/en/shops/matcha.html",
} as const;

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const item = (
  id: string,
  title: string,
  detail: string,
  kind: StopKind,
  options: Omit<ItineraryItem, "id" | "title" | "detail" | "kind">,
): ItineraryItem => ({
  id,
  title,
  detail,
  kind,
  ...options,
  ...(options.mapQuery ? { mapUrl: mapsUrl(options.mapQuery) } : {}),
});

const accommodation = (
  period: string,
  name: string,
  detail: string,
  mapQuery: string,
  officialUrl?: string,
): Accommodation => ({
  period,
  name,
  detail,
  mapQuery,
  mapUrl: mapsUrl(mapQuery),
  officialUrl,
});

const royalPark = accommodation(
  "8/11–8/15",
  "The Royal Park Canvas Fukuoka Nakasu",
  "福岡・中洲｜前段住宿基地",
  "The Royal Park Canvas Fukuoka Nakasu",
);

const forza = accommodation(
  "8/15–8/16、8/17–8/19",
  "FORZA 博多站筑紫口 2 館",
  "博多站筑紫口｜8/15 入住，8/17 回住至返台",
  "ホテルフォルツァ博多駅筑紫口Ⅱ 福岡",
);

const amsterdam = accommodation(
  "8/16–8/17",
  "Hotel Amsterdam Huis Ten Bosch",
  "豪斯登堡園區內住宿",
  "Hotel Amsterdam Huis Ten Bosch",
  officialLinks.hotelAmsterdam,
);

export const accommodations: Accommodation[] = [royalPark, forza, amsterdam];

export const dayPlans: DayPlan[] = [
  {
    dayNumber: 1,
    date: "8/11",
    weekday: "週二",
    title: "抵達福岡・中洲夜散步",
    summary: "先把行李放好，從機場一路進入福岡的夜晚。",
    emoji: "✈️",
    accent: "#ff836c",
    accommodation: royalPark,
    events: [
      item("d1-flight-in", "BR106 台北 → 福岡", "08:00 桃園機場 T2 出發（台灣時間）｜11:20 抵達福岡機場（日本時間）", "flight", {
        time: "08:00／11:20",
        statuses: ["交通"],
        mapQuery: "Taiwan Taoyuan International Airport Terminal 2",
        officialUrl: officialLinks.evaTimetable,
      }),
      item("d1-hotel", "前往住宿", "抵達後前往 The Royal Park Canvas Fukuoka Nakasu；寄放行李／依飯店規定辦理 Check-in。", "hotel", {
        time: "抵達後",
        statuses: ["飯店", "交通"],
        mapQuery: "The Royal Park Canvas Fukuoka Nakasu",
      }),
      item("d1-walk", "中洲河畔散步", "下午休息、整理行李，再到飯店附近自由逛逛。", "spot", {
        time: "下午",
        statuses: ["自由安排"],
        mapQuery: "中洲川端 福岡",
      }),
      item("d1-dinner", "利花苑 中洲明治通店", "晚餐｜已預約。", "food", {
        time: "17:00",
        statuses: ["已預約", "用餐"],
        mapQuery: "利花苑 中洲明治通店 福岡",
      }),
    ],
    locations: [
      item("d1-fukuoka-airport", "福岡機場 FUK", "國際線抵達後前往市區。", "transit", {
        statuses: ["交通"],
        mapQuery: "Fukuoka Airport International Terminal",
        officialUrl: officialLinks.fukuokaAirport,
      }),
      item("d1-royal-park", royalPark.name, royalPark.detail, "hotel", {
        statuses: ["飯店"],
        mapQuery: royalPark.mapQuery,
      }),
    ],
    transport: "福岡機場 → 中洲；地鐵／計程車依抵達後體力與行李安排。",
    meals: ["17:00 利花苑 中洲明治通店｜已預約"],
    status: ["交通", "飯店", "已預約"],
    notes: ["航班時間依兩地當地時間顯示：台灣 08:00、日本 11:20。"],
    warnings: ["抵達時間可能早於正式入住時間，Check-in 依飯店規定辦理。"],
  },
  {
    dayNumber: 2,
    date: "8/12",
    weekday: "週三",
    title: "麵包超人博物館・休息優先",
    summary: "室內親子主場，玩完回飯店午睡、休息、洗澡，再從容吃晚餐。",
    emoji: "🍞",
    accent: "#f2b84b",
    accommodation: royalPark,
    events: [
      item("d2-anpanman", "福岡麵包超人兒童博物館", "上午主景點｜從住宿步行約 3 分鐘。", "spot", {
        time: "上午",
        statuses: ["親子景點"],
        mapQuery: "福岡麵包超人兒童博物館",
      }),
      item("d2-rest", "返回飯店休息", "午餐後回住宿午睡、休息、洗澡；不把下午塞滿。", "hotel", {
        time: "午後",
        statuses: ["飯店", "自由安排"],
        mapQuery: royalPark.mapQuery,
      }),
      item("d2-canal", "Canal City Hakata（彈性）", "若當天體力允許，可安排 ON／On Running、HOKA 與商場採買；休息優先。", "shopping", {
        time: "有體力再安排",
        statuses: ["購物", "自由安排"],
        mapQuery: "Canal City Hakata",
      }),
      item("d2-dinner", "春吉 金魚 Motsunabe", "英文：Kingyo Motsunabe Haruyoshi｜晚餐已預約。", "food", {
        time: "17:30",
        statuses: ["已預約", "用餐"],
        mapQuery: "春吉 金魚 Motsunabe Haruyoshi 福岡",
      }),
    ],
    locations: [
      item("d2-museum", "福岡麵包超人兒童博物館", "親子室內景點。", "spot", {
        statuses: ["親子景點"],
        mapQuery: "福岡麵包超人兒童博物館",
      }),
      item("d2-canal-location", "Canal City Hakata", "ON／HOKA 與商場採買入口。", "shopping", {
        statuses: ["購物"],
        mapQuery: "Canal City Hakata",
      }),
      item("d2-kingyo", "春吉 金魚 Motsunabe", "Kingyo Motsunabe Haruyoshi。", "food", {
        statuses: ["已預約", "用餐"],
        mapQuery: "春吉 金魚 Motsunabe Haruyoshi 福岡",
      }),
    ],
    transport: "飯店 ↔ 麵包超人博物館以步行為主；市區移動不以 JR Pass 推定。",
    meals: ["午餐：自由安排", "17:30 春吉 金魚 Motsunabe｜已預約"],
    status: ["親子景點", "已預約", "自由安排"],
    notes: ["下午保留午睡、休息、洗澡時間；Canal City 只作有體力時的彈性安排。"],
    warnings: [],
    indoor: true,
  },
  {
    dayNumber: 3,
    date: "8/13",
    weekday: "週四",
    title: "KidZania Fukuoka・LaLaport",
    summary: "小小職人體驗接購物中心；報到與出發時間保留原始資料，先解決衝突再出門。",
    emoji: "👮",
    accent: "#4b9fb2",
    accommodation: royalPark,
    events: [
      item("d3-checkin", "KidZania 報到", "原始資料：07:40 報到；官方一般第一部流程也列約 07:40 開始受付。", "spot", {
        time: "07:40",
        statuses: ["時間衝突", "待確認", "親子景點"],
        mapQuery: "KidZania Fukuoka",
        officialUrl: officialLinks.kidZaniaFlow,
      }),
      item("d3-taxi", "飯店出發（原始規劃）", "原始資料：約 08:00 從飯店搭計程車前往 LaLaport Fukuoka。", "transit", {
        time: "約 08:00",
        statuses: ["時間衝突", "待確認", "交通"],
        mapQuery: "The Royal Park Canvas Fukuoka Nakasu",
      }),
      item("d3-arrival", "抵達 LaLaport Fukuoka（原始規劃）", "原始資料：08:20 抵達 LaLaport；KidZania 位於商場 2F。", "transit", {
        time: "08:20",
        statuses: ["時間衝突", "待確認"],
        mapQuery: "Mitsui Shopping Park LaLaport Fukuoka",
      }),
      item("d3-entry", "KidZania 入場（原始規劃）", "原始資料：08:30 入場；官方一般流程亦列約 08:30 入場。", "spot", {
        time: "08:30",
        statuses: ["待確認", "親子景點"],
        mapQuery: "KidZania Fukuoka",
        officialUrl: officialLinks.kidZaniaFlow,
      }),
      item("d3-activities", "職業體驗開始", "原始資料：09:00 活動開始；一般官方流程的活動也從 09:00 起。", "spot", {
        time: "09:00",
        statuses: ["待確認", "親子景點"],
        mapQuery: "KidZania Fukuoka",
        officialUrl: officialLinks.kidZania,
      }),
      item("d3-shopping", "LaLaport 親子採買", "午餐美食街自由安排；下午逛 Akachan Honpo、UNIQLO、ABC-MART、LOFT、超市與伴手禮區。", "shopping", {
        time: "活動後",
        statuses: ["自由安排", "購物"],
        mapQuery: "Mitsui Shopping Park LaLaport Fukuoka",
      }),
      item("d3-return", "搭計程車回飯店", "購物後回住宿休息。", "transit", {
        time: "傍晚",
        statuses: ["交通", "飯店"],
        mapQuery: royalPark.mapQuery,
      }),
    ],
    locations: [
      item("d3-kidzania", "KidZania Fukuoka", "位於 LaLaport Fukuoka 2F；官方建議體驗年齡為 3–15 歲。", "spot", {
        statuses: ["親子景點", "待確認"],
        mapQuery: "KidZania Fukuoka",
        officialUrl: officialLinks.kidZania,
      }),
      item("d3-lalaport", "LaLaport Fukuoka", "午餐、購物與伴手禮集中處。", "shopping", {
        statuses: ["購物", "自由安排"],
        mapQuery: "Mitsui Shopping Park LaLaport Fukuoka",
      }),
    ],
    transport: "The Royal Park Canvas → LaLaport：計程車；回程同樣以計程車安排。",
    meals: ["LaLaport 美食街：自由安排"],
    status: ["時間衝突", "待確認", "親子景點", "購物"],
    cost: "Total Admission Fee：¥15,600",
    duration: "KidZania：依票券時段；購物與午餐彈性安排",
    notes: [
      "官方一般流程：福岡第一部約 07:40 報到、08:30 入場、09:00 活動；不覆蓋這次特定票券資料。",
      "官方 FAQ 顯示 KidZania 適合 3–15 歲兒童；實際票券與入場資格仍以預約資料為準。",
    ],
    warnings: [
      "時間衝突：07:40 報到與約 08:00 才從飯店出發無法同時成立；請把報到與出發時間列為第一優先確認事項。網站保留全部原始時間，未靜默修正。",
    ],
    indoor: true,
  },
  {
    dayNumber: 4,
    date: "8/14",
    weekday: "週五",
    title: "北九州恐龍 × Outlet",
    summary: "先看生命之旅博物館，再走到 Outlet 與 AEON；一天集中在八幡東田，不安排多點折返。",
    emoji: "🦖",
    accent: "#8e72b8",
    accommodation: royalPark,
    railPassDay: 1,
    events: [
      item("d4-jr-out", "博多站 → Space World／スペースワールド站", "JR 鹿兒島本線｜約 55–70 分鐘；下車後步行約 5 分鐘前往博物館。未填寫特定車次。", "transit", {
        time: "上午",
        statuses: ["交通"],
        mapQuery: "スペースワールド駅 福岡",
        officialUrl: officialLinks.jrPass,
      }),
      item("d4-museum", "北九州市立自然史・歷史博物館", "日文：北九州市立いのちのたび博物館｜中文：生命之旅博物館。巨大恐龍骨骼、會動的恐龍、地球與生命演化、自然生態與親子互動。", "spot", {
        time: "上午",
        statuses: ["親子景點"],
        mapQuery: "北九州市立いのちのたび博物館",
        officialUrl: officialLinks.lifeMuseum,
        duration: "約 3 小時",
      }),
      item("d4-lunch", "午餐", "博物館周邊或 Outlet 美食街自由安排。", "food", {
        time: "中午",
        statuses: ["自由安排", "用餐"],
        mapQuery: "THE OUTLETS KITAKYUSHU Food Court",
      }),
      item("d4-outlet", "THE OUTLETS KITAKYUSHU", "與博物館約步行 5 分鐘；購物目標：Nike、adidas、New Balance、BEAMS、Columbia、Snow Peak、Le Creuset。", "shopping", {
        time: "下午",
        statuses: ["購物"],
        mapQuery: "THE OUTLETS KITAKYUSHU",
        officialUrl: officialLinks.outlet,
      }),
      item("d4-aeon", "AEON MALL Yahatahigashi／永旺夢樂城八幡東", "與 Outlet 相鄰；超市、日本零食、日用品、藥妝與伴手禮。", "shopping", {
        time: "下午",
        statuses: ["購物"],
        mapQuery: "AEON MALL Yahatahigashi",
        officialUrl: officialLinks.aeon,
      }),
      item("d4-jr-back", "Space World 站 → 博多站", "搭 JR 鹿兒島本線返回博多，回飯店休息。", "transit", {
        time: "傍晚",
        statuses: ["交通"],
        mapQuery: "スペースワールド駅 福岡",
      }),
    ],
    locations: [
      item("d4-life-museum", "生命之旅博物館", "北九州市立いのちのたび博物館；官方目前列 09:00–17:00，最後入館 16:30。", "spot", {
        statuses: ["親子景點"],
        mapQuery: "北九州市立いのちのたび博物館",
        officialUrl: officialLinks.lifeMuseum,
      }),
      item("d4-outlet-place", "THE OUTLETS KITAKYUSHU", "官方目前列 Outlet 樓層 10:00–20:00；以當日公告為準。", "shopping", {
        statuses: ["購物"],
        mapQuery: "THE OUTLETS KITAKYUSHU",
        officialUrl: officialLinks.outlet,
      }),
      item("d4-aeon-place", "AEON MALL Yahatahigashi", "官方目前列專門店／美食街多為 10:00–21:00，AEON 店舖時段另依樓層公告。", "shopping", {
        statuses: ["購物"],
        mapQuery: "AEON MALL Yahatahigashi",
        officialUrl: officialLinks.aeon,
      }),
    ],
    transport: "JR Kyushu Rail Pass Day 1／5｜博多 → Space World；回程 Space World → 博多。",
    meals: ["午餐：博物館周邊或 Outlet 美食街自由安排"],
    status: ["交通", "親子景點", "購物"],
    duration: "生命之旅博物館約 3 小時",
    notes: ["今日主線集中在八幡東田；不另外加入小倉、門司港，保留親子體力給博物館與 Outlet。"],
    warnings: ["JR Pass 票種與涵蓋範圍尚未在 repository 的購票資料中確認；搭乘前請以手上票種與 JR 官方公告核對。"],
    indoor: true,
  },
  {
    dayNumber: 5,
    date: "8/15",
    weekday: "週六",
    title: "天神購物・泰元",
    summary: "先完成住宿切換，再把岩田屋、PARCO、大丸與天神地下街排成一條購物線。",
    emoji: "🛍️",
    accent: "#de6d89",
    accommodation: forza,
    railPassDay: 2,
    events: [
      item("d5-checkout", "The Royal Park Canvas Check-out", "退房後前往 FORZA 博多站筑紫口 2 館寄放行李。", "hotel", {
        time: "上午",
        statuses: ["飯店", "交通"],
        mapQuery: royalPark.mapQuery,
      }),
      item("d5-luggage", "FORZA 博多站筑紫口 2 館", "先寄放行李，再搭福岡地鐵前往天神。", "hotel", {
        time: "上午",
        statuses: ["飯店"],
        mapQuery: forza.mapQuery,
      }),
      item("d5-iwataya", "岩田屋", "CELINE｜主要購物目標：帽子。", "shopping", {
        time: "上午",
        statuses: ["購物"],
        mapQuery: "岩田屋本店 福岡",
      }),
      item("d5-parco", "福岡 PARCO", "日本流行品牌、雜貨與美食。", "shopping", {
        time: "中午前後",
        statuses: ["購物"],
        mapQuery: "福岡 PARCO",
      }),
      item("d5-daimaru", "大丸福岡天神店", "百貨公司、伴手禮與美食街。", "shopping", {
        time: "下午",
        statuses: ["購物"],
        mapQuery: "大丸福岡天神店",
      }),
      item("d5-underground", "天神地下街", "日系服飾、咖啡廳與雜貨。", "shopping", {
        time: "下午",
        statuses: ["購物"],
        mapQuery: "天神地下街 福岡",
      }),
      item("d5-dinner", "燒肉泰元／泰元 本館", "4 位｜2 大 2 小｜晚餐已預約。", "food", {
        time: "18:15",
        statuses: ["已預約", "用餐"],
        mapQuery: "焼肉 泰元 本館 福岡",
        officialUrl: officialLinks.taigen,
      }),
    ],
    locations: [
      item("d5-forza", forza.name, forza.detail, "hotel", {
        statuses: ["飯店"],
        mapQuery: forza.mapQuery,
      }),
      item("d5-iwataya-place", "岩田屋", "CELINE 購物目標：帽子。", "shopping", {
        statuses: ["購物"],
        mapQuery: "岩田屋本店 福岡",
      }),
      item("d5-parco-place", "福岡 PARCO", "流行品牌、雜貨、美食。", "shopping", {
        statuses: ["購物"],
        mapQuery: "福岡 PARCO",
      }),
      item("d5-daimaru-place", "大丸福岡天神店", "伴手禮與美食街。", "shopping", {
        statuses: ["購物"],
        mapQuery: "大丸福岡天神店",
      }),
      item("d5-tenjin-place", "天神地下街", "日系服飾、咖啡廳、雜貨。", "shopping", {
        statuses: ["購物"],
        mapQuery: "天神地下街 福岡",
      }),
      item("d5-taigen", "泰元 本館", "官方資料：福岡市中央區舞鶴；出發前再以訂位資訊核對。", "food", {
        statuses: ["已預約", "用餐"],
        mapQuery: "焼肉 泰元 本館 福岡",
        officialUrl: officialLinks.taigen,
      }),
    ],
    transport: "JR Kyushu Rail Pass Day 2／5；本日市區移動為主，福岡地鐵與計程車不標示為 JR Pass 涵蓋。",
    meals: ["午餐：天神商圈自由安排", "18:15 燒肉泰元 本館｜已預約"],
    status: ["購物", "飯店", "已預約", "交通"],
    notes: ["Rail Pass 仍在連續效期第二天；即使今天主要搭地鐵，也不把地鐵標成 JR Pass 免費。"],
    warnings: [],
  },
  {
    dayNumber: 6,
    date: "8/16",
    weekday: "週日",
    title: "豪斯登堡一整天",
    summary: "把時間留給園區，不塞第二個景點；晚上住進園區，慢慢看光之王國。",
    emoji: "🌷",
    accent: "#e6a044",
    accommodation: amsterdam,
    railPassDay: 3,
    events: [
      item("d6-train-out", "博多站 → 豪斯登堡站", "JR 豪斯登堡號；使用者規劃約 1 小時 50 分鐘。官方路線說明約 1 小時 45 分鐘；未提供確切車次，不填出發時間。", "transit", {
        time: "上午",
        statuses: ["交通", "建議提前劃位", "待確認"],
        mapQuery: "博多站 福岡",
        officialUrl: officialLinks.huisTrainAccess,
        duration: "約 1 小時 45–50 分鐘",
      }),
      item("d6-hotel", "Hotel Amsterdam", "抵達後依飯店規定寄放行李／Check-in；不自行填寫未提供的正式入住時間。", "hotel", {
        time: "抵達後",
        statuses: ["飯店", "待確認"],
        mapQuery: amsterdam.mapQuery,
        officialUrl: officialLinks.hotelAmsterdamService,
      }),
      item("d6-park", "豪斯登堡園區", "歐洲街景、Miffy Wonder Square、運河遊船、遊樂設施與商店街。", "spot", {
        time: "白天",
        statuses: ["親子景點", "自由安排"],
        mapQuery: "Huis Ten Bosch Nagasaki",
        officialUrl: officialLinks.huisTenBosch,
      }),
      item("d6-meals", "園區內午餐／晚餐", "依當日體力與園區動線自由安排。", "food", {
        time: "午餐／晚餐",
        statuses: ["自由安排", "用餐"],
        mapQuery: "Huis Ten Bosch restaurants",
      }),
      item("d6-night", "光之王國與夜景", "夜間燈光秀、歐洲街景拍照，之後回 Hotel Amsterdam 休息。", "spot", {
        time: "夜間",
        statuses: ["親子景點", "自由安排"],
        mapQuery: "Huis Ten Bosch Nagasaki",
      }),
    ],
    locations: [
      item("d6-huis", "豪斯登堡 Huis Ten Bosch", "全日園區主景點。", "spot", {
        statuses: ["親子景點"],
        mapQuery: "Huis Ten Bosch Nagasaki",
        officialUrl: officialLinks.huisTenBosch,
      }),
      item("d6-amsterdam", amsterdam.name, amsterdam.detail, "hotel", {
        statuses: ["飯店"],
        mapQuery: amsterdam.mapQuery,
        officialUrl: officialLinks.hotelAmsterdam,
      }),
    ],
    transport: "JR Kyushu Rail Pass Day 3／5｜博多 → 豪斯登堡；指定席建議提前劃位。",
    meals: ["園區內午餐及晚餐：自由安排"],
    status: ["交通", "建議提前劃位", "親子景點", "飯店"],
    duration: "博多 → 豪斯登堡約 1 小時 45–50 分鐘",
    notes: ["Hotel Amsterdam 官方住宿資訊可供參考；實際寄放行李、套票與入住流程以訂房資料及飯店當日規定為準。"],
    warnings: ["未提供確切列車班次；不要依網站自行推定出發時間，請以 JR 官方查詢與指定席結果為準。"],
  },
  {
    dayNumber: 7,
    date: "8/17",
    weekday: "週一",
    title: "豪斯登堡 → 福岡・華味鳥",
    summary: "上午從容離開園區，回到博多後先休息，再用 18:00 的水炊料理收尾。",
    emoji: "🚆",
    accent: "#5b87c7",
    accommodation: forza,
    railPassDay: 4,
    events: [
      item("d7-morning", "飯店早餐、Check-out 與續玩", "早餐後退房，繼續前一天沒玩到的設施、最後購物與白天拍照。", "spot", {
        time: "上午",
        statuses: ["飯店", "自由安排"],
        mapQuery: "Hotel Amsterdam Huis Ten Bosch",
      }),
      item("d7-train-back", "豪斯登堡站 → 博多站", "JR 豪斯登堡號；使用者規劃約 1 小時 50 分鐘。未提供確切車次。", "transit", {
        time: "中午前後",
        statuses: ["交通", "建議提前劃位", "待確認"],
        mapQuery: "Huis Ten Bosch Station",
        officialUrl: officialLinks.huisTrainAccess,
        duration: "約 1 小時 45–50 分鐘",
      }),
      item("d7-shopping", "AMU Plaza・KITTE・博多阪急・博多一番街", "回博多後 Check-in、稍作休息，再做最後補貨與伴手禮；Canal City 保留為有時間再去。", "shopping", {
        time: "下午",
        statuses: ["購物", "自由安排"],
        mapQuery: "AMU Plaza Hakata",
      }),
      item("d7-dinner", "Hana Midori／博多華味鳥 博多站筑紫口附近", "18:00｜已預約；原始資料為透過 Google Maps 預約。FORZA 筑紫口附近步行約 5 分鐘，但確切分店地址待確認。", "food", {
        time: "18:00",
        statuses: ["已預約", "待確認", "用餐"],
        mapQuery: "博多華味鳥 博多站筑紫口",
        officialUrl: officialLinks.hanamidori,
      }),
    ],
    locations: [
      item("d7-huis-station", "豪斯登堡站 Huis Ten Bosch Station", "回程上車位置；班次待確認。", "transit", {
        statuses: ["交通", "待確認"],
        mapQuery: "Huis Ten Bosch Station",
        officialUrl: officialLinks.huisTrainAccess,
      }),
      item("d7-hakata", "博多站・JR Hakata City", "回程後購物與補貨。", "shopping", {
        statuses: ["購物"],
        mapQuery: "博多站 福岡",
      }),
      item("d7-forza", forza.name, forza.detail, "hotel", {
        statuses: ["飯店"],
        mapQuery: forza.mapQuery,
      }),
      item("d7-hanamidori", "博多華味鳥（分店待確認）", "地圖使用店名＋博多站筑紫口搜尋，不擅自選擇同名分店。", "food", {
        statuses: ["已預約", "待確認"],
        mapQuery: "博多華味鳥 博多站筑紫口",
        officialUrl: officialLinks.hanamidori,
      }),
    ],
    transport: "JR Kyushu Rail Pass Day 4／5｜豪斯登堡 → 博多；回程後市區步行／地鐵。",
    meals: ["飯店早餐", "18:00 博多華味鳥｜已預約、分店待確認"],
    status: ["交通", "建議提前劃位", "已預約", "待確認", "購物"],
    notes: ["Canal City 只作彈性安排；先確保回程、入住與 18:00 晚餐。"],
    warnings: ["18:00 有晚餐，豪斯登堡回程車次仍需確認；請預留列車、博多站轉移與 Check-in 緩衝。華味鳥確切分店地址也要依訂位畫面確認。"],
  },
  {
    dayNumber: 8,
    date: "8/18",
    weekday: "週二",
    title: "海之中道 × 水族館・最後採買",
    summary: "Marine World 是核心行程，戶外公園看天氣與小孩體力彈性加入，最後回博多補貨。",
    emoji: "🚢",
    accent: "#4caaa0",
    accommodation: forza,
    railPassDay: 5,
    events: [
      item("d8-ferry", "FORZA → Bayside Place Hakata → 海之中道", "先搭計程車到博多港 Bayside Place Hakata，再搭高速船；船程規劃約 20 分鐘。建議提前 20–30 分鐘到碼頭現場購票。", "transit", {
        time: "上午",
        statuses: ["交通", "待確認", "依天候調整"],
        mapQuery: "Bayside Place Hakata",
        officialUrl: officialLinks.ferryRoute,
        duration: "船程約 20 分鐘",
      }),
      item("d8-marine", "Marine World 海之中道", "核心行程；海豚表演、企鵝、大水槽、水母館，建議停留約 2–3 小時。", "spot", {
        time: "上午至中午",
        statuses: ["親子景點", "依天候調整"],
        mapQuery: "Marine World 海之中道水族館",
        officialUrl: officialLinks.marineWorld,
        duration: "約 2–3 小時",
      }),
      item("d8-lunch", "Marine World／海之中道園區午餐", "園區內自由安排。", "food", {
        time: "中午",
        statuses: ["自由安排", "用餐"],
        mapQuery: "Marine World 海之中道水族館",
      }),
      item("d8-park", "海之中道海濱公園（彈性）", "季節花卉、海濱散步、親子遊戲區；腳踏車依時間、天氣與小孩體力安排，不必走完整個園區。八月炎熱，戶外公園可縮短或取消。", "spot", {
        time: "下午彈性",
        statuses: ["親子景點", "依天候調整", "自由安排"],
        mapQuery: "海之中道海濱公園",
        officialUrl: officialLinks.seasidePark,
      }),
      item("d8-jr-return", "海之中道站 → 香椎站 → 博多站", "保留全 JR 回程：JR 香椎線至香椎站，再轉 JR 鹿兒島本線返回博多；實際班次待確認。", "transit", {
        time: "下午／傍晚",
        statuses: ["交通", "待確認"],
        mapQuery: "海の中道駅",
        officialUrl: officialLinks.jrPass,
      }),
      item("d8-shopping", "AMU Plaza・KITTE・博多阪急・博多一番街", "最後伴手禮採買，回飯店整理行李。", "shopping", {
        time: "回福岡後",
        statuses: ["購物", "自由安排"],
        mapQuery: "AMU Plaza Hakata",
      }),
    ],
    locations: [
      item("d8-bayside", "Bayside Place Hakata", "官方航路頁列有博多 ⇔ 海之中道的 うみなかライン；現場購票位置與運航依官方公告。", "transit", {
        statuses: ["交通", "待確認"],
        mapQuery: "Bayside Place Hakata",
        officialUrl: officialLinks.bayside,
      }),
      item("d8-marine-place", "Marine World 海之中道", "官方 2026 夏季頁目前列 8/1–8/23 09:30–21:00；天候可能調整，出發前再次確認。", "spot", {
        statuses: ["親子景點", "依天候調整"],
        mapQuery: "Marine World 海之中道水族館",
        officialUrl: officialLinks.marineWorld,
      }),
      item("d8-park-place", "海之中道海濱公園", "2026/8/18 落在官方泳池期間，現行頁面列公園 09:00–18:30；活動與天候可能調整。", "spot", {
        statuses: ["親子景點", "依天候調整"],
        mapQuery: "海之中道海濱公園",
        officialUrl: officialLinks.seasidePark,
      }),
      item("d8-hakata-place", "博多站・JR Hakata City", "最後採買與整理行李。", "shopping", {
        statuses: ["購物"],
        mapQuery: "JR Hakata City",
      }),
    ],
    transport: "JR Kyushu Rail Pass Day 5／5；去程高速船不屬 JR Pass，回程保留全 JR：海之中道 → 香椎 → 博多。",
    meals: ["Marine World 或海之中道園區午餐：自由安排"],
    status: ["交通", "親子景點", "依天候調整", "購物", "待確認"],
    duration: "Marine World 約 2–3 小時；海濱公園彈性",
    notes: ["船班／天候與公園活動都可能變動；Marine World 是核心，戶外公園依現場狀況調整。"],
    warnings: ["高速船不屬 JR Pass。官方航路頁的 2026 運航日與 A／B／C 班次依日曆變化，8/18 班次請出發前再次確認；若停航，改走全 JR 路線。"],
    indoor: true,
  },
  {
    dayNumber: 9,
    date: "8/19",
    weekday: "週三",
    title: "帶著回憶返台",
    summary: "不排景點，提早到機場完成報到、免稅採買與最後一杯抹茶。",
    emoji: "✈️",
    accent: "#70838d",
    accommodation: forza,
    events: [
      item("d9-airport", "飯店 Check-out → 福岡機場國際線", "搭計程車前往福岡機場；建議 09:30–09:45 抵達，完成報到、托運、安檢與免稅採買。", "transit", {
        time: "09:30–09:45",
        statuses: ["交通"],
        mapQuery: "Fukuoka Airport International Terminal",
        officialUrl: officialLinks.airportInternationalFlow,
      }),
      item("d9-matcha", "THE MATCHA TOKYO", "原始規劃：51A 登機門旁。官方目前列於國際線 3F、過安檢後區域；商店位置、營業時間與登機門依當日機場資訊為準。", "food", {
        time: "安檢後",
        statuses: ["自由安排", "待確認"],
        mapQuery: "THE MATCHA TOKYO Fukuoka Airport International Terminal",
        officialUrl: officialLinks.matcha,
      }),
      item("d9-flight-out", "BR105 福岡 → 台北", "12:20 福岡機場出發（日本時間）｜13:45 抵達桃園機場 T2（台灣時間）。", "flight", {
        time: "12:20／13:45",
        statuses: ["交通"],
        mapQuery: "Fukuoka Airport International Terminal",
        officialUrl: officialLinks.evaFlightStatus,
      }),
    ],
    locations: [
      item("d9-fukuoka-airport", "福岡機場國際線", "報到、托運、安檢、免稅店與登機門。", "transit", {
        statuses: ["交通"],
        mapQuery: "Fukuoka Airport International Terminal",
        officialUrl: officialLinks.fukuokaAirport,
      }),
      item("d9-matcha-place", "THE MATCHA TOKYO 福岡機場國際線", "官方目前列國際線 3F、過安檢後，營業時間 08:00–20:00（L.O.）；依當日機場資訊為準。", "food", {
        statuses: ["自由安排", "待確認"],
        mapQuery: "THE MATCHA TOKYO Fukuoka Airport International Terminal",
        officialUrl: officialLinks.matcha,
      }),
    ],
    transport: "FORZA 博多站筑紫口 2 館 → 福岡機場國際線：計程車。",
    meals: ["THE MATCHA TOKYO：抹茶、抹茶拿鐵與抹茶甜點（安檢後有時間再安排）"],
    status: ["交通", "自由安排", "待確認"],
    notes: ["航班時間依兩地當地時間顯示：日本 12:20、台灣 13:45。"],
    warnings: ["THE MATCHA TOKYO 的店舖位置、營業時間與當日登機門可能調整，依機場當日資訊為準。"],
  },
];
