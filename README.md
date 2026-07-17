# MyZubster-App 📱

**Android app for MyZubster marketplace**

[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![React Native](https://img.shields.io/badge/React_Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)

---

## 📖 What is this?

This is the **Android mobile app** for the [MyZubster Marketplace](https://github.com/DanielIoni-creator/MyZubster-Marketplace). It allows users to browse skills, place orders, and pay with Monero.

**Features:**
- 👤 **User authentication** — register and login with JWT
- 🛠️ **Browse skills** — search and filter available services
- 💰 **Pay with Monero** — via MyZubster payment gateway
- 📦 **Track orders** — view order status and payment confirmation
- 👨‍💼 **Seller dashboard** — manage your skills and orders

---

## 🚀 Quick Start

### 1️⃣ Start the backend services

```bash
# Start MyZubster (payment gateway)
cd MyZubsterAPP/backend
docker-compose up -d

# Start the marketplace
cd MyZubster-Marketplace
npm install
npm start2️⃣ Install and run the app
bash

git clone https://github.com/DanielIoni-creator/MyZubster-App.git
cd MyZubster-App
npm install
npm start

Scan the QR code with the Expo Go app on your phone.
 App Structure
text

MyZubster-App/
├── App.js              # Main component
├── src/
│   ├── screens/        # Login, Home, Profile
│   ├── components/     # Reusable components
│   ├── services/       # API calls
│   └── utils/          # Helpers
├── package.json        # Dependencies
└── app.json            # Expo configuration

🔗 Related Projects

    MyZubsterAPP — Core payment gateway → GitHub

    MyZubster-Marketplace — Backend API → GitHub

📄 License

GNU GPLv3

Built with ❤️ for the Monero community 🏘️