import type { GridColumn } from "@/components/grid-form";
import type { CostCategory } from "@/lib/types";

type Master = Record<string, string[]>;

// Column lists copied from the Figma "Add …" modals (Development Costing page).
export const operationColumns = (m: Master): GridColumn[] => [
  { key: "department", label: "Department", options: m.departments, placeholder: "Select a department", width: 180 },
  { key: "productType", label: "Product Type", options: m.productTypes, placeholder: "Select a product type", width: 180 },
  { key: "itemName", label: "Item Name", placeholder: "Enter item name", width: 180 },
  { key: "smv", label: "SMV", type: "number", placeholder: "Enter smv", width: 140 },
  { key: "mcPerLine", label: "MC/Line", type: "number", placeholder: "Enter MC/Line", width: 140 },
];

export const addColumns = (m: Master): Record<CostCategory, GridColumn[]> => ({
  fabric: [
    { key: "category", label: "Category", options: m.fabricCategories },
    { key: "type", label: "Type", options: m.fabricTypes },
    { key: "fiberComposition", label: "Fiber Composition", width: 160 },
    { key: "countWarp", label: "Count Warp" },
    { key: "countWeft", label: "Count Weft" },
    { key: "epi", label: "EPI", type: "number" },
    { key: "ppi", label: "PPI", type: "number" },
    { key: "gsmB", label: "GSM (B)", placeholder: "Enter B wash gsm", type: "number" },
    { key: "gsmA", label: "GSM (A)", placeholder: "Enter A wash gsm", type: "number" },
    { key: "cuttableWidth", label: "Cuttable Width (Inch)", placeholder: "Enter width", type: "number" },
    { key: "dyeType", label: "Dye Type", options: m.dyeTypes },
    { key: "finishType", label: "Finish Type", options: m.finishTypes },
    { key: "shrinkageLength", label: "Shrinkage Length" },
    { key: "shrinkageWidth", label: "Shrinkage Width" },
    { key: "supplier", label: "Develop Supplier", options: m.suppliers },
    { key: "source", label: "Source", options: m.sources },
    { key: "unit", label: "Unit", options: m.uoms },
    { key: "wastage", label: "Wastage%", placeholder: "Enter wastage %", type: "number" },
    { key: "price", label: "Price", type: "number" },
    { key: "itemName", label: "Item Name", placeholder: "Generate Item Name", width: 160 },
    { key: "artwork", label: "Upload Art Work", type: "image" },
  ],
  stitching_trim: [
    { key: "category", label: "Category", options: m.trimCategories },
    { key: "type", label: "Type", options: m.trimTypes },
    { key: "construction", label: "Construction", options: m.constructions },
    { key: "texFinish", label: "Tex / Finish Type", placeholder: "Enter tex / finish type" },
    { key: "itemName", label: "Item Name", placeholder: "Generate Item Name", width: 160 },
    { key: "description", label: "Description", placeholder: "Enter item description", width: 160 },
    { key: "height", label: "Height", type: "number" },
    { key: "width", label: "Width", type: "number" },
    { key: "gsm", label: "GSM", type: "number" },
    { key: "consumption", label: "Consumption", type: "number", placeholder: "Enter Consumption" },
    { key: "uom", label: "UOM", options: m.uoms },
    { key: "baseUnit", label: "Base Unit", options: m.uoms },
    { key: "wastage", label: "Wastage%", type: "number" },
    { key: "price", label: "Price", type: "number" },
    { key: "source", label: "Source", options: m.sources },
    { key: "nominationProof", label: "Nomination Proof", options: ["Email", "Buyer Letter", "Tech Pack"], placeholder: "Select proof" },
    { key: "supplier", label: "Develop Supplier name", options: m.suppliers, placeholder: "Select develop supplier" },
    { key: "photo", label: "Item Photo", type: "image" },
  ],
  finishing_trim: [
    { key: "itemName", label: "Item Name", width: 160 },
    { key: "description", label: "Description", placeholder: "Enter item description", width: 160 },
    { key: "height", label: "Height", type: "number" },
    { key: "width", label: "Width", type: "number" },
    { key: "consumption", label: "Consumption", type: "number", placeholder: "Enter Consumption" },
    { key: "price", label: "Price", type: "number" },
    { key: "gsm", label: "GSM", type: "number" },
    { key: "wastage", label: "Wastage%", type: "number" },
    { key: "um", label: "UM", options: m.uoms },
    { key: "supplier", label: "Develop Supplier name", options: m.suppliers, placeholder: "Select develop supplier" },
    { key: "source", label: "Source", options: m.sources },
    { key: "photo", label: "Item Photo", type: "image" },
  ],
  value_addition: [
    { key: "itemName", label: "Item Name", width: 180 },
    { key: "description", label: "Description", placeholder: "Enter item description", width: 200 },
    { key: "consumption", label: "Consumption", type: "number", placeholder: "Enter Consumption" },
    { key: "price", label: "Price", type: "number" },
    { key: "wastage", label: "Wastage%", type: "number" },
    { key: "source", label: "Source", options: m.sources },
    { key: "um", label: "UM", options: m.uoms },
  ],
  other_charge: [
    { key: "itemName", label: "Item Name", width: 180 },
    { key: "description", label: "Description", placeholder: "Enter item description", width: 200 },
    { key: "consumption", label: "Consumption", type: "number", placeholder: "Enter Consumption" },
    { key: "price", label: "Price", type: "number" },
    { key: "wastage", label: "Wastage%", type: "number" },
    { key: "source", label: "Source", options: m.sources },
    { key: "um", label: "UM", options: m.uoms },
  ],
});

export const sectionMeta: Record<CostCategory, { title: string; addTitle: string; nameHeader: string; imageHeader: string; valueHeader: string; modalWidth: number }> = {
  fabric: { title: "Fabric:", addTitle: "Add Fabric", nameHeader: "Fabric Name", imageHeader: "Art Work", valueHeader: "Costing Value", modalWidth: 1620 },
  stitching_trim: { title: "Stitching Trims:", addTitle: "Add Stitching Trim", nameHeader: "Item Name", imageHeader: "IMAGE", valueHeader: "Total Value", modalWidth: 1620 },
  finishing_trim: { title: "Finishing & Packing Trims:", addTitle: "Add Finishing & Packing Trims:", nameHeader: "Item Type", imageHeader: "IMAGE", valueHeader: "Total Value", modalWidth: 1620 },
  value_addition: { title: "Value Addition:", addTitle: "Add Value Addition", nameHeader: "Item Type", imageHeader: "IMAGE", valueHeader: "Total Value", modalWidth: 1228 },
  other_charge: { title: "Other Charge:", addTitle: "Add Other Charge", nameHeader: "Item Type", imageHeader: "IMAGE", valueHeader: "Total Value", modalWidth: 1228 },
};
