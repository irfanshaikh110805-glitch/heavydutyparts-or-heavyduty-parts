import { Wrench, Cog, Zap, Settings, Truck, RotateCcw } from 'lucide-react';

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const categories = [
  {
    id: 1,
    name: 'Excavator Parts',
    slug: 'excavator-parts',
    icon: Truck,
    description: 'Tracks, buckets, hydraulics',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=300'
  },
  {
    id: 2,
    name: 'Engine Components',
    slug: 'engine-components',
    icon: Cog,
    description: 'Filters, pistons, gaskets',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300'
  },
  {
    id: 3,
    name: 'Hydraulics',
    slug: 'hydraulics',
    icon: Zap,
    description: 'Pumps, cylinders, valves',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300'
  },
  {
    id: 4,
    name: 'Electrical Parts',
    slug: 'electrical',
    icon: Settings,
    description: 'Sensors, switches, wiring',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300'
  },
  {
    id: 5,
    name: 'Transmission',
    slug: 'transmission',
    icon: RotateCcw,
    description: 'Gears, clutches, belts',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300'
  },
  {
    id: 6,
    name: 'Tools & Hardware',
    slug: 'tools',
    icon: Wrench,
    description: 'Bolts, nuts, tools',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300'
  }
];

export default function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Industrial Parts Categories</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">Browse our comprehensive selection of high-quality parts and components for construction and industrial equipment</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.slug)}
              className={`group bg-white p-3 sm:p-4 lg:p-6 rounded-xl shadow-md hover:shadow-2xl transition-smooth text-center border border-gray-200 hover:border-orange-400 hover-lift animate-scale-in stagger-${Math.min(index + 1, 6)}`}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center group-hover:from-orange-100 group-hover:to-orange-200 transition-smooth group-hover:scale-110 group-hover:rotate-6">
                <category.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-700 group-hover:text-orange-600 transition-smooth" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-orange-600 transition-smooth text-xs sm:text-sm lg:text-base">{category.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 leading-tight">{category.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
