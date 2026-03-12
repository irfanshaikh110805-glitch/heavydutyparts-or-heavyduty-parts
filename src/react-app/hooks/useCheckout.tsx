import { useState } from 'react';
import { CartItem } from '@/shared/types';

interface CheckoutData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface UseCheckoutReturn {
  isProcessing: boolean;
  error: string | null;
  processCheckout: (data: CheckoutData, items: CartItem[], currency: string) => Promise<boolean>;
}

export function useCheckout(): UseCheckoutReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processCheckout = async (
    data: CheckoutData,
    items: CartItem[],
    currency: string
  ): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);

    try {
      // Validate inputs
      if (!data.customerName.trim()) {
        throw new Error('Please enter your name');
      }
      if (!data.customerEmail.trim() && !data.customerPhone.trim()) {
        throw new Error('Please provide either email or phone number');
      }
      if (items.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Calculate total
      const totalAmount = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      // Prepare order data
      const orderData = {
        customer_name: data.customerName,
        customer_email: data.customerEmail || undefined,
        customer_phone: data.customerPhone || undefined,
        cart_items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total_amount: totalAmount,
        currency
      };

      // Submit order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to process order');
      }

      const result = await response.json();

      // Open WhatsApp with order details
      if (result.whatsapp_message) {
        const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919964264412';
        const encodedMessage = encodeURIComponent(result.whatsapp_message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process checkout';
      setError(errorMessage);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, error, processCheckout };
}
