import { BRAND } from "@/lib/brand";

/**
 * Format an amount held in paise (integer minor units) as Indian rupees.
 * Money is never stored or passed around as floats: ₹4,800 is 480000 paise.
 */
export function formatPaise(paise: number): string {
  if (!Number.isInteger(paise) || paise < 0) {
    throw new RangeError(`Amount must be a non-negative integer number of paise, got ${paise}`);
  }
  const whole = paise % 100 === 0;
  return new Intl.NumberFormat(BRAND.locale, {
    style: "currency",
    currency: BRAND.currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(paise / 100);
}
