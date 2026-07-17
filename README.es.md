# MyZubster-App 📱

**App Android para MyZubster marketplace**

[![Licencia: GPLv3](https://img.shields.io/badge/Licencia-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![React Native](https://img.shields.io/badge/React_Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)

---

## 📖 ¿Qué es esto?

Esta es la **app Android** para [MyZubster Marketplace](https://github.com/DanielIoni-creator/MyZubster-Marketplace). Permite a los usuarios navegar por competencias, realizar pedidos y pagar con Monero.

**Características:**
- 👤 **Autenticación de usuario** — registro y login con JWT
- 🛠️ **Explorar competencias** — buscar y filtrar servicios
- 💰 **Pagar con Monero** — vía MyZubster gateway
- 📦 **Seguir pedidos** — estado y confirmación de pago
- 👨‍💼 **Panel de vendedor** — gestiona competencias y pedidos

---

## 🚀 Inicio rápido

### 1️⃣ Inicia los backend

```bash
# Inicia MyZubster (gateway de pagos)
cd MyZubsterAPP/backend
docker-compose up -d

# Inicia el marketplace
cd MyZubster-Marketplace
npm install
npm start
2️⃣ Instala y ejecuta la app
bash

git clone https://github.com/DanielIoni-creator/MyZubster-App.git
cd MyZubster-App
npm install
npm start

Escanea el código QR con la app Expo Go en tu teléfono.
📱 Estructura de la app
text

MyZubster-App/
├── App.js              # Componente principal
├── src/
│   ├── screens/        # Login, Home, Perfil
│   ├── components/     # Componentes reutilizables
│   ├── services/       # Llamadas API
│   └── utils/          # Helpers
├── package.json        # Dependencias
└── app.json            # Configuración Expo

🔗 Proyectos relacionados

    MyZubsterAPP — Core gateway de pagos → GitHub

    MyZubster-Marketplace — API backend → GitHub

📄 Licencia

GNU GPLv3

Hecho con ❤️ para la comunidad Monero 🏘️