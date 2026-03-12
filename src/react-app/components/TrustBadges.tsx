import { Shield, Award, Truck, Users } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "ISO certified parts"
  },
  {
    icon: Award,
    title: "Industry Leader",
    description: "5+ years experience"
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Pan-India delivery"
  },
  {
    icon: Users,
    title: "Trusted by 1000+",
    description: "Happy customers"
  }
];

export default function TrustBadges() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-gray-800 border-y border-gray-700 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 animate-shimmer" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left group animate-slide-in-left stagger-${Math.min(index + 1, 4)}`}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-smooth shadow-lg group-hover:shadow-orange-500/50">
                <badge.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h4 className="text-white font-semibold text-xs sm:text-sm leading-tight group-hover:text-orange-400 transition-smooth">{badge.title}</h4>
                <p className="text-gray-400 text-xs leading-tight">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
