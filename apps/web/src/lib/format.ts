export const usd = (n: number, digits = 2) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

/** Trims trailing zeros: 0.0030 → $0.003, 2.5 → $2.50 (min 2 decimals). */
export const price = (n: number) => {
  const decimals = Math.max(2, (n.toString().split(".")[1] ?? "").length);
  return usd(n, Math.min(decimals, 4));
};

export const num = (n: number) => n.toLocaleString("en-US");
