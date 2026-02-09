import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { products, categories } from "../react-app/mocks/products";

const app = new Hono<{ Bindings: Env }>();

// Get all categories
app.get("/api/categories", async (c) => {
  try {
    return c.json(categories);
  } catch {
    return c.json({ error: "Failed to fetch categories" }, 500);
  }
});

// Get all products with optional filtering
app.get("/api/products", async (c) => {
  try {
    const query = c.req.query("query") || "";
    const category = c.req.query("category") || "";
    const sortBy = c.req.query("sortBy") || "name";
    const sortOrder = c.req.query("sortOrder") || "asc";
    const featured = c.req.query("featured");
    const bestseller = c.req.query("bestseller");

    // Filter products based on query parameters
    let filteredProducts = [...products];

    // Filter by search query
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        (product.description && product.description.toLowerCase().includes(searchTerm)) || 
        product.sku.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    if (category) {
      const categoryObj = categories.find(cat => cat.slug === category);
      if (categoryObj) {
        filteredProducts = filteredProducts.filter(product => product.category_id === categoryObj.id);
      }
    }

    // Filter by featured
    if (featured === "true") {
      filteredProducts = filteredProducts.filter(product => product.is_featured === 1);
    }

    // Filter by bestseller
    if (bestseller === "true") {
      filteredProducts = filteredProducts.filter(product => product.is_bestseller === 1);
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      // Handle different data types for sorting
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder.toLowerCase() === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder.toLowerCase() === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      return 0;
    });

    // Add category_name to each product
    const productsWithCategoryName = filteredProducts.map(product => {
      const category = categories.find(cat => cat.id === product.category_id);
      return {
        ...product,
        category_name: category ? category.name : null
      };
    });
    
    return c.json(productsWithCategoryName);
  } catch (error) {
    // Error handling for worker environment
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

// Get single product by ID
app.get("/api/products/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }
    
    const category = categories.find(cat => cat.id === product.category_id);
    
    return c.json({
      ...product,
      category_name: category ? category.name : null
    });
  } catch {
    return c.json({ error: "Failed to fetch product" }, 500);
  }
});

// Create order and send email
app.post("/api/orders", 
  zValidator("json", z.object({
    customer_email: z.string().email().optional(),
    customer_name: z.string().optional(),
    customer_phone: z.string().optional(),
    cart_items: z.array(z.object({
      product_id: z.number(),
      quantity: z.number().min(1),
      price: z.number()
    })),
    total_amount: z.number(),
    currency: z.string().default("USD")
  })),
  async (c) => {
    try {
      const data = c.req.valid("json");
      
      // Generate a unique order ID (timestamp-based in this implementation)
      const orderId = Date.now();

      // Format order details for WhatsApp
      let whatsappMessage = `*NEW ORDER - AdiSync Solutions*\n\n`;
      whatsappMessage += `Order ID: #${orderId}\n`;
      whatsappMessage += `Customer: ${data.customer_name || 'Not provided'}\n`;
      whatsappMessage += `Email: ${data.customer_email || 'Not provided'}\n`;
      whatsappMessage += `Phone: ${data.customer_phone || 'Not provided'}\n\n`;
      whatsappMessage += `*ITEMS:*\n`;
      
      for (const item of data.cart_items) {
        // Get product details from our products array
        const product = products.find(p => p.id === item.product_id);
        if (product) {
          whatsappMessage += `• ${product.name} (${product.sku})\n`;
          whatsappMessage += `  Qty: ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}\n\n`;
        }
      }
      
      whatsappMessage += `*TOTAL: ₹${data.total_amount} ${data.currency}*\n\n`;
      whatsappMessage += `Timestamp: ${new Date().toLocaleString()}`;

      return c.json({ 
        success: true, 
        order_id: orderId,
        whatsapp_message: whatsappMessage
      });
    } catch (error) {
      // Error handling for worker environment
      return c.json({ error: "Failed to create order" }, 500);
    }
  }
);

export default app;
