# PA Markt MVP

A full-stack marketplace application with API, consumer app, merchant app, and service provider app.

## System Overview

**Slogan: Life Made Easy**

Pa Market is a mobile-first digital marketplace connecting:
- **Consumers** - Buyers looking for products and services
- **Merchants** - Product sellers
- **Service Providers** - Professionals offering services (plumbing, electrical, cleaning, etc.)

## Directory Structure

```
pa-markt-mvp/
├── api/                 # Backend API server
│   ├── controllers/     # API controllers
│   ├── data/           # Mock data (JSON files)
│   ├── routes/         # API routes
│   ├── server.js       # Entry point
│   └── package.json
├── consumer/           # Consumer mobile/web app (buyers)
│   ├── src/
│   │   ├── components/
│   │   ├── context/       # Auth, Cart
│   │   ├── navigation/
│   │   ├── screens/
│   │   ├── services/
│   │   └── utils/
│   ├── app.json
│   └── package.json
├── merchant/           # Merchant mobile/web app (sellers)
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── navigation/
│   │   ├── screens/
│   │   ├── services/
│   │   └── utils/
│   ├── app.json
│   └── package.json
├── provider/           # Service Provider app
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── navigation/
│   │   ├── screens/
│   │   ├── services/
│   │   └── utils/
│   ├── app.json
│   └── package.json
└── README.md
```

## How to Run

### 1. API (Backend)

```bash
cd api
npm install
npm start
```

The API will run on **http://localhost:3000**

- Health check: http://localhost:3000/health
- API endpoints: http://localhost:3000/api

### 2. Consumer App

```bash
cd consumer
npm install
npx expo start --web
```

The consumer web app will open in your browser at **http://localhost:8081**

### 3. Merchant App

```bash
cd merchant
npm install
npx expo start --web
```

The merchant web app will open in your browser at **http://localhost:8082**

### 4. Service Provider App

```bash
cd provider
npm install
npx expo start --web
```

The provider web app will open in your browser at **http://localhost:8083**

## Running on Mobile (Expo Go)

For all apps:

1. Install Expo Go on your iOS/Android device
2. Run `npx expo start`
3. Scan the QR code with Expo Go

## API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (merchant)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service by ID

### Providers
- `GET /api/providers` - List service providers
- `GET /api/providers/:id` - Get provider by ID

### Bookings
- `GET /api/bookings` - List bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking status

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order

### Auth
- `POST /api/auth/login` - Login

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Consumer | consumer@pamarkert.com | password123 |
| Merchant | merchant@pamarkert.com | password123 |
| Service Provider | provider@pamarkert.com | password123 |

## Features

### Consumer App
- Browse stores and products
- Search products
- Add to cart and checkout
- View orders
- Browse and book services

### Merchant App
- Login/Logout
- Dashboard with sales overview
- Product management (add, edit, delete)
- Order management

### Service Provider App
- Login/Logout
- Dashboard with bookings overview
- Accept/Decline bookings
- Mark bookings as complete
- View profile

## Tech Stack

- **API**: Express.js, Node.js
- **Mobile Apps**: React Native with Expo
- **Navigation**: React Navigation
- **HTTP Client**: Axios

## License

MIT
