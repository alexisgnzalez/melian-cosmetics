export interface Product {
  id: string;
  name: string;
  description?: string;
  sellingPrice: number;
  discount: number;
  images: string[];
  broadCategory: string;
  mainCategory: string[];
  available: number;
  forSale: boolean;
  rating: number;
  reviews: number;
}

/** Unit price after applying the percentage-based discount. */
export function getDiscountedPrice(product: Product): number {
  const pct = product.discount || 0;
  return Math.round(product.sellingPrice * (1 - pct / 100) * 100) / 100;
}

/** Discount percentage (0 when there is none). */
export function getDiscountPercent(product: Product): number {
  return product.discount || 0;
}
