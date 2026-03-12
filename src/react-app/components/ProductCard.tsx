import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { Product } from '@/shared/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const navigate = useNavigate();
  
  const getCurrencySymbol = () => '₹';

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="group bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4 hover-lift hover:border-orange-500 transition-smooth cursor-pointer relative overflow-hidden"
      onClick={handleProductClick}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/5 group-hover:to-orange-600/10 transition-smooth pointer-events-none rounded-lg" />
      
      {/* Stock badge */}
      {product.stock_quantity > 0 && product.stock_quantity < 10 && (
        <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse-glow">
          Low Stock
        </div>
      )}
      
      {/* Image */}
      <div className="aspect-square mb-3 sm:mb-4 bg-gray-700 rounded-md overflow-hidden relative">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=300&auto=format&fit=crop&q=80'}
          alt={`${product.name} - ${product.sku}`}
          loading="lazy"
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=300&auto=format&fit=crop&q=80';
          }}
        />
        {/* Image overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" />
      </div>

      {/* Product Info */}
      <div className="space-y-2 relative z-10">
        <h3 className="font-medium text-white text-xs sm:text-sm line-clamp-2 leading-tight group-hover:text-orange-400 transition-smooth">
          {product.name}
        </h3>
        
        <p className="text-xs text-orange-400 font-mono truncate">
          SKU: {product.sku}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
          <span className="text-base sm:text-lg font-bold text-orange-500 group-hover:scale-105 transition-bounce inline-block">
            {getCurrencySymbol()}{product.price.toFixed(2)}
          </span>
          <span className={`text-xs ${product.stock_quantity > 10 ? 'text-green-400' : product.stock_quantity > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
            {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={product.stock_quantity === 0}
          aria-label={`Add ${product.name} to cart`}
          className={`w-full py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-bounce btn-ripple ${
            product.stock_quantity === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500/50 active:scale-95'
          }`}
        >
          {product.stock_quantity === 0 ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2 group-hover:animate-bounce-subtle" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
