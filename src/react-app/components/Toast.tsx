import { useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />
  };

  const bgColors = {
    success: 'from-green-600/90 to-green-700/90',
    error: 'from-red-600/90 to-red-700/90',
    info: 'from-blue-600/90 to-blue-700/90'
  };

  return (
    <div 
      className="fixed top-20 right-4 z-[60] animate-slide-in-right"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={`bg-gradient-to-r ${bgColors[type]} backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-2xl flex items-center space-x-3 min-w-[280px] max-w-md border border-white/20`}>
        {icons[type]}
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-smooth hover:scale-110"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
