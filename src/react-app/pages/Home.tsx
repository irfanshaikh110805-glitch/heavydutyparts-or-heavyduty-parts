import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '@/react-app/hooks/useCart';
import { Product } from '@/shared/types';
import Header from '@/react-app/components/Header';
import RotatingHeroBanner from '@/react-app/components/RotatingHeroBanner';
import CategoryGrid from '@/react-app/components/CategoryGrid';
import ProductGrid from '@/react-app/components/ProductGrid';
import FeaturesSection from '@/react-app/components/FeaturesSection';
import TrustBadges from '@/react-app/components/TrustBadges';
import Footer from '@/react-app/components/Footer';
import Cart from '@/react-app/components/Cart';

import { mockProducts } from '@/react-app/mocks/products';

export default function Home() {
  const [searchParams] = useSearchParams();
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

  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [currentCurrency, setCurrentCurrency] = useState('INR');

  // Fetch all products
  useEffect(() => {
    setLoading(true);
    
    // Function to filter mock products
    const getFilteredMockProducts = () => {
      let filteredProducts = [...mockProducts];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(query) || 
          (p.description && p.description.toLowerCase().includes(query)) ||
          p.sku.toLowerCase().includes(query)
        );
      }
      
      if (selectedCategory) {
        // Map category slugs to category IDs
        const categoryMap: { [key: string]: number } = {
          'hydraulic-components': 1,
          'hydraulics': 1,
          'engine-parts': 2,
          'engine-components': 2,
          'excavator-accessories': 3,
          'excavator-parts': 3,
          'electrical-systems': 4,
          'electrical': 4,
          'maintenance-tools': 5,
          'tools': 5
        };
        
        const categoryId = categoryMap[selectedCategory];
        if (categoryId) {
          filteredProducts = filteredProducts.filter(p => p.category_id === categoryId);
        }
      }
      
      return filteredProducts;
    };

    // Try API first, fallback to mock data
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (selectedCategory) params.append('category', selectedCategory);

    fetch(`/api/products?${params}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          // Use filtered mock data
          setProducts(getFilteredMockProducts());
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('API unavailable, using mock data:', err.message);
        // Use filtered mock data when API fails
        setProducts(getFilteredMockProducts());
        setLoading(false);
      });
  }, [searchQuery, selectedCategory]);

  // Fetch featured products
  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedProducts(data);
        } else {
          // Use mock featured products
          const mockFeatured = mockProducts.filter(p => p.is_featured === 1);
          setFeaturedProducts(mockFeatured);
        }
      })
      .catch(err => {
        console.warn('Featured products API unavailable, using mock data:', err.message);
        // Use mock featured products when API fails
        const mockFeatured = mockProducts.filter(p => p.is_featured === 1);
        setFeaturedProducts(mockFeatured);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        const whatsappUrl = `https://wa.me/919964264412?text=${encodeURIComponent(result.whatsapp_message)}`;
        window.open(whatsappUrl, '_blank');
        closeCart();
      } else {
        throw new Error(result.error || 'Checkout failed');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      
      // Fallback: Generate WhatsApp message directly on frontend
      const orderId = Date.now();
      let whatsappMessage = `*NEW ORDER - AdiSync Solutions*\n\n`;
      whatsappMessage += `Order ID: #${orderId}\n`;
      whatsappMessage += `*ITEMS:*\n`;
      
      for (const item of items) {
        whatsappMessage += `• ${item.product.name} (${item.product.sku})\n`;
        whatsappMessage += `  Qty: ${item.quantity} x ₹${item.product.price} = ₹${item.quantity * item.product.price}\n\n`;
      }
      
      whatsappMessage += `*TOTAL: ₹${total} INR*\n\n`;
      whatsappMessage += `Timestamp: ${new Date().toLocaleString()}`;

      const whatsappUrl = `https://wa.me/919964264412?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      closeCart();
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        cartItemCount={itemCount}
        onCartClick={toggleCart}
        onSearchChange={setSearchQuery}
        onCurrencyChange={setCurrentCurrency}
        currentCurrency={currentCurrency}
        onCategorySelect={setSelectedCategory}
      />

      <main>
        {/* Hero Section */}
        {!searchQuery && !selectedCategory && (
          <RotatingHeroBanner onCategorySelect={setSelectedCategory} />
        )}

        {/* Trust Badges */}
        {!searchQuery && !selectedCategory && (
          <TrustBadges />
        )}

        {/* Categories */}
        {!searchQuery && !selectedCategory && (
          <CategoryGrid onCategorySelect={setSelectedCategory} />
        )}

        {/* Featured Products */}
        {!searchQuery && !selectedCategory && featuredProducts.length > 0 && (
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Featured Products</h2>
              {/* Currency selector removed */}
            </div>
            <ProductGrid
               products={featuredProducts}
               loading={false}
               onAddToCart={handleAddToCart}
               title="Featured Products"
               showAll={false}
               currentCurrency={currentCurrency}
             />
          </div>
        )}

        {/* All Products */}
        <div id="products">
          <ProductGrid
          products={products}
          loading={loading}
          onAddToCart={handleAddToCart}
          title={selectedCategory ? 
              `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')} Products` : 
              searchQuery ? `Search Results for "${searchQuery}"` : 
              "All Products"
            }
          showAll={true}
          currentCurrency={currentCurrency}
        />
        </div>

        {/* Features */}
        {!searchQuery && !selectedCategory && (
          <FeaturesSection />
        )}
      </main>

      <Footer />

      {/* Cart */}
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
