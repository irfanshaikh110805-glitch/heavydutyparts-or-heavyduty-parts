import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/shared/types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export default function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: CartProps) {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Cart Sidebar */}
      <aside 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl z-50 animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 id="cart-title" className="text-lg font-semibold text-white">
              Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h2>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8 animate-scale-in">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
                  <ShoppingBag className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-500 text-sm">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={item.product.id} 
                    className={`flex items-center space-x-3 p-3 border border-gray-700 bg-gray-800 rounded hover:border-orange-500 transition-smooth animate-scale-in stagger-${Math.min(index + 1, 6)}`}
                  >
                    <img
                      src={item.product.image_url || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=80&auto=format&fit=crop&q=80'}
                      alt={`${item.product.name} - ${item.product.sku}`}
                      loading="lazy"
                      className="w-12 h-12 object-cover rounded transition-smooth hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=80&auto=format&fit=crop&q=80';
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-orange-400">{item.product.sku}</p>
                      <p className="text-sm font-medium text-orange-500">
                        ₹{item.product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                          className="p-1 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition-smooth active:scale-90"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm text-white font-medium" aria-label={`Quantity: ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition-smooth active:scale-90"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition-smooth hover:scale-110"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-700 p-4 space-y-4 glass-effect">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">Total:</span>
                <span className="text-2xl font-bold gradient-text animate-scale-in">
                  ₹{total.toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-medium py-3 rounded-lg transition-bounce btn-ripple shadow-lg hover:shadow-orange-500/50 active:scale-95"
              >
                Checkout via WhatsApp
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
