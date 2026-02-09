import { Search, ShoppingCart, Phone, Mail, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import CurrencySelector from './CurrencySelector';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  onCurrencyChange: (currency: string) => void;
  currentCurrency: string;
  onCategorySelect: (category: string) => void;
}

interface MenuCategory {
  name: string;
  slug: string;
  image: string;
  subcategories: {
    name: string;
    slug: string;
    image: string;
  }[];
}

const menuCategories: MenuCategory[] = [
  {
    name: 'Excavator Parts',
    slug: 'excavator-parts',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=200&h=150&fit=crop',
    subcategories: [
      { name: 'Tracks & Undercarriage', slug: 'tracks', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=150&h=120&fit=crop' },
      { name: 'Buckets', slug: 'buckets', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=120&fit=crop' },
      { name: 'Boom & Arm', slug: 'boom-arm', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=120&fit=crop' },
      { name: 'Cabin Parts', slug: 'cabin', image: 'https://images.unsplash.com/photo-1572083669928-e431728b4823?w=150&h=120&fit=crop' }
    ]
  },
  {
    name: 'Engine Components',
    slug: 'engine-components',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=150&fit=crop',
    subcategories: [
      { name: 'Filters', slug: 'filters', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Pistons', slug: 'pistons', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Gaskets', slug: 'gaskets', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Cooling System', slug: 'cooling', image: 'https://images.unsplash.com/photo-1572083669928-e431728b4823?w=150&h=120&fit=crop&auto=format&q=80' }
    ]
  },
  {
    name: 'Hydraulics',
    slug: 'hydraulics',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=150&fit=crop&auto=format&q=80',
    subcategories: [
      { name: 'Pumps', slug: 'pumps', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Cylinders', slug: 'cylinders', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Valves', slug: 'valves', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Hoses & Fittings', slug: 'hoses', image: 'https://images.unsplash.com/photo-1572083669928-e431728b4823?w=150&h=120&fit=crop&auto=format&q=80' }
    ]
  },
  {
    name: 'Transmission',
    slug: 'transmission',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop&auto=format&q=80',
    subcategories: [
      { name: 'Gears', slug: 'gears', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Clutches', slug: 'clutches', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Belts', slug: 'belts', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Drive Systems', slug: 'drive-systems', image: 'https://images.unsplash.com/photo-1572083669928-e431728b4823?w=150&h=120&fit=crop&auto=format&q=80' }
    ]
  },
  {
    name: 'Electrical Parts',
    slug: 'electrical',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop',
    subcategories: [
      { name: 'Sensors', slug: 'sensors', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=120&fit=crop' },
      { name: 'Switches', slug: 'switches', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=120&fit=crop' },
      { name: 'Wiring Harnesses', slug: 'wiring', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=120&fit=crop' },
      { name: 'Control Modules', slug: 'control-modules', image: 'https://images.unsplash.com/photo-1572083669928-e431728b4823?w=150&h=120&fit=crop' }
    ]
  },
  {
    name: 'Tools & Hardware',
    slug: 'tools',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=200&h=150&fit=crop&auto=format&q=80',
    subcategories: [
      { name: 'Bolts & Fasteners', slug: 'bolts', image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Hand Tools', slug: 'hand-tools', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Seals & O-Rings', slug: 'seals', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=120&fit=crop&auto=format&q=80' },
      { name: 'Lubricants', slug: 'lubricants', image: 'https://images.unsplash.com/photo-1572083669928-e431728b4823?w=150&h=120&fit=crop&auto=format&q=80' }
    ]
  }
];

export default function Header({ 
  cartItemCount, 
  onCartClick, 
  onSearchChange, 
  onCurrencyChange, 
  currentCurrency,
  onCategorySelect 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchQuery);
  };

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      {/* Main header */}
      <div className="w-full px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {/* Logo */}
          <div className="flex items-center min-w-0 flex-shrink-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">
              <span className="sm:hidden">AdiSync</span>
              <span className="hidden sm:block">AdiSync Solutions</span>
            </h1>
            <span className="ml-2 lg:ml-3 text-xs lg:text-sm text-orange-400 hidden lg:block">Industrial Hardware Parts</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-[200px] sm:max-w-md lg:max-w-2xl mx-1 sm:mx-2 lg:mx-8">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-0 px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:border-orange-500 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                title="Search"
                className="px-2 sm:px-3 lg:px-6 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 transition-colors flex-shrink-0"
              >
                <Search className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </button>
            </form>
          </div>

          {/* Cart, Currency Selector and Mobile Menu */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="hidden sm:block">
              <CurrencySelector 
                onCurrencyChange={onCurrencyChange} 
                currentCurrency={currentCurrency} 
              />
            </div>
            <button
              onClick={onCartClick}
              className="relative flex items-center px-1.5 sm:px-2 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="hidden lg:block text-sm">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-1.5 sm:p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu with Images */}
      <div className="bg-gray-700 border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="overflow-x-auto">
            <nav className="hidden lg:flex items-center justify-between w-full min-w-[1000px]">
            <a
              href="/"
              className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors font-medium flex items-center whitespace-nowrap"
            >
              WELCOME
            </a>
            
            <button
              onClick={() => handleCategoryClick('')}
              className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors font-medium whitespace-nowrap"
            >
              HOME
            </button>
            
            {menuCategories.map((category) => (
              <div
                key={category.slug}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(category.slug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleCategoryClick(category.slug)}
                  className="flex items-center px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors font-medium whitespace-nowrap"
                >
                  {category.name.toUpperCase()}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {/* Dropdown Menu with Images */}
                {activeDropdown === category.slug && (
                  <div className="absolute top-full left-0 w-80 bg-white shadow-xl border border-gray-200 rounded-lg z-40">
                    <div className="p-4">
                      {/* Category Header with Image */}
                      <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-16 h-12 object-cover rounded mr-3"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=150&h=120&fit=crop&auto=format&q=80';
                          }}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">Browse all {category.name.toLowerCase()}</p>
                        </div>
                      </div>

                      {/* Subcategories Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory.slug}
                            onClick={() => handleCategoryClick(subcategory.slug)}
                            className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <img
                              src={subcategory.image}
                              alt={subcategory.name}
                              className="w-10 h-8 object-cover rounded mr-2"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=150&h=120&fit=crop&auto=format&q=80';
                              }}
                            />
                            <span className="text-sm font-medium text-gray-700 hover:text-orange-600">
                              {subcategory.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* View All Link */}
                      <button
                        onClick={() => handleCategoryClick(category.slug)}
                        className="w-full mt-3 pt-3 border-t border-gray-200 text-center text-orange-600 hover:text-orange-700 font-medium"
                      >
                        View All {category.name} →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors font-medium whitespace-nowrap">
              CATALOGUES
            </button>
            <button className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors font-medium whitespace-nowrap">
              NEWS & OFFERS
            </button>
            <button className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors font-medium whitespace-nowrap">
              CONTACT US
            </button>
          </nav>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-600">
              <nav className="space-y-2">
                <a
                  href="/"
                  className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors font-medium"
                >
                  WELCOME
                </a>
                
                <button
                  onClick={() => handleCategoryClick('')}
                  className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors font-medium"
                >
                  HOME
                </button>
                
                {menuCategories.map((category) => (
                  <div key={category.slug}>
                    <button
                      onClick={() => handleCategoryClick(category.slug)}
                      className="flex items-center w-full text-left text-gray-300 hover:text-white py-2 transition-colors font-medium"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-8 h-6 object-cover rounded mr-2"
                      />
                      {category.name.toUpperCase()}
                    </button>
                    
                    {/* Mobile Subcategories */}
                    <div className="ml-6 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory.slug}
                          onClick={() => handleCategoryClick(subcategory.slug)}
                          className="block w-full text-left text-gray-400 hover:text-orange-400 py-1 text-sm"
                        >
                          {subcategory.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <button className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors font-medium">
                  CATALOGUES
                </button>
                <button className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors font-medium">
                  NEWS & OFFERS
                </button>
                <button className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors font-medium">
                  CONTACT US
                </button>
              </nav>
              
              <div className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-400">
                <div className="mb-4">
                  <p className="mb-2 text-gray-300">Select Currency:</p>
                  <CurrencySelector 
                    onCurrencyChange={onCurrencyChange} 
                    currentCurrency={currentCurrency} 
                  />
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 99642 64412</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>irfanshaikh110805@gmail.com</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
