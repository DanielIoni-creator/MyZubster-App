# MyZubster-App 📱

**App Android per MyZubster marketplace**

[![Licenza: GPLv3](https://img.shields.io/badge/Licenza-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![React Native](https://img.shields.io/badge/React_Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)

---

## 📖 Cos'è questo progetto?

Questa è l'**app Android** per [MyZubster Marketplace](https://github.com/DanielIoni-creator/MyZubster-Marketplace). Permette agli utenti di navigare tra le competenze, creare ordini e pagare con Monero.

**Funzionalità:**
- 👤 **Autenticazione utente** — registrazione e login con JWT
- 🛠️ **Esplora competenze** — cerca e filtra i servizi disponibili
- 💰 **Paga con Monero** — via MyZubster gateway
- 📦 **Traccia ordini** — stato e conferma pagamento
- 👨‍💼 **Dashboard venditore** — gestisci competenze e ordini

---

## 🚀 Avvio rapido

### 1️⃣ Avvia i backend

```bash
# Avvia MyZubster (gateway pagamenti)
cd MyZubsterAPP/backend
docker-compose up -d

# Avvia il marketplace
cd MyZubster-Marketplace
npm install
npm start
2️⃣ Installa e avvia l'app
bash

git clone https://github.com/DanielIoni-creator/MyZubster-App.git
cd MyZubster-App
npm install
npm start

Scansiona il QR code con l'app Expo Go sul telefono.
📱 Struttura dell'app
text

MyZubster-App/
├── App.js              # Componente principale
├── src/
│   ├── screens/        # Login, Home, Profilo
│   ├── components/     # Componenti riutilizzabili
│   ├── services/       # Chiamate API
│   └── utils/          # Helper
├── package.json        # Dipendenze
└── app.json            # Configurazione Expo

🔗 Progetti correlati

    MyZubsterAPP — Core gateway pagamenti → GitHub

    MyZubster-Marketplace — API backend → GitHub

📄 Licenza

GNU GPLv3

Realizzato con ❤️ per la comunità Monero 🏘️