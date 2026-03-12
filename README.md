<div align="center">

# 🔧 HeavyDuty Parts

### A modern e-commerce platform for heavy-duty parts and equipment

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

[Live Demo](https://heavydutyparts-shop.netlify.app) • [Report Bug](https://github.com/irfanshaikh110805-glitch/heavydutyparts-or-heavyduty-parts/issues) • [Request Feature](https://github.com/irfanshaikh110805-glitch/heavydutyparts-or-heavyduty-parts/issues)

</div>

---

## � Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

HeavyDuty Parts is a full-featured e-commerce web application designed for browsing and purchasing heavy-duty parts and equipment. Built with modern web technologies, it offers a seamless shopping experience with a responsive design that works across all devices.

---

## ✨ Features

- 🛒 **Shopping Cart Management** - Add, remove, and update quantities with real-time cart updates
- 📦 **Product Catalog** - Browse products organized by categories
- 🔍 **Product Details** - Detailed product pages with images, descriptions, and specifications
- 📱 **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Lightning-fast page loads with Vite and optimized builds
- 🎨 **Modern UI** - Clean and intuitive interface built with Tailwind CSS
- 🔐 **Secure Checkout** - Form validation and secure checkout process
- 🌐 **SEO Friendly** - Optimized for search engines

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite 6** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Netlify Functions** - Serverless functions
- **Hono** - Lightweight web framework
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/irfanshaikh110805-glitch/heavydutyparts-or-heavyduty-parts.git
   cd heavydutyparts-or-heavyduty-parts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file and add your configuration values.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:8888`

---

## 📁 Project Structure

```
heavydutyparts/
│
├── src/
│   ├── react-app/              # React application source
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Cart.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── Welcome.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useCart.tsx
│   │   │   └── useCheckout.tsx
│   │   ├── mocks/              # Mock data for development
│   │   └── main.tsx            # Application entry point
│   │
│   └── shared/                 # Shared utilities and types
│       ├── api.ts              # API client
│       └── types.ts            # TypeScript type definitions
│
├── netlify/
│   └── functions/              # Netlify serverless functions
│       └── api.ts
│
├── public/                     # Static assets
├── dist/                       # Production build output
│
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Netlify Dev (port 8888) |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🌐 Deployment

This project is configured for seamless deployment on Netlify.

### Deploy to Netlify

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Netlify will auto-detect the build settings

3. **Build Settings** (auto-detected)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

4. **Deploy**
   
   Click "Deploy site" and your application will be live!

### Environment Variables

If you have environment variables, add them in Netlify:
- Go to Site settings → Environment variables
- Add your variables

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👤 Contact

**Irfan Shaikh**

- GitHub: [@irfanshaikh110805-glitch](https://github.com/irfanshaikh110805-glitch)
- Project Link: [https://github.com/irfanshaikh110805-glitch/heavydutyparts-or-heavyduty-parts](https://github.com/irfanshaikh110805-glitch/heavydutyparts-or-heavyduty-parts)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Netlify](https://www.netlify.com/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by Irfan Shaikh

</div>
