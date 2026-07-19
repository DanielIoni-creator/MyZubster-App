# 📱 MyZubster – Service Exchange App

**MyZubster** is a mobile application that connects people who offer services with those who need them. It’s a complete ecosystem for service exchange, built on privacy, security, and direct peer‑to‑peer interaction – powered by Monero payments.

---

## 🎯 What Is MyZubster App?

MyZubster is not just a marketplace. It’s a **trust‑based service exchange platform** where you can:

- Find professionals and services near you using **geolocation**
- Chat privately and securely with other users via **end‑to‑end encrypted messaging**
- Create and manage service orders with an **escrow system** that protects both parties
- Pay and get paid in **Monero (XMR)** – instantly, privately, without borders

Whether you're a freelancer looking for clients or a user needing a service, MyZubster gives you the tools to connect, agree, and transact safely.

---

## ✨ Key Features

### 📍 Geolocation

Find service providers near you. Browse skills, freelancers, and professionals based on your current location or a custom area. Perfect for local services, on‑site work, or meeting in person.

- Real‑time location‑based search
- Filter by distance, category, and rating
- Map view of available professionals

### 💬 Private & Secure Messaging

Every chat is **end‑to‑end encrypted**. No one else can read your messages – not us, not third parties. This ensures that your negotiations, agreements, and sensitive information stay private.

- Real‑time chat for each order
- File sharing (attachments, images, documents)
- Read receipts and typing indicators
- Chat history stored locally and encrypted

### 🛡️ Escrow System

The escrow system is the heart of trust in MyZubster. When a buyer creates an order, the payment is **held in escrow** until the service is delivered and the buyer confirms satisfaction. Only then are the funds released to the seller.

**How escrow works:**

1. **Buyer creates an order** – The agreed amount is locked in escrow (via Monero).
2. **Seller delivers the service** – The seller provides the work or service.
3. **Buyer confirms** – Once satisfied, the buyer releases the funds.
4. **Seller receives payment** – The Monero is transferred to the seller's wallet.

If there’s a dispute, the admin can intervene and decide the outcome based on evidence and communication logs (all encrypted and stored securely).

### 💰 Monero Payments

All payments are made in **Monero (XMR)** – the leading privacy‑focused cryptocurrency. This means:

- No banks, no intermediaries
- Instant settlement
- Full privacy – nobody can see your transaction history or balance
- Borderless – send and receive from anywhere in the world

### 🔐 JWT Authentication

Secure login and registration with **JSON Web Tokens**. Your session is protected, and your data is never exposed.

### 📦 Order Management

- Create service orders with clear requirements and deadlines
- Track order status (pending, in progress, completed, disputed)
- Receive real‑time updates via push notifications

### ⭐ Reviews & Ratings

Build trust in the community. After each order, both parties can rate each other and leave feedback. This helps everyone make informed decisions.

---

## 🏗️ How the Service Exchange Works (Step‑by‑Step)
    Buyer searches for a service (geolocation + filters)
    ↓

    Buyer views seller profile and reviews
    ↓

    Buyer initiates a chat to discuss details
    ↓

    They agree on price, timeline, and scope
    ↓

    Buyer creates an order → payment is locked in escrow
    ↓

    Seller delivers the service (or starts work)
    ↓

    Buyer verifies the delivery
    ↓

    Buyer confirms satisfaction → escrow releases funds to seller
    ↓

    Both parties rate each other

text


**Trust is built into every step.**

---

## 🧩 Architecture

┌─────────────────────────────────────────────────────────────┐
│ MYZUBSTER-APP │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│ │ Geolocation │ │ Messaging │ │ Escrow │ │
│ │ (Map + GPS) │ │ (E2E Enc.) │ │ (Smart Contract)│ │
│ └──────────────┘ └──────────────┘ └──────────────────┘ │
│ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│ │ Monero │ │ JWT Auth │ │ Order Management│ │
│ │ Payments │ │ (Secure) │ │ (Status, Chat) │ │
│ └──────────────┘ └──────────────┘ └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
text


---

## 🔐 Security & Privacy

- **End‑to‑End Encryption** – All messages are encrypted before leaving your device.
- **No Data Selling** – Your data is yours. We don't sell it to anyone.
- **Monero Payments** – Privacy by design. No one can track your financial activity.
- **Self‑Hosted Option** – You can host your own instance of the backend, giving you full control.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Android Studio (for APK build)
- Android device or emulator

### Installation

```bash
git clone https://github.com/DanielIoni-creator/MyZubster-App.git
cd MyZubster-App
npm install
cp .env.example .env

Configure .env
env

API_URL=http://192.168.1.10:3000/api
NODE_ENV=development

Start development server
bash

npx expo start --tunnel

Scan QR code with Expo Go.
📁 Project Structure
text

MyZubster-App/
├── app/
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── OrderScreen.js
│   │   ├── ChatScreen.js
│   │   ├── MapScreen.js
│   │   └── ProfileScreen.js
│   ├── components/
│   ├── services/
│   │   └── api.js
│   ├── context/
│   └── utils/
├── android/
├── .env
├── app.json
└── package.json

🔗 Related Projects

    MyZubster-Gateway – Core Monero payment gateway

    MyZubster-Marketplace – Marketplace backend

📄 License

MIT License
👨‍💻 About the Author

Daniel Ioni – Self‑Taught Developer & Monero Advocate

I'm a 38‑year‑old Italian developer based in Rimini, with a deep passion for privacy, financial freedom, and open‑source technology.

My journey started with Bitcoin mining and evolved into a deep involvement with the Monero community. I founded "Monero Italia" on Facebook, a group dedicated to spreading awareness about privacy‑focused cryptocurrencies in Italy.

Beyond the code, I love cats – I have a little companion named Chanel who keeps me company during late‑night coding sessions. 🐱

My vision for MyZubster is to create a free, open, and accessible ecosystem where anyone can exchange services and skills without intermediaries. The only rule? Use it for good. No illegal activities. Everything else is fair game.

    🌐 Based in Rimini, Italy

    💻 Self‑Taught Full‑Stack Developer (Node.js, React, React Native, Android)

    🔒 Monero Advocate & Privacy Enthusiast

    📱 Founder of "Monero Italia" (Facebook group)

    🐱 Cat dad to Chanel

    📫 GitHub: DanielIoni-creator

"The future is decentralized, private, and open source. Let's build it together."

Built with ❤️ for the Monero community.
Follow the development of MyZubster and connect with me on social media:

- 📖 **Blog & Articles**: [DEV.to - Daniel Ioni](https://dev.to/danielioni)
- 🐦 **X (Twitter)**: [@myzubster](https://x.com/myzubster)
- 💼 **LinkedIn**: [Daniel Ioni](https://www.linkedin.com/in/daniel-ioni-62b2b9423/)
- 🐙 **GitHub**: [DanielIoni-creator](https://github.com/DanielIoni-creator)

**Stay updated on the journey!** 🚀
