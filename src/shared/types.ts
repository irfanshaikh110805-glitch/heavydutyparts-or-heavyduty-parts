import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  slug: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  sku: z.string(),
  price: z.number(),
  image_url: z.string().nullable(),
  category_id: z.number().nullable(),
  stock_quantity: z.number(),
  is_featured: z.number(),
  is_bestseller: z.number(),
  specifications: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().min(1),
});

export const OrderSchema = z.object({
  id: z.number(),
  customer_email: z.string().nullable(),
  customer_name: z.string().nullable(),
  customer_phone: z.string().nullable(),
  total_amount: z.number(),
  currency: z.string(),
  status: z.string(),
  order_items: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type Order = z.infer<typeof OrderSchema>;

export interface SearchFilters {
  query: string;
  category: string;
  priceRange: [number, number];
  sortBy: 'name' | 'price' | 'featured';
  sortOrder: 'asc' | 'desc';
}
