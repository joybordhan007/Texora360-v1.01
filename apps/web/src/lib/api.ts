// Data access layer. Every page reads data only through these functions.
// While NEXT_PUBLIC_API_URL is unset they return the Figma sample data; once the
// Go API is running, set the env var and the same calls hit the real endpoints.
import * as mock from "./mock-data";
import type {
  ClientProduct,
  DashboardData,
  DevelopmentDetail,
  DevelopmentSummary,
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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function get<T>(path: string, fallback: () => T | undefined): Promise<T | undefined> {
  if (!API_URL) return fallback();
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store", credentials: "include" });
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return (await res.json()) as T;
}

async function list<T>(path: string, fallback: T[]): Promise<T[]> {
  return (await get<T[]>(path, () => fallback)) ?? [];
}

export const api = {
  dashboard: () => get<DashboardData>("/dashboard", () => mock.dashboard) as Promise<DashboardData>,
  developments: () => list<DevelopmentSummary>("/developments", mock.developments),
  development: (id: string) => get<DevelopmentDetail>(`/developments/${id}`, () => mock.developmentDetail(id)),
  feasibility: async (id: string): Promise<{ rows: FeasibilityRow[]; plan: FeasibilityPlanRow[] }> =>
    (await get(`/developments/${id}/feasibility`, () => ({ rows: mock.feasibility, plan: mock.feasibilityPlan })))!,
  visitors: (id: string) => list<Visitor>(`/developments/${id}/visitors`, mock.visitors),
  inquiries: (id: string) => list<Visitor>(`/developments/${id}/inquiries`, mock.inquiries),
  requisitions: () => list<Requisition>("/requisitions", mock.requisitions),
  requisition: (id: string) => get<RequisitionDetail>(`/requisitions/${id}`, () => mock.requisitionDetail(id)),
  quotes: () => list<Quote>("/quotes", mock.quotes),
  events: () => list<EventItem>("/events", mock.events),
  gallery: () => list<GalleryItem>("/gallery", mock.gallery),
  hangTags: () => list<HangTagRow>("/hang-tags", mock.hangTags),
  clientProduct: (slug: string) => get<ClientProduct>(`/public/products/${slug}`, () => mock.clientProduct),
  comments: () => Promise.resolve(mock.comments),
  masterData: () => Promise.resolve(mock.masterData),
};
