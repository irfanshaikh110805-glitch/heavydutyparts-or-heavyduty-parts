import { ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
}

export default function HeroBanner({ onShopNow }: HeroBannerProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Quality Hardware Parts & Components
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
          Find genuine parts for excavators, construction equipment, and industrial machinery. 
          Fast delivery across India with quality guarantee.
        </p>
        <button
          onClick={onShopNow}
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
        >
          <span>Shop Now</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
