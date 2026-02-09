import { Product } from '@/shared/types';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
  title?: string;
  showAll?: boolean;
  currentCurrency?: string;
}

export default function ProductGrid({ 
  products, 
  loading, 
  onAddToCart,
  title = "Products",
  showAll = true,
  currentCurrency = 'USD'
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <span className="ml-2 text-gray-300">Loading products...</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900">
        <p className="text-gray-400">No products found.</p>
      </div>
    );
  }

  const displayProducts = showAll ? products : products.slice(0, 8);

  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
          {!showAll && products.length > 8 && (
            <button className="text-orange-400 hover:text-orange-300 font-medium text-sm sm:text-base">
              View All ({products.length})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              currentCurrency={currentCurrency}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
