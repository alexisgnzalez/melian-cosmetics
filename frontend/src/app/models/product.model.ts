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
}
