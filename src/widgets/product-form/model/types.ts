import { Product, ProductVariant } from '../../../entities/product';

export interface ProductFormProps {
  initialProduct?: Partial<Product>;
  onSubmit: (product: Product) => void;
  isSubmitting?: boolean;
}

export interface ProductFormState {
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  attributes: Record<string, string>;
  variants: ProductVariant[];
  images: { file?: File; url: string; alt: string; position: number }[];
  errors: Record<string, string>;
}
