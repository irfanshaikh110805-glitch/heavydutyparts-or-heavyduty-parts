import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { products, categories } from "../../src/react-app/mocks/products";

// Rate limiting helper (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100;
const RATE_WINDOW = 60000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  // Rate limiting
  const ip = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "unknown";
  if (!checkRateLimit(ip)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: "Too many requests" }),
    };
  }

  const path = event.path.replace("/.netlify/functions/api", "");
  const method = event.httpMethod;

  try {
    // GET /api/categories
    if (path === "/api/categories" && method === "GET") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(categories),
      };
    }

    // GET /api/products
    if (path === "/api/products" && method === "GET") {
      const params = event.queryStringParameters || {};
      const query = params.query || "";
      const category = params.category || "";
      const sortBy = params.sortBy || "name";
      const sortOrder = params.sortOrder || "asc";
      const featured = params.featured;
      const bestseller = params.bestseller;

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
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(productsWithCategoryName),
      };
    }

    // GET /api/products/:id
    const productIdMatch = path.match(/^\/api\/products\/(\d+)$/);
    if (productIdMatch && method === "GET") {
      const id = parseInt(productIdMatch[1]);
      const product = products.find(p => p.id === id);
      
      if (!product) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Product not found" }),
        };
      }
      
      const category = categories.find(cat => cat.id === product.category_id);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ...product,
          category_name: category ? category.name : null
        }),
      };
    }

    // POST /api/orders
    if (path === "/api/orders" && method === "POST") {
      const data = JSON.parse(event.body || "{}");
      
      // Generate a unique order ID
      const orderId = Date.now();

      // Format order details for WhatsApp
      let whatsappMessage = `*NEW ORDER - AdiSync Solutions*\n\n`;
      whatsappMessage += `Order ID: #${orderId}\n`;
      whatsappMessage += `Customer: ${data.customer_name || 'Not provided'}\n`;
      whatsappMessage += `Email: ${data.customer_email || 'Not provided'}\n`;
      whatsappMessage += `Phone: ${data.customer_phone || 'Not provided'}\n\n`;
      whatsappMessage += `*ITEMS:*\n`;
      
      for (const item of data.cart_items) {
        const product = products.find(p => p.id === item.product_id);
        if (product) {
          const safeName = product.name.replace(/[*_~`]/g, '');
          const safeSku = product.sku.replace(/[*_~`]/g, '');
          whatsappMessage += `• ${safeName} (${safeSku})\n`;
          whatsappMessage += `  Qty: ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}\n\n`;
        }
      }
      
      whatsappMessage += `*TOTAL: ₹${data.total_amount} ${data.currency}*\n\n`;
      whatsappMessage += `Timestamp: ${new Date().toLocaleString()}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          order_id: orderId,
          whatsapp_message: whatsappMessage
        }),
      };
    }

    // 404 for unknown routes
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" }),
    };

  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

export { handler };
