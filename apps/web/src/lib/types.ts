// Domain types shared by every page. They mirror the JSON the Go API will return,
// so swapping the mock data layer for real fetches does not touch the UI.

export type DevStatus = "draft" | "pending" | "reviewed" | "approved";
export type DevType = "Design Dev" | "Tech pack";
export type Source = "Nominated" | "Non-nominated";

export interface DevelopmentSummary {
  id: string;
  dn: string;
  buyer: string;
  style: string;
  fabric: string;
  devType: DevType;
  status: DevStatus;
}

export interface Operation {
  id: string;
  department: string;
  productType: string;
  itemName: string;
  smv: number;
  mcPerLine: number;
  efficiencyPct: number;
  requiredDay: number;
  avgProductionPerLine: number;
  epm: number;
  cm: number;
  cmPct: number;
  revenuePerMc: number;
}

export type CostCategory =
  | "fabric"
  | "stitching_trim"
  | "finishing_trim"
  | "value_addition"
  | "other_charge";

export interface CostItem {
  id: string;
  category: CostCategory;
  usnCode: string;
  name: string;
  image?: string;
  source: Source;
  wastagePct: number;
  requiredQty: number;
  unit: string;
  price: number;
  totalValue: number;
  pnl: number;
  status?: "pending" | "approved";
  /** Free-form attributes shown in the details modal (category specific). */
  attributes?: Record<string, string>;
}

export interface CostSectionSummary {
  singleUnitPrice: number;
  avgMatPrice: number;
  totalQty: number;
  totalCost: number;
  costPct: number;
  pnl: number;
}

export interface CostingSummaryPhase {
  name: string;
  totalOrderValue: number;
  cogs: number;
  commercialInterest: number;
  buyingCommission: number;
  cm: number;
  perPcsCm: number;
  mcEarningPerDay: number;
  mcEarningPerMonth: number;
  plannedLine: number;
  plannedMachine: number;
}

export interface ActivityStep {
  label: string;
  by: string;
  at: string;
  done: boolean;
}

export interface Comment {
  id: string;
  author: string;
  ref: string;
  body: string;
  image?: string;
  ago: string;
}

export interface DevelopmentDetail extends DevelopmentSummary {
  quantity: number;
  pack: string;
  moq: number | null;
  sampleQty: number;
  season: string;
  images: string[];
  fob: { current: number; previous: number[] };
  cost: {
    revenuePerMc: number;
    revenuePerMcTotal: number;
    epm: number;
    cm: number;
    cmPct: number;
    techPack?: { name: string; size: string };
  };
  financial: {
    cogs: number;
    cogsPct: number;
    commercialFinance: number | null;
    commercialFinancePct: number | null;
    buyingCommission: number | null;
    buyingCommissionPct: number | null;
    paymentTerm: string | null;
    requisitionBy: string;
  };
  operations: Operation[];
  items: CostItem[];
  sections: Record<CostCategory, CostSectionSummary>;
  summary: CostingSummaryPhase[];
  activity: ActivityStep[];
}

export interface FeasibilityRow {
  label: string;
  unit: string;
  value: string;
  highlight?: "red" | "amber";
}

export interface FeasibilityPlanRow {
  days: number;
  targetEff: number;
  productionPerDay: number;
  setupLossHour: number;
  utilizedHour: number;
}

export interface Visitor {
  id: string;
  email: string;
  eventName: string;
  emailTime: string;
  inquiryDate: string;
}

export type RequisitionStatus = "pending" | "approved" | "inprogress";

export interface Requisition {
  id: string;
  rn: string;
  buyer: string;
  style: string;
  sampleType: string;
  washType: string;
  qty: number;
  status: RequisitionStatus;
}

export interface RequisitionDetail extends Requisition {
  image: string;
  colors: number;
  season: string;
  physicalSample: boolean;
  note: string;
  fabrics: { name: string; physical: boolean }[];
  stitchingTrims: { name: string; physical: boolean }[];
  packingTrims: { name: string; physical: boolean }[];
  files: { label: string; name: string; size: string }[];
  sizes: string[];
  sizeBreakdown: { color: string; qty: number[] }[];
}

export interface Quote {
  id: string;
  itemName: string;
  styleNo: string;
  email: string;
  moreEmails: number;
  location: string;
  eventName: string;
  emailTime: string;
  to: string[];
  cc: string[];
}

export interface EventItem {
  id: string;
  name: string;
  image: string;
  location: string;
  start: string;
  end: string;
  days: number;
}

export interface GalleryItem {
  id: string;
  style: string;
  name: string;
  image: string;
  height: number;
}

export interface HangTagRow {
  id: string;
  dn: string;
  buyer: string;
  style: string;
  fabric: string;
  image: string;
  devType: string;
}

export interface ClientProduct {
  slug: string;
  style: string;
  name: string;
  images: string[];
  fabric: string;
  finish: string;
  color: string;
  origin: string;
  leadTime: string;
  moq: number;
  /** Price breaks: quantity → unit price. The API decides the price; the page only displays it. */
  tiers: { qty: number; unitPrice: number }[];
  lastUpdate: string;
}

export interface DashboardData {
  kpis: { label: string; value: string }[];
  developments: {
    dn: string;
    buyer: string;
    style: string;
    fabric: string;
    fabricYY: string;
    fabricPrice: number;
    fob: number;
    epm: number;
  }[];
  visitorsTrend: { date: string; value: number }[];
  fabricInterest: { name: string; pct: number; color: string }[];
  categories: { name: string; count: number; pct: number; color: string }[];
  countries: { name: string; pct: number }[];
}
