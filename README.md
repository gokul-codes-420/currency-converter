# World Currency Converter — Full Stack Web Application

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://gokul-codes-420.github.io/currency-converter/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/gokul-codes-420/currency-converter)

🔗 **Live Website**: [https://gokul-codes-420.github.io/currency-converter/](https://gokul-codes-420.github.io/currency-converter/)

A modern, professional, minimalist **World Currency Converter** built with **React (Vite)**, **Node.js (Express)**, **MongoDB (Mongoose)**, and real-time exchange rates for **160+ world currencies** powered by **ExchangeRate-API**.

Designed with an understated, premium financial aesthetic inspired by modern fintech applications (Wise, Stripe, Bloomberg) with clean typography, restrained accents, minimal animations, and zero clutter.

---

## 🌟 Key Features

* **Real-time Live Exchange Rates**: Live data for 160+ fiat currencies with European Central Bank & global market benchmarks.
* **Accurate Conversion Logic**: Supports decimals, large numbers, triangular cross-rate calculations, and prevents floating-point precision loss.
* **Country Flags & ISO Metadata**: Full currency names, ISO-4217 codes, symbols ($, €, ₹, £, ¥), and official country flags.
* **Interactive Currency Selector**: Searchable modal by currency name, ISO code, or symbol with quick filter tabs.
* **One-Click Currency Swap**: Smoothly exchanges source and target currencies without reloading.
* **Copy Result**: Instant clipboard copy with visual confirmation.
* **Exchange Rates Table**: Live rates table with customizable base currency, real-time search, multi-column sorting, and pagination.
* **Currencies Directory**: Complete catalog of all supported world currencies with quick "Use in Converter" shortcuts.
* **Conversion History & Favorites**: Local storage and MongoDB-backed conversion history and favorite currency pairs.
* **Dark & Light Mode**: Clean, high-contrast theme toggle with system preference detection and local persistence.
* **Resilient Architecture**:
  * Server-side in-memory caching (15-minute TTL) to minimize redundant external API requests.
  * Graceful fallback: works seamlessly even if MongoDB is not running locally.
  * Stale-while-revalidate mechanism if external API is temporarily unreachable.
* **100% Responsive**: Tested on desktop, laptop, tablet, and mobile screens.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Lucide React icons, CSS3 Custom Properties (Minimalist Design System) |
| **Backend** | Node.js, Express.js, Helmet, CORS, Express Rate Limit |
| **Database** | MongoDB with Mongoose (with built-in in-memory fallback store) |
| **Data Provider** | ExchangeRate-API (160+ world currencies, real-time benchmark rates) |
| **Deployment** | Frontend on Vercel, Backend on Render / Node.js host, Database on MongoDB Atlas |

---

## 📁 Project Structure

```text
world-currency-converter/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Resilient MongoDB connection & fallback state
│   │   ├── controllers/
│   │   │   ├── converterController.js # Currency conversion & popular pairs
│   │   │   ├── ratesController.js     # Rates table by base currency
│   │   │   └── historyController.js   # Conversion history, favorites, & preferences
│   │   ├── middleware/
│   │   │   ├── errorHandler.js        # Global error handling middleware
│   │   │   └── rateLimiter.js         # API rate limiter middleware
│   │   ├── models/
│   │   │   ├── ConversionHistory.js   # Mongoose model for conversion history
│   │   │   ├── FavoritePair.js        # Mongoose model for favorite currency pairs
│   │   │   └── UserPreference.js      # Mongoose model for user settings
│   │   ├── routes/
│   │   │   └── api.js                 # Express REST API routes
│   │   ├── services/
│   │   │   ├── currencyData.js        # Curated metadata dictionary (160+ currencies)
│   │   │   ├── exchangeRateService.js # Live API client, cache layer, & cross calculations
│   │   │   └── historyStorage.js      # Storage abstraction (MongoDB / memory fallback)
│   │   ├── app.js                     # Express application setup
│   │   └── server.js                  # HTTP server initialization
│   ├── package.json
│   ├── .env.example
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConverterCard.jsx      # Main interactive currency converter
│   │   │   ├── CurrencySelectorModal.jsx # Searchable modal with flags & filters
│   │   │   ├── FaqSection.jsx         # Accordion FAQ
│   │   │   ├── Footer.jsx             # Disclaimer, attribution, & navigation
│   │   │   ├── Navbar.jsx             # Responsive navigation & theme toggle
│   │   │   └── PopularPairs.jsx       # Benchmark pairs cards
│   │   ├── context/
│   │   │   └── ThemeContext.jsx       # Light/Dark mode state management
│   │   ├── pages/
│   │   │   ├── AboutPage.jsx          # Architecture & calculation methodology
│   │   │   ├── CurrenciesPage.jsx     # 160+ currencies directory
│   │   │   ├── HistoryPage.jsx        # Conversions log & favorites manager
│   │   │   ├── HomePage.jsx           # Main landing view
│   │   │   ├── PrivacyPage.jsx        # Privacy policy
│   │   │   ├── RatesPage.jsx          # Live exchange rates table
│   │   │   └── TermsPage.jsx          # Terms of service
│   │   ├── services/
│   │   │   └── api.js                 # Frontend API client with client fallbacks
│   │   ├── utils/
│   │   │   └── formatters.js          # Currency and date formatting utilities
│   │   ├── App.jsx                    # Root React component
│   │   ├── index.css                  # Minimalist design system tokens & styles
│   │   └── main.jsx                   # React DOM entry point
│   ├── index.html
│   ├── vite.config.js                 # Vite configuration with backend proxy
│   ├── package.json
│   ├── .env.example
│   └── .env
│
├── package.json                       # Top-level workspace runner
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js**: v18.0.0 or later (v20+ recommended)
* **npm**: v9.0.0 or later
* **MongoDB** *(Optional)*: A local MongoDB instance or MongoDB Atlas cluster URI. The application operates with full functionality using in-memory fallbacks if MongoDB is omitted.

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd world-currency-converter

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```ini
PORT=5001
NODE_ENV=development
EXCHANGE_RATE_API_URL=https://open.er-api.com/v6/latest
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Optional: MongoDB URI (leave empty to use in-memory store)
# MONGODB_URI=mongodb://127.0.0.1:27017/world_currency_converter
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/world_currency_converter
```

**Frontend (`frontend/.env`):**
```ini
# Leave empty for local development (Vite proxies /api to http://localhost:5001)
VITE_API_URL=
```

### 3. Run Development Servers

You can run both services simultaneously from the root directory:

```bash
# Terminal 1: Start Backend (Port 5001)
cd backend
npm run dev

# Terminal 2: Start Frontend (Port 5173)
cd frontend
npm run dev
```

Open your browser to [http://localhost:5173](http://localhost:5173).

---

## 📡 REST API Documentation

Base URL: `http://localhost:5001/api`

### 1. Health Check
* **Endpoint**: `GET /api/health`
* **Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-10-09T04:45:53.242Z",
  "database": "in-memory fallback active",
  "environment": "development"
}
```

### 2. Supported Currencies
* **Endpoint**: `GET /api/currencies`
* **Description**: Returns all 160+ supported currencies with names, symbols, and flags.

### 3. Currency Conversion
* **Endpoint**: `GET /api/convert?from=USD&to=INR&amount=100`
* **Parameters**:
  * `from` *(string)*: Source currency code (e.g. `USD`)
  * `to` *(string)*: Target currency code (e.g. `INR`)
  * `amount` *(number)*: Numerical value to convert (e.g. `100`)
  * `record` *(boolean, optional)*: Set to `false` to omit recording to history
* **Sample Response**:
```json
{
  "success": true,
  "data": {
    "from": "USD",
    "to": "INR",
    "amount": 100,
    "rate": 96.883664,
    "inverseRate": 0.010322,
    "convertedAmount": 9688.3664,
    "fromInfo": { "code": "USD", "name": "United States Dollar", "symbol": "$", "flag": "🇺🇸" },
    "toInfo": { "code": "INR", "name": "Indian Rupee", "symbol": "₹", "flag": "🇮🇳" },
    "lastUpdate": "Fri, 09 Oct 2026 00:02:31 +0000",
    "provider": "ExchangeRate-API"
  }
}
```

### 4. Exchange Rates by Base
* **Endpoint**: `GET /api/rates?base=USD`
* **Description**: Returns all currency rates relative to the requested base currency.

### 5. Popular Currency Pairs
* **Endpoint**: `GET /api/popular?base=USD`
* **Description**: Returns benchmark conversion rates for primary trading pairs.

### 6. Conversion History
* **Endpoint**: `GET /api/history?sessionId=anonymous&limit=20`
* **Clear**: `DELETE /api/history?sessionId=anonymous`

### 7. Favorite Pairs
* **Endpoint**: `GET /api/favorites?sessionId=anonymous`
* **Create**: `POST /api/favorites` with body `{"fromCurrency": "USD", "toCurrency": "EUR"}`
* **Delete**: `DELETE /api/favorites/:id`

---

## 🌐 Production Deployment Guide

### Deploying Frontend on Vercel
1. Push your repository to GitHub / GitLab.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository and select the **`frontend`** directory as the Root Directory.
4. Set Build Settings:
   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   * `VITE_API_URL`: `https://your-backend.onrender.com` (your deployed backend URL)
6. Click **Deploy**.

### Deploying Backend on Render
1. Log in to [Render](https://render.com) and click **"New +" → "Web Service"**.
2. Connect your repository.
3. Configure settings:
   * **Root Directory**: `backend`
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
4. Under **Environment Variables**, add:
   * `NODE_ENV`: `production`
   * `PORT`: `10000`
   * `ALLOWED_ORIGINS`: `https://your-frontend.vercel.app`
   * `MONGODB_URI`: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/world_currency_converter` *(optional, from MongoDB Atlas)*
5. Click **Create Web Service**.

---

## 🧪 Verification & Testing

* **Backend Health**: `curl http://localhost:5001/api/health`
* **Conversion Endpoint**: `curl "http://localhost:5001/api/convert?from=EUR&to=GBP&amount=50"`
* **Rates Table**: `curl "http://localhost:5001/api/rates?base=EUR"`
* **Frontend Build**: `cd frontend && npm run build`
* **Frontend Dev Server**: Visit `http://localhost:5173`

---

## 📄 Attribution & Disclaimer
Exchange rate data is provided by **ExchangeRate-API** for informational purposes. This service does not constitute investment advice.
