import { z } from 'zod';
import { ProductSchema, CategorySchema } from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// API response validators
const ProductsResponseSchema = z.array(ProductSchema);
const CategoriesResponseSchema = z.array(CategorySchema);

export async function fetchProducts(params?: {
  query?: string;
  category?: string;
  featured?: boolean;
  bestseller?: boolean;
  sortBy?: string;
  sortOrder?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.query) searchParams.set('query', params.query);
  if (params?.category) searchParams.set('category', params.category);
  if (params?.featured) searchParams.set('featured', 'true');
  if (params?.bestseller) searchParams.set('bestseller', 'true');
  if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

  const url = `${API_BASE}/products${searchParams.toString() ? `?${searchParams}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  
  const data = await response.json();
  return ProductsResponseSchema.parse(data);
}

export async function fetchProductById(id: number) {
  const response = await fetch(`${API_BASE}/products/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  
  const data = await response.json();
  return ProductSchema.parse(data);
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE}/categories`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  
  const data = await response.json();
  return CategoriesResponseSchema.parse(data);
}
