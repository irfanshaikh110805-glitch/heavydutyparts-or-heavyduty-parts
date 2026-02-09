import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/shared/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  currentCurrency?: string;
}

export default function ProductCard({ product, onAddToCart, currentCurrency = 'INR' }: ProductCardProps) {
  const navigate = useNavigate();
  
  const getCurrencySymbol = (currency: string) => {
    switch(currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'INR': 
      default: return '₹';
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4 hover:shadow-xl hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={handleProductClick}>
      {/* Image */}
      <div className="aspect-square mb-3 sm:mb-4 bg-gray-700 rounded-md overflow-hidden">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=300&auto=format&fit=crop&q=80'}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=300&auto=format&fit=crop&q=80';
          }}
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-white text-xs sm:text-sm line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <p className="text-xs text-orange-400 font-mono truncate">
          SKU: {product.sku}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
          <span className="text-base sm:text-lg font-bold text-orange-500">
            {getCurrencySymbol(currentCurrency)}{product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400">
            {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={product.stock_quantity === 0}
          className={`w-full py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
            product.stock_quantity === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          {product.stock_quantity === 0 ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
