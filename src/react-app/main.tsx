import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/react-app/App.tsx";
import { CartProvider } from "@/react-app/hooks/useCart.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);