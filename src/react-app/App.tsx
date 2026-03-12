import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/react-app/hooks/useCart';
import ErrorBoundary from '@/react-app/components/ErrorBoundary';
import Home from '@/react-app/pages/Home.tsx';
import ProductDetail from '@/react-app/pages/ProductDetail.tsx';
import Welcome from '@/react-app/pages/Welcome.tsx';

export default function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  );
}