# MyZubster-App 📱

**App Android pour MyZubster marketplace**

[![Licence: GPLv3](https://img.shields.io/badge/Licence-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![React Native](https://img.shields.io/badge/React_Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)

---

## 📖 Qu'est-ce que c'est ?

C'est l'**app Android** pour [MyZubster Marketplace](https://github.com/DanielIoni-creator/MyZubster-Marketplace). Elle permet aux utilisateurs de parcourir les compétences, passer des commandes et payer avec Monero.

**Fonctionnalités :**
- 👤 **Authentification** — inscription et connexion avec JWT
- 🛠️ **Parcourir les compétences** — rechercher et filtrer les services
- 💰 **Payer avec Monero** — via MyZubster gateway
- 📦 **Suivre les commandes** — statut et confirmation de paiement
- 👨‍💼 **Tableau de bord vendeur** — gérer compétences et commandes

---

## 🚀 Démarrage rapide

### 1️⃣ Démarre les backend

```bash
# Démarre MyZubster (passerelle de paiement)
cd MyZubsterAPP/backend
docker-compose up -d

# Démarre le marketplace
cd MyZubster-Marketplace
npm install
npm start
2️⃣ Installe et lance l'app
bash

git clone https://github.com/DanielIoni-creator/MyZubster-App.git
cd MyZubster-App
npm install
npm start

Scanne le code QR avec l'app Expo Go sur ton téléphone.
📱 Structure de l'app
text

MyZubster-App/
├── App.js              # Composant principal
├── src/
│   ├── screens/        # Login, Accueil, Profil
│   ├── components/     # Composants réutilisables
│   ├── services/       # Appels API
│   └── utils/          # Helpers
├── package.json        # Dépendances
└── app.json            # Configuration Expo

🔗 Projets associés

    MyZubsterAPP — Passerelle de paiement core → GitHub

    MyZubster-Marketplace — API backend → GitHub

📄 Licence

GNU GPLv3

Construit avec ❤️ pour la communauté Monero 🏘️