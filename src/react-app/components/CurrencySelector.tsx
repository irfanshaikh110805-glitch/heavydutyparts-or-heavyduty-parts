import { useState } from 'react';
import { Globe } from 'lucide-react';

interface CurrencySelectorProps {
  onCurrencyChange: (currency: string) => void;
  currentCurrency: string;
}

const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

export default function CurrencySelector({ onCurrencyChange, currentCurrency }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const current = currencies.find(c => c.code === currentCurrency) || currencies[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-200 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors shadow-sm border border-gray-600"
      >
        <Globe className="w-4 h-4 text-orange-400" />
        <span className="font-medium">{current.symbol} {current.code}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-xl z-50 min-w-[200px] overflow-hidden">
          <div className="p-2 border-b border-gray-700 text-xs text-gray-400 uppercase font-semibold">Select Currency</div>
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => {
                onCurrencyChange(currency.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-700 flex items-center space-x-2 ${
                currency.code === currentCurrency ? 'bg-gray-700 text-orange-400' : 'text-gray-300'
              }`}
            >
              <span className="text-lg font-medium">{currency.symbol}</span>
              <div className="flex flex-col">
                <span className="font-medium">{currency.code}</span>
                <span className="text-xs text-gray-400">{currency.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
