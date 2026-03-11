# PA Markt MVP

A full-stack marketplace application with API, consumer app, and merchant app.

## Directory Structure

```
pa-markt-mvp/
├── api/                 # Backend API server
│   ├── controllers/     # API controllers
│   ├── data/           # Mock data (JSON files)
│   ├── routes/         # API routes
│   ├── server.js       # Entry point
│   └── package.json
├── consumer/           # Consumer mobile/web app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth, Cart)
│   │   ├── navigation/    # Navigation setup
│   │   ├── screens/       # App screens
│   │   ├── services/      # API services
│   │   └── utils/        # Utilities & config
│   ├── app.json
│   └── package.json
├── merchant/           # Merchant mobile/web app
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

## Running on Mobile (Expo Go)

For both consumer and merchant apps:

1. Install Expo Go on your iOS/Android device
2. Run `npx expo start`
3. Scan the QR code with Expo Go

## Tech Stack

- **API**: Express.js, Node.js
- **Mobile Apps**: React Native with Expo
- **Navigation**: React Navigation
- **HTTP Client**: Axios

## Default Test Users

Check `api/data/users.json` for test credentials.
