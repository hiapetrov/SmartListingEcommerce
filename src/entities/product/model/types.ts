export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  tags: string[];
  attributes: Record<string, string>;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  attributes: Record<string, string>;
  sku: string;
  inventoryQuantity: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

export interface ProductDraft extends Omit<Product, 'id'> {
  id?: string;
}
