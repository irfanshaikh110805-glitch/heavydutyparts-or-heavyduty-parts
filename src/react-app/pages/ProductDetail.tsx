import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Package, Shield, Truck, Star } from 'lucide-react';
import { useCart } from '@/react-app/hooks/useCart';
import { Product } from '@/shared/types';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import Cart from '@/react-app/components/Cart';
import ProductCard from '@/react-app/components/ProductCard';

import { mockProducts } from '@/react-app/mocks/products';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    items,
    itemCount,
    isOpen: isCartOpen,
    addToCart,
    updateQuantity,
    removeItem,
    closeCart,
    toggleCart
  } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCurrency, setCurrentCurrency] = useState('INR');
  const [quantity, setQuantity] = useState(1);

  // Single product image - in a real app, this would come from the product data
  const productImages = [
    product?.image_url || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&auto=format&fit=crop&q=80'
  ];

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        
        if (response.ok && data) {
          setProduct(data);
          
          // Fetch related products from the same category
          if (data.category_id) {
            try {
              const relatedResponse = await fetch(`/api/products?category=${data.category_name?.toLowerCase()?.replace(' ', '-') || ''}`);
              const relatedData = await relatedResponse.json();
              
              if (Array.isArray(relatedData)) {
                setRelatedProducts(relatedData.filter((p: Product) => p.id !== data.id).slice(0, 4));
              } else {
                // Use mock related products if API doesn't return an array
                const mockRelated = mockProducts
                  .filter(p => p.category_id === data.category_id && p.id !== data.id)
                  .slice(0, 4);
                setRelatedProducts(mockRelated);
              }
            } catch (error) {
              console.error('Failed to fetch related products:', error);
              // Use mock related products on error
              const mockRelated = mockProducts
                .filter(p => p.category_id === data.category_id && p.id !== data.id)
                .slice(0, 4);
              setRelatedProducts(mockRelated);
            }
          }
        } else {
          // If product not found in API, try to find it in mock data
          const mockProduct = mockProducts.find(p => p.id === Number(id));
          if (mockProduct) {
            setProduct(mockProduct);
            // Set related products from mock data
            const mockRelated = mockProducts
              .filter(p => p.category_id === mockProduct.category_id && p.id !== mockProduct.id)
              .slice(0, 4);
            setRelatedProducts(mockRelated);
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        // Try to use mock data on API error
        const mockProduct = mockProducts.find(p => p.id === Number(id));
        if (mockProduct) {
          setProduct(mockProduct);
          // Set related products from mock data
          const mockRelated = mockProducts
            .filter(p => p.category_id === mockProduct.category_id && p.id !== mockProduct.id)
            .slice(0, 4);
          setRelatedProducts(mockRelated);
        } else {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleCheckout = async () => {
    const cartItems = items.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_items: cartItems,
          total_amount: total,
          currency: 'INR'
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        const whatsappUrl = `https://wa.me/919964264412?text=${encodeURIComponent(result.whatsapp_message)}`;
        window.open(whatsappUrl, '_blank');
        closeCart();
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header
          cartItemCount={itemCount}
          onCartClick={toggleCart}
          onSearchChange={() => {}}
          onCurrencyChange={setCurrentCurrency}
          currentCurrency={currentCurrency}
          onCategorySelect={() => {}}
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-white">Loading product...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        cartItemCount={itemCount}
        onCartClick={toggleCart}
        onSearchChange={() => {}}
        onCurrencyChange={setCurrentCurrency}
        currentCurrency={currentCurrency}
        onCategorySelect={(category) => navigate(`/?category=${category}`)}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-orange-400">{product.name}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={productImages[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&auto=format&fit=crop&q=80';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-orange-400 font-mono text-lg">SKU: {product.sku}</p>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-orange-500">
                    {currentCurrency === 'INR' ? '₹' : 
                     currentCurrency === 'USD' ? '$' : 
                     currentCurrency === 'EUR' ? '€' : 
                     currentCurrency === 'GBP' ? '£' : '₹'}
                    {product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 ml-2">(4.0)</span>
                  </div>
                </div>
                {/* Currency selector removed */}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">
                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
              </span>
            </div>

            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {product.specifications && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Specifications</h3>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(JSON.parse(product.specifications)).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-gray-400 text-xs uppercase">{key}</span>
                        <span className="text-white">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Purchase Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-white font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-gray-700 text-white rounded flex items-center justify-center hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-gray-700 text-white rounded flex items-center justify-center hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className={`flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    product.stock_quantity === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    const currencySymbol = currentCurrency === 'INR' ? '₹' : 
                                        currentCurrency === 'USD' ? '$' : 
                                        currentCurrency === 'EUR' ? '€' : 
                                        currentCurrency === 'GBP' ? '£' : '₹';
                    const message = `Hi, I'm interested in:\n\n*${product.name}*\nSKU: ${product.sku}\nPrice: ${currencySymbol}${product.price}\nQuantity: ${quantity}\nCurrency: ${currentCurrency}\n\nCould you please provide more details and availability?`;
                    const whatsappUrl = `https://wa.me/919964264412?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="flex items-center justify-center space-x-2 py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <span>WhatsApp Order</span>
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              <div className="text-center">
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Quality Guaranteed</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Fast Delivery</p>
              </div>
              <div className="text-center">
                <Package className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Original Parts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 border-t border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
