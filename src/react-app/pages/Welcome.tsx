import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package, Shield, Truck, ChevronRight } from 'lucide-react';
import Footer from '@/react-app/components/Footer';
import './Welcome.css';

export default function Welcome() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-gray-900/90 z-10"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center brightness-40 welcome-hero-bg"
        ></div>

        {/* Header */}
        <header className="relative z-20 container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white flex items-center">
              <span className="text-orange-500">Adi</span>
              <span>Sync</span>
              <span className="ml-1 text-orange-400 text-sm">Solutions</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors">About</a>
            <a href="#features" className="text-gray-300 hover:text-orange-400 transition-colors">Features</a>
            <a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact</a>
          </nav>
          <div className="flex space-x-4">
            <button 
              onClick={handleExploreClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Explore Products
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Industrial Hardware <span className="text-orange-500">Solutions</span> for Your Business
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Your trusted partner for premium industrial hardware parts and machinery components. 
              Quality guaranteed with fast delivery across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleExploreClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-all transform hover:scale-105"
              >
                Browse Catalog <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => navigate('/home?category=featured')}
                className="bg-transparent border border-white hover:border-orange-400 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-all hover:text-orange-400"
              >
                Featured Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About <span className="text-orange-500">AdiSync Solutions</span></h2>
            <p className="text-gray-300 leading-relaxed">
              AdiSync Solutions is a leading provider of industrial hardware parts and machinery components. 
              With years of experience in the industry, we have established ourselves as a trusted partner for businesses 
              across various sectors. Our commitment to quality, reliability, and customer satisfaction sets us apart.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-700 p-6 rounded-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-orange-500 mb-4">
                <Package className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-gray-300">
                We source our products from trusted manufacturers to ensure the highest quality standards.
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-orange-500 mb-4">
                <Truck className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-300">
                Our efficient logistics network ensures quick delivery of products to your doorstep.
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-orange-500 mb-4">
                <Shield className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Warranty & Support</h3>
              <p className="text-gray-300">
                We provide warranty on all our products and offer dedicated customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose <span className="text-orange-500">Us</span></h2>
            <p className="text-gray-300 leading-relaxed">
              We offer a wide range of industrial hardware parts and machinery components to meet your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="flex items-start">
              <div className="bg-orange-500 p-2 rounded-full mr-4">
                <ChevronRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Extensive Product Range</h3>
                <p className="text-gray-300">
                  From excavator parts to engine components, we have everything you need for your industrial machinery.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-orange-500 p-2 rounded-full mr-4">
                <ChevronRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Competitive Pricing</h3>
                <p className="text-gray-300">
                  We offer competitive prices without compromising on quality, ensuring the best value for your money.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-orange-500 p-2 rounded-full mr-4">
                <ChevronRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Expert Consultation</h3>
                <p className="text-gray-300">
                  Our team of experts is always ready to help you find the right products for your specific requirements.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-orange-500 p-2 rounded-full mr-4">
                <ChevronRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">After-Sales Support</h3>
                <p className="text-gray-300">
                  We provide comprehensive after-sales support to ensure your satisfaction with our products.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={handleExploreClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium inline-flex items-center transition-all transform hover:scale-105"
            >
              Explore Our Products <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our full catalog of industrial hardware parts and machinery components.
          </p>
          <button 
            onClick={handleExploreClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium inline-flex items-center transition-all transform hover:scale-105"
          >
            Browse All Products <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}