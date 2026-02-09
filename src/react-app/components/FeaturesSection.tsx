import { Truck, Shield, Clock, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick shipping across India with reliable logistics partners'
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'All parts tested and verified for quality and compatibility'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your queries'
  },
  {
    icon: Headphones,
    title: 'Expert Advice',
    description: 'Technical support from experienced parts specialists'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose AdiSync Solutions?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your trusted partner for industrial-grade hardware parts and machinery components with guaranteed quality and reliability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
