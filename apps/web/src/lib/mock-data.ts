// Sample data copied from the Figma screens. Used until the Go API is ready.
import type {
  ClientProduct,
  CostCategory,
  CostItem,
  CostSectionSummary,
  DashboardData,
  DevelopmentDetail,
  DevelopmentSummary,
  DevStatus,
  EventItem,
  FeasibilityPlanRow,
  FeasibilityRow,
  GalleryItem,
  HangTagRow,
  Quote,
  Requisition,
  RequisitionDetail,
  Visitor,
} from "./types";

const img = (n: number) => `/figma/gallery/p${String(((n - 1) % 20) + 1).padStart(2, "0")}.png`;

const buyers = [
  "RedTape", "BlueWave", "GreenLeaf", "YellowSun", "PurpleSky", "SilverStream", "BlackNight",
  "OrangeFlame", "BrownEarth", "TurquoiseOcean", "SkyBlue", "CocoaBrown", "EmeraldGreen",
  "CrimsonRed", "PeachBlossom", "LavenderMist", "MidnightBlue", "SunsetOrange", "FrostWhite",
  "GraphiteGrey", "OceanBlue", "BlazingRed", "ForestGreen", "BerryPurple", "SunnyYellow",
];
const fabrics = [
  "100% Organic Cotton", "60% Cotton, 40% Polyester", "80% Organic Cotton, 20% Recycled Polyester",
  "100% Bamboo", "50% Cotton, 50% Modal", "90% Polyester, 10% Spandex", "100% Organic Cotton",
  "70% Cotton, 30% Linen", "100% Wool", "60% Organic Cotton, 40% Tencel", "100% Recycled Cotton",
  "80% Cotton, 20% Polyester", "100% Organic Linen", "75% Cotton, 25% Viscose", "100% Hemp",
  "90% Organic Cotton, 10% Silk", "100% Modal", "85% Cotton, 15% Spandex", "100% Organic Cotton",
  "70% Cotton, 30% Nylon", "100% Linen", "90% Organic Cotton, 10% Recycled Fiber",
  "50% Cotton, 50% Tencel", "100% Recycled Polyester", "80% Cotton, 20% Viscose",
];
const statuses: DevStatus[] = [
  "draft", "draft", "reviewed", "pending", "draft", "pending", "reviewed", "pending", "pending",
  "draft", "pending", "draft", "pending", "reviewed", "pending", "pending", "pending", "draft",
  "pending", "reviewed", "pending", "draft", "pending", "reviewed", "approved",
];

export const developments: DevelopmentSummary[] = buyers.map((buyer, i) => ({
  id: String(i + 1),
  dn: `DN-${String(i + 1).padStart(2, "0")}`,
  buyer,
  style: `AFG-LW CK${86 + i}`,
  fabric: fabrics[i],
  devType: i % 2 === 0 ? "Design Dev" : "Tech pack",
  status: statuses[i],
}));

const section = (): CostSectionSummary => ({
  singleUnitPrice: 2.04,
  avgMatPrice: 1.2,
  totalQty: 26172,
  totalCost: 26172.78,
  costPct: 44,
  pnl: 0.1,
});

const fabricAttributes: Record<string, string> = {
  "Fabric Name": "Non Iron Plain Weave Fabrics",
  Category: "Fabrics",
  Type: "Denim Types | Rigid Denim",
  "Count Warp": "WARP: 60S\nWEFT: 40S",
  "Count Weft": "60",
  "Cuttable Width (Inch)": '58"',
  "Dye Type": "Fiber Dye",
  "Finish Type": "Mechanical",
  Shrinkage: "Length: 75 cm\nWidth: 40 cm",
  Compositions: "polyester",
  GSM: "B 170 | A 180",
  "Develop Supplier": "Zara",
  Source: "Nominated",
  "Yarn Count": "WARP: 40S\nWEFT: 40S",
  "Fabric Construction": "EPI: 120\nPPI: 80",
  UM: "Yard",
};

const items: CostItem[] = [
  { id: "f1", category: "fabric", usnCode: "F591-ERYYT6", name: "Non Iron Plain Weave Fabrics", image: img(3), source: "Nominated", wastagePct: 1, requiredQty: 1109, unit: "y", price: 0, totalValue: 0, pnl: 0.1, status: "pending", attributes: fabricAttributes },
  { id: "s1", category: "stitching_trim", usnCode: "F591-ERYYT6", name: "Non Iron Plain Weave Fabrics", image: img(3), source: "Nominated", wastagePct: 3, requiredQty: 5000, unit: "pcs", price: 0.003, totalValue: 0, pnl: 0.1 },
  { id: "s2", category: "stitching_trim", usnCode: "G795-HTJLD9", name: "Cotton Blend Twill Fabrics", image: img(7), source: "Non-nominated", wastagePct: 4, requiredQty: 3000, unit: "pcs", price: 0.005, totalValue: 0, pnl: 0.1 },
  { id: "s3", category: "stitching_trim", usnCode: "H842-MNQRE1", name: "Silk Satin Fabrics", image: img(3), source: "Non-nominated", wastagePct: 5, requiredQty: 2000, unit: "pcs", price: 0.012, totalValue: 0, pnl: 0.1 },
  { id: "s4", category: "stitching_trim", usnCode: "J102-PLKXQ3", name: "Linen Blend Fabrics", image: img(7), source: "Nominated", wastagePct: 2, requiredQty: 4000, unit: "pcs", price: 0.007, totalValue: 0, pnl: 0.1 },
  { id: "p1", category: "finishing_trim", usnCode: "F591-ERYYT6", name: "Non Iron Plain Weave Fabrics", image: img(12), source: "Nominated", wastagePct: 1, requiredQty: 1109, unit: "y", price: 0, totalValue: 0, pnl: 0.1 },
  { id: "p2", category: "finishing_trim", usnCode: "F592-ERYYT7", name: "Cotton Blend Twill", image: img(3), source: "Non-nominated", wastagePct: 3, requiredQty: 1109, unit: "y", price: 2.5, totalValue: 0, pnl: 0.1 },
  { id: "p3", category: "finishing_trim", usnCode: "F593-ERYYT8", name: "Linen Smooth Finish", image: img(10), source: "Nominated", wastagePct: 2, requiredQty: 1109, unit: "y", price: 1.75, totalValue: 0, pnl: 0.1 },
  { id: "p4", category: "finishing_trim", usnCode: "F594-ERYYT9", name: "Silk Satin Blend", image: img(4), source: "Nominated", wastagePct: 4, requiredQty: 1109, unit: "y", price: 5, totalValue: 0, pnl: 0.1 },
  { id: "p5", category: "finishing_trim", usnCode: "F595-ERYYT0", name: "Polyester Microfiber", image: img(14), source: "Non-nominated", wastagePct: 2.5, requiredQty: 1109, unit: "y", price: 3.75, totalValue: 0, pnl: 0.1 },
  { id: "p6", category: "finishing_trim", usnCode: "F596-ERYYT1", name: "Rayon Soft Touch", image: img(17), source: "Nominated", wastagePct: 3.5, requiredQty: 1109, unit: "y", price: 4.2, totalValue: 0, pnl: 0.1 },
  { id: "v1", category: "value_addition", usnCode: "F591-ERYYT6", name: "Non Iron Plain Weave Fabrics", image: img(12), source: "Nominated", wastagePct: 1, requiredQty: 1109, unit: "y", price: 0, totalValue: 0, pnl: 0.1 },
  { id: "o1", category: "other_charge", usnCode: "F591-ERYYT6", name: "Non Iron Plain Weave Fabrics", image: img(3), source: "Nominated", wastagePct: 3, requiredQty: 5000, unit: "pcs", price: 0.003, totalValue: 0, pnl: 0.1 },
];

const activityLabels = [
  "Requested By", "Requisition date", "Sample Type", "Sample Qty", "Delivery Qty",
  "Delivery date", "Delivery Requisition number", "Deliver to",
];

export function developmentDetail(id: string): DevelopmentDetail | undefined {
  const base = developments.find((d) => d.id === id);
  if (!base) return undefined;
  const reviewed = base.status === "reviewed" || base.status === "approved";
  const categories: CostCategory[] = ["fabric", "stitching_trim", "finishing_trim", "value_addition", "other_charge"];
  return {
    ...base,
    style: "RFS6383",
    quantity: 15400,
    pack: "1 PCS",
    moq: reviewed ? 5400 : null,
    sampleQty: 2,
    season: "Oct 26 to Jun 27",
    images: ["/figma/client/shirt-pink.png", img(2), img(5)],
    fob: { current: 4.6, previous: [4.2, 3.6] },
    cost: {
      revenuePerMc: 41.42,
      revenuePerMcTotal: 1077,
      epm: 0.09,
      cm: 2,
      cmPct: 23,
      techPack: { name: "Tech Pack", size: "9.81MB" },
    },
    financial: {
      cogs: 2.69,
      cogsPct: 68,
      commercialFinance: reviewed ? 0.2 : null,
      commercialFinancePct: reviewed ? 3 : null,
      buyingCommission: reviewed ? 0 : null,
      buyingCommissionPct: reviewed ? 0 : null,
      paymentTerm: reviewed ? "LC 90 Days" : null,
      requisitionBy: "Joybordhan Sarkar",
    },
    operations: [
      { id: "op1", department: "Men's", productType: "Woven", itemName: "Long Sleeve Shirt", smv: 18, mcPerLine: 48, efficiencyPct: 5, requiredDay: 0.92, avgProductionPerLine: 1123, epm: 0.09, cm: 2, cmPct: 23, revenuePerMc: 41.42 },
    ],
    items,
    sections: Object.fromEntries(categories.map((c) => [c, section()])) as Record<CostCategory, CostSectionSummary>,
    summary: [
      { name: "Phase 1", totalOrderValue: 2854.4, cogs: 854.4, commercialInterest: 1250.75, buyingCommission: 320.5, cm: 150, perPcsCm: 500, mcEarningPerDay: 30.9, mcEarningPerMonth: 803.04, plannedLine: 1, plannedMachine: 48 },
    ],
    activity: activityLabels.map((label, i) => ({
      label,
      by: i < 3 ? "Joybordhan" : "Hasan Mahmud",
      at: "15 Oct 2026, 03:38 PM",
      done: i === 0,
    })),
  };
}

export const comments = [
  { id: "c1", author: "Mr. Hossain (Audit).", ref: "#G26-585", body: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.", ago: "2 hours ago" },
  { id: "c2", author: "Mr. Hossain (Audit).", ref: "#G26-585", body: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.", image: img(3), ago: "2 hours ago" },
];

export const feasibility: FeasibilityRow[] = [
  { label: "Total Quantity For Related Style", unit: "Pcs.", value: "20000", highlight: "red" },
  { label: "No. of Machine Required Per Line", unit: "No.", value: "42" },
  { label: "No. of Helper Required Per Line", unit: "No.", value: "11" },
  { label: "Required SMV for this style", unit: "Min.", value: "40.00" },
  { label: "Anticipated Efficiency Target  %", unit: "%", value: "62.20%", highlight: "red" },
  { label: "Anticipated Production Per Hour", unit: "Pcs.", value: "49" },
  { label: "Total Working Hours In a Day", unit: "Hrs.", value: "10" },
  { label: "Average Production Per Day", unit: "Pcs.", value: "49" },
  { label: "Total Working Days in Month", unit: "Days", value: "26" },
  { label: "Total Production Cost Per Machine Per Month", unit: "Tk.", value: "85000", highlight: "red" },
  { label: "Per Day Machine Cost", unit: "Tk.", value: "3269" },
  { label: "Cost Per Minute In Tk.", unit: "Tk.", value: "5.45" },
  { label: "Cost Per Minute In Dollar", unit: "USD.", value: "0.052" },
  { label: "Per Day Line Cost Based On The  No. of Machine Used", unit: "Tk.", value: "137308" },
  { label: "Set Up Time For The Concern Style", unit: "Days", value: "1.49" },
  { label: "Set Up Time Cost For The Concern Style Based On No. of Machine Used  & Required Days", unit: "Tk.", value: "204346" },
  { label: "Total Production Days Required For The Concern Style Including Set Up Time", unit: "Days", value: "42.32" },
  { label: "Total Production Cost Incurred For This Style", unit: "Tk.", value: "5811184" },
  { label: "Per Piece Projected Unit Cost", unit: "Tk.", value: "290.56" },
  { label: "Break-even CM", unit: "Dollar", value: "$2.79" },
  { label: "Required CM for this style", unit: "Dollar", value: "$3.60", highlight: "amber" },
  { label: "Projected CM", unit: "Dollar", value: "$4.87", highlight: "red" },
  { label: "Anticipated Profit & Loss per pc", unit: "Dollar", value: "$1.27" },
];

export const feasibilityPlan: FeasibilityPlanRow[] = [
  [1, 40, 795, 2.23, 7.74], [1.5, 30, 600, 1.9, 6.5], [2, 25, 500, 1.75, 5.85], [2.5, 20, 400, 1.6, 5.2],
  [3, 15, 300, 1.5, 4.6], [3.5, 10, 200, 1.4, 4], [4, 8, 150, 1.3, 3.5], [4.5, 6, 100, 1.2, 3],
  [5, 5, 75, 1.1, 2.5], [5.5, 4, 50, 1, 2],
].map(([days, targetEff, productionPerDay, setupLossHour, utilizedHour]) => ({ days, targetEff, productionPerDay, setupLossHour, utilizedHour }));

const venues = [
  "International Convention City Bashundhara (ICCB)", "Grand Hyatt Hotel, Doha", "Tokyo International Forum",
  "Berlin Messe", "Los Angeles Convention Center", "Sydney Convention and Exhibition Centre",
  "Shanghai World Expo Exhibition and Convention Center", "ExCeL London", "Dubai World Trade Centre",
  "Toronto Congress Centre", "Fira Barcelona Gran Via", "Moscone Center, San Francisco",
  "Barcelona International Convention Centre", "Bangkok International Trade and Exhibition Centre",
  "Cairo International Convention Center", "Nairobi Convention Centre", "Rio de Janeiro Centro de Eventos",
  "Vienna International Centre", "Lisbon Congress Centre", "Sydney Opera House", "Dubai Expo 2020",
  "Atlantis Paradise Island, Bahamas", "Walt Disney World Resort, Orlando", "Bali Nusa Dua Convention Center",
  "Red Rock Casino, Las Vegas",
];
const emails = [
  "joybordhan223@gmail.com", "alex.miller@example.com", "sarah.connor@skynet.com", "john.doe@gmail.com",
  "emily.brown@yahoo.com", "mike.jones@outlook.com", "lisa.wang@icloud.com", "david.smith@live.com",
  "julia.green@gmail.com", "peter.parker@webmail.com", "anna.karenina@tmail.com", "robert.brown@fastmail.com",
  "charlie.clark@gmail.com", "monica.lee@yahoo.com", "ryan.taylor@zoho.com", "victoria.smith@outlook.com",
  "tom.hanks@live.com", "lucas.martin@icloud.com", "nora.james@gmail.com", "albert.einstein@tmail.com",
  "marie.curie@fastmail.com", "james.bond@zoho.com", "sophia.lorens@webmail.com", "oscar.wilde@gmail.com",
  "luke.skywalker@tmail.com",
];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateOf = (i: number, day: number) => {
  const m = (7 + i) % 12;
  const y = 2026 + Math.floor((7 + i) / 12);
  return `${String(day).padStart(2, "0")} ${months[m]}, ${y}`;
};

export const visitors: Visitor[] = emails.map((email, i) => ({
  id: String(i + 1),
  email,
  eventName: venues[i],
  emailTime: dateOf(i, [13, 20, 5, 15, 1][i % 5]),
  inquiryDate: dateOf(i, [10, 25, 10, 20, 5][i % 5]),
}));

export const inquiries: Visitor[] = visitors.slice(0, 10);

const reqBuyers = ["Redtape", "Bluebird", "GreenLeaf", "Sunset", "Oceanic", "MountainPeak", "UrbanStyle", "Vintage", "Wildflower", "SoftTouch", "BrightSide", "EarthTone", "CrystalClear", "SilverLining", "Shadow", "BoldStitch", "PatternPlay", "Dusk", "ClassicFit", "UrbanChic", "NatureBound", "Timeless", "Refined", "Eclipse", "Radiant", "LuxeThreads"];
const reqStyles = ["AFG-LW CK86", "AEW-XY 320", "ZMR-89 QW", "TGR-14 LS", "DRC-204", "PLN-77 SL", "BKT-25 WX", "KRM-450", "HGT-99 ZX", "QPT-58 LV", "FTL-88 NQ", "NVP-67 XY", "JLT-33 QR", "PTB-19 JK", "VLT-10 BW", "MNC-75 QD", "XYZ-30 RP", "ABR-22 ZT", "WYC-48 QK", "RFT-67 HD", "KVX-82 FP", "HMP-90 MN", "ZPR-44 TT", "BRT-15 NX", "FLC-01 YP", "KWP-88 ZX"];
const sampleTypes = ["Pre-Production (PP) Sample", "Production Sample", "Final Sample"];
const washTypes = ["Enzyme wash", "Stone wash", "Rinse wash", "Acid wash", "Brushed finish", "Sandblasted"];
const reqStatus = ["pending", "approved", "inprogress"] as const;

export const requisitions: Requisition[] = reqBuyers.map((buyer, i) => ({
  id: String(i + 1),
  rn: `RN-${String(i + 1).padStart(3, "0")}`,
  buyer,
  style: reqStyles[i],
  sampleType: sampleTypes[i % 3],
  washType: washTypes[i % 6],
  qty: [200, 150, 100, 250, 300, 180, 220, 175, 130][i % 9],
  status: reqStatus[i % 3],
}));

export function requisitionDetail(id: string): RequisitionDetail | undefined {
  const base = requisitions.find((r) => r.id === id);
  if (!base) return undefined;
  return {
    ...base,
    image: img(2),
    colors: 10,
    season: "Summer 2026",
    physicalSample: true,
    note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    fabrics: [["Cottom Long Slew Shirt", false], ["Denim Jacket", true], ["Leather Sneakers", false], ["Wool Blend Scarf", true], ["Chino Pants", true]].map(([name, physical]) => ({ name: name as string, physical: physical as boolean })),
    stitchingTrims: [["Sewing Thread", false], ["Cotton Fabric", true], ["Zipper", false], ["Sewing Machine", true], ["Scissors", false]].map(([name, physical]) => ({ name: name as string, physical: physical as boolean })),
    packingTrims: [["Polybag", false], ["Box", true], ["Pouch", false], ["Bottle", true], ["Carton", true]].map(([name, physical]) => ({ name: name as string, physical: physical as boolean })),
    files: [
      { label: "Tech Pack File", name: "TEX Certificate.pdf", size: "2 MB" },
      { label: "Measurement Chart", name: "TEX Certificate.pdf", size: "2 MB" },
      { label: "CAD", name: "TEX Certificate.pdf", size: "2 MB" },
    ],
    sizes: ["XS", "S", "M", "L"],
    sizeBreakdown: [
      { color: "Black", qty: [12, 15, 20, 30] },
      { color: "Blue", qty: [10, 14, 22, 28] },
      { color: "Red", qty: [11, 13, 18, 24] },
      { color: "Green", qty: [9, 16, 19, 27] },
    ],
  };
}

const quoteItems = ["Cottom Long Slew Shirt", "Silk Crepe Blouse", "Denim Jacket", "Linen Summer Dress", "Leather Sneakers", "Wool Overcoat", "Cotton Sweatshirt", "Chiffon Maxi Skirt", "Velvet Evening Gown", "Graphic T-Shirt", "Tailored Trousers", "Cotton Shorts", "Knit Sweater", "Harem Pants", "Puffer Jacket", "Canvas Backpack", "Wool Scarf", "Bamboo Sunglasses", "Silk Scarf", "Espadrilles", "Faux Fur Coat", "Waterproof Jacket", "Tulle Skirt", "Stylish Beanie"];
const countries = ["Bangladesh", "Australia", "Canada", "Germany", "France", "Spain", "Italy", "Netherlands", "Sweden", "Norway", "Finland", "Denmark", "Belgium", "Austria", "Ireland", "Switzerland", "Portugal", "Greece", "Hungary", "Croatia", "Slovakia", "Czech Republic", "Iceland", "Estonia"];
const quoteEvents = ["International Convention City Bashundhara (ICCB)", "Melbourne Convention Centre", "Toronto International Centre", "Berlin Exhibition Grounds", "Paris Expo Porte de Versailles", "Fira de Barcelona", "Fiera Milano", "RAI Amsterdam", "Stockholm Waterfront Congress Centre", "Oslo Spektrum", "Helsinki Ice Hall", "Bella Center Copenhagen", "Brussels Expo", "Vienna Exhibition Centre", "RDS Simmonscourt", "Palexpo Geneva", "Lisbon Congress Centre", "Athens Convention Centre", "Hungexpo Budapest", "Zagreb Fair", "Incheba Expo Bratislava", "Prague Exhibition Centre", "Reykjavik Exhibition Centre", "Tallinn Creative Hub"];
const recipients = ["joybordhan223@gmail.com", "alexjohnson45@yahoo.com", "emily.smith98@gmail.com", "michael.brown77@hotmail.com", "sarah.davis123@outlook.com"];

export const quotes: Quote[] = quoteItems.map((itemName, i) => ({
  id: String(i + 1),
  itemName,
  styleNo: `RT${5374654 + i}`,
  email: i === 0 ? "joybordhan223@gmail.com" : emails[i % emails.length],
  moreEmails: [2, 3, 1, 2, 4][i % 5],
  location: countries[i],
  eventName: quoteEvents[i],
  emailTime: `${String([13, 20, 25, 30, 5, 10, 15, 20, 25, 1][i % 10]).padStart(2, "0")} ${["Aug", "Aug", "Aug", "Aug", "Sep", "Sep", "Sep", "Sep", "Sep", "Oct"][i % 10]}, 2026`,
  to: recipients,
  cc: recipients,
}));

const eventNames = ["International Convention City Bashundhara (ICCB)", "Bangladesh International Trade Fair", "Dhaka Art Summit", "Chittagong Hill Tracts Festival", "Dhaka International Film Festival", "Sonargaon Folk Festival", "Bengal Classical Music Festival", "Sylhet International Jazz Festival", "National Mango Festival", "Cox's Bazar Beach Festival", "International Kite Festival", "Bangladesh Book Fair", "Rural Crafts Fair", "Chittagong International Trade Fair", "Cultural Festival of Bangladesh", "International Folk Music Festival", "Bangladesh Science and Technology Fair", "International Women's Day Celebration", "Sundarbans Conservation Festival", "Bengal Renaissance Festival", "Dhaka International Trade Fair", "Jute Festival", "Bangla New Year Celebration", "International Photography Exhibition", "Food Festival in Dhaka"];
const eventLocations = ["Bashundhara (ICCB), Dhaka", "Dhaka", "Shilpakala Academy, Dhaka", "Bandarban", "Multiple Venues, Dhaka", "Sonargaon, Narayanganj", "Bengal Foundation, Dhaka", "Sylhet", "Rajshahi", "Cox's Bazar", "Gulshan, Dhaka", "Suhrawardy Udyan, Dhaka", "Narayanganj", "Chittagong", "Dhaka", "Khulna", "Dhaka", "Dhaka", "Sundarbans", "Dhaka", "Dhaka", "Faridpur", "Nationwide", "Dhaka", "Dhaka"];

export const events: EventItem[] = eventNames.map((name, i) => ({
  id: String(i + 1),
  name,
  image: img(i + 1),
  location: eventLocations[i],
  start: dateOf(i, 13),
  end: dateOf(i, 16),
  days: [3, 10, 2, 4, 6, 7, 8, 3, 2, 5][i % 10],
}));

const galleryHeights = [260, 335, 482, 335, 482, 260, 397, 335, 260, 335, 344, 400, 402, 260, 406, 335, 260, 335, 361, 487];
export const gallery: GalleryItem[] = galleryHeights.map((height, i) => ({
  id: String(i + 1),
  style: "RT5374654",
  name: "Premium Cottom Long Slew Shirt",
  image: img(i + 1),
  height,
}));

const tagBuyers = ["Redtape", "BlueSky", "GreenGear", "PureWave", "TechStyle", "UrbanStitch", "EcoForm", "DuskDesign", "VividVibes", "ClassicThreads", "InspireWear", "ChicBoutique", "SustainableStyle", "FusionFabric", "ArtisanAttire", "DynamicDrape", "ZenithWear", "BreezyStyles", "ElementalApparel", "RadiantWear", "ModernMuse", "HeritageThreads", "TimelessDesigns", "InfiniteStyles", "FusionTrend"];
const tagStyles = ["AFG-LW CK86", "BGR-XX QL12", "GGR-KF 23", "PWM-JN 74", "TST-FG 45", "USH-MN 88", "EFM-QZ 91", "DSD-PX 31", "VVB-LY 12", "CTH-WR 56", "INS-TR 08", "CBT-QL 19", "SSY-GH 03", "FFB-KD 27", "AAT-LB 39", "DRA-GM 50", "ZNW-JR 64", "BRS-GH 15", "EAP-TK 36", "RDW-PX 78", "MDM-QW 90", "HTH-BL 22", "TMD-NF 48", "IST-KF 29", "FTD-LN 88"];
const tagFabrics = ["100% BCI Cotton", "Organic Cotton Blend", "Recycled Polyester", "100% Organic Linen", "Nylon Blend", "Cotton Spandex Mix", "Biodegradable Fabric", "Silk Blend", "Cotton Merino Wool", "100% Wool", "Modal Blend", "Synthetic Fiber", "Hemp Cotton Mix", "Recycled Cotton", "Linen Rayon Blend", "Mesh Material", "Vegan Leather", "Viscose Blend", "Bamboo Fiber", "Cotton Twill", "Tencel Fabric", "Sustainable Wool", "Cotton Sateen", "French Terry", "Polyester Cotton Blend"];
const tagDevTypes = ["Design Dev", "Conceptualization", "Prototyping", "Testing", "Manufacturing", "Final Review", "Marketing", "User Testing", "Launch", "Post-Launch Review", "Feedback Gathering", "Season Planning", "Design Iteration", "Resource Allocation", "Quality Assurance", "Trend Analysis", "Stakeholder Presentation", "Collaboration Meetings", "Sales Strategy", "Distribution Planning", "Market Research", "Innovation Workshop", "Budget Review", "Closure Planning", "Future Projections"];

export const hangTags: HangTagRow[] = tagBuyers.map((buyer, i) => ({
  id: String(i + 1),
  dn: `DN-${String(i + 1).padStart(2, "0")}`,
  buyer,
  style: tagStyles[i],
  fabric: tagFabrics[i],
  image: img(i + 1),
  devType: tagDevTypes[i],
}));

export const clientProduct: ClientProduct = {
  slug: "RT5374654",
  style: "RT5374654",
  name: "Premium Cottom Long Slew Shirt",
  images: ["/figma/client/shirt-pink.png", img(1), img(2)],
  fabric: "100% Cotton (Plan Weave)",
  finish: "Garment Wash",
  color: "Passion Plum, Blue, Black",
  origin: "Bangladesh",
  leadTime: "60 Days",
  moq: 3000,
  tiers: [
    { qty: 3000, unitPrice: 7.6 },
    { qty: 10000, unitPrice: 7.2 },
    { qty: 20000, unitPrice: 6.9 },
    { qty: 50000, unitPrice: 6.5 },
    { qty: 100000, unitPrice: 6.1 },
  ],
  lastUpdate: "16 Oct, 2026",
};

export const dashboard: DashboardData = {
  kpis: [
    { label: "Total Sample Qty", value: "128 PCs" },
    { label: "Total View Product", value: "2,478 K" },
    { label: "Interested Products", value: "693" },
    { label: "Inquiries Received", value: "168" },
    { label: "Conversion Rate", value: "13.68%" },
  ],
  developments: [
    ["Redtape", "100% BCI Cotton", 1.23, 2.25, 4.6, 0.07],
    ["Bluewave", "80% BCI Cotton, 20% Polyester", 1.5, 3, 6, 0.08],
    ["Greenfield", "75% BCI Cotton, 25% Linen", 1.75, 3.5, 7, 0.09],
    ["Yellowstone", "50% BCI Cotton, 50% Modal", 2, 4, 8, 0.1],
    ["Blackstone", "100% Organic Cotton", 1.25, 2.5, 5, 0.06],
    ["Whitetail", "90% BCI Cotton, 10% Spandex", 1.6, 3.2, 6.4, 0.08],
    ["Copperfield", "60% BCI Cotton, 40% Tencel", 1.4, 2.8, 5.6, 0.07],
    ["Silverlake", "70% BCI Cotton, 30% Hemp", 1.8, 3.6, 7.2, 0.09],
    ["Cobalt", "100% Recycled Cotton", 2.2, 4.4, 8.8, 0.11],
    ["Magentaflare", "90% BCI Cotton, 10% Viscose", 1.9, 3.8, 7.6, 0.09],
  ].map(([buyer, fabric, yy, price, fob, epm], i) => ({
    dn: `DN-${String(i + 1).padStart(2, "0")}`,
    buyer: buyer as string,
    style: `AFG-LW CK${86 + i}`,
    fabric: fabric as string,
    fabricYY: `${(yy as number).toFixed(2)} Yard`,
    fabricPrice: price as number,
    fob: fob as number,
    epm: epm as number,
  })),
  visitorsTrend: [
    { date: "12 May", value: 99 }, { date: "", value: 95 }, { date: "13 May", value: 97.8 }, { date: "", value: 97.8 },
    { date: "14 May", value: 97 }, { date: "", value: 95.2 }, { date: "15 May", value: 94 }, { date: "", value: 92.3 },
    { date: "16 May", value: 93.5 }, { date: "", value: 92.9 }, { date: "17 May", value: 92.7 }, { date: "18 May", value: 91.9 },
  ],
  fabricInterest: [
    { name: "Cotton", pct: 80, color: "#2084ff" },
    { name: "Linen", pct: 54, color: "#0e7a3f" },
    { name: "Polyester", pct: 35, color: "#f59e0b" },
    { name: "Cotton Blend", pct: 22, color: "#8b3dff" },
    { name: "Other", pct: 10, color: "#d4d4d4" },
  ],
  categories: [
    { name: "Shirt", count: 92, pct: 36, color: "#4a7fd9" },
    { name: "Denim pant", count: 61, pct: 24, color: "#7fae78" },
    { name: "Chino Pant", count: 45, pct: 18, color: "#f59e0b" },
    { name: "Ladies Dress", count: 28, pct: 11, color: "#8b5cf6" },
    { name: "Swimming shorts", count: 26, pct: 11, color: "#c9ccd3" },
  ],
  countries: [
    { name: "United Kingdom", pct: 92 },
    { name: "USA", pct: 64 },
    { name: "Canada", pct: 11 },
    { name: "Poland", pct: 8 },
    { name: "Netherland", pct: 8 },
    { name: "India", pct: 8 },
  ],
};

export const masterData = {
  buyers: ["RedTape", "BlueWave", "GreenLeaf", "YellowSun", "PurpleSky"],
  departments: ["Men's", "Women's", "Kids"],
  productTypes: ["Woven", "Knit", "Sweater", "Denim"],
  seasons: ["Summer", "Winter", "Spring", "Autumn"],
  fabricCategories: ["Fabrics", "Denim", "Knit"],
  fabricTypes: ["Denim Types | Rigid Denim", "Plain Weave", "Twill"],
  dyeTypes: ["Fiber Dye", "Yarn Dye", "Piece Dye"],
  finishTypes: ["Mechanical", "Chemical", "Garment Wash"],
  trimCategories: ["Thread", "Button", "Zipper", "Label"],
  trimTypes: ["Polyester", "Metal", "Plastic"],
  constructions: ["Single", "Double", "Triple"],
  uoms: ["PCs", "Yard", "Meter", "Cone", "Kg"],
  sources: ["Nominated", "Non-nominated"],
  suppliers: ["Zara", "YKK", "Coats", "Avery Dennison"],
  paymentTerms: ["LC 90 Days", "LC 60 Days", "TT Advance"],
};
