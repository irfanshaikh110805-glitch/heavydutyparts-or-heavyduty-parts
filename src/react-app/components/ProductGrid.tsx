import { memo } from 'react';
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

function ProductGrid({ 
  products, 
  loading, 
  onAddToCart,
  title = "Products",
  showAll = true
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-4" />
        <span className="ml-2 text-gray-300 animate-pulse">Loading products...</span>
        
        {/* Loading skeleton */}
        <div className="max-w-6xl mx-auto px-4 mt-8 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4 animate-shimmer">
                <div className="aspect-square mb-3 sm:mb-4 bg-gray-700 rounded-md skeleton" />
                <div className="h-4 bg-gray-700 rounded mb-2 skeleton" />
                <div className="h-3 bg-gray-700 rounded w-2/3 skeleton" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900">
        <div className="animate-scale-in">
          <p className="text-gray-400 text-lg mb-2">No products found.</p>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  const displayProducts = showAll ? products : products.slice(0, 8);

  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 sm:mb-8 animate-slide-in-left">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
          {!showAll && products.length > 8 && (
            <button className="text-orange-400 hover:text-orange-300 font-medium text-sm sm:text-base transition-smooth hover:scale-105">
              View All ({products.length})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayProducts.map((product, index) => (
            <div 
              key={product.id}
              className={`animate-scale-in stagger-${Math.min((index % 8) + 1, 6)}`}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ProductGrid);
