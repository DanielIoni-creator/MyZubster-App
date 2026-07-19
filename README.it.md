
---

### 🇮🇹 `README.it.md` (Italiano)

```markdown
# 📱 MyZubster – App per lo Scambio di Servizi

**MyZubster** è un'applicazione mobile che mette in contatto chi offre servizi con chi ne ha bisogno. È un ecosistema completo per lo scambio di servizi, basato su privacy, sicurezza e interazione diretta peer‑to‑peer – con pagamenti in Monero.

---

## 🎯 Cos'è MyZubster App?

MyZubster non è solo un marketplace. È una piattaforma di **scambio di servizi basata sulla fiducia** dove puoi:

- Trovare professionisti e servizi vicino a te grazie alla **geolocalizzazione**
- Chattare in modo privato e sicuro tramite **messaggistica crittografata end‑to‑end**
- Creare e gestire ordini di servizio con un **sistema escrow** che protegge entrambe le parti
- Pagare e ricevere pagamenti in **Monero (XMR)** – in modo istantaneo, privato e senza confini

---

## ✨ Funzionalità Principali

### 📍 Geolocalizzazione

Trova fornitori di servizi vicino a te. Cerca professionisti e freelance in base alla tua posizione attuale o a un'area personalizzata. Perfetto per servizi locali, lavoro in presenza o incontri dal vivo.

- Ricerca in tempo reale basata sulla posizione
- Filtri per distanza, categoria e valutazione
- Visualizzazione su mappa dei professionisti disponibili

### 💬 Messaggistica Privata e Sicura

Ogni chat è **crittografata end‑to‑end**. Nessuno può leggere i tuoi messaggi – né noi, né terze parti. Questo garantisce che le tue negoziazioni, accordi e informazioni sensibili rimangano private.

- Chat in tempo reale per ogni ordine
- Condivisione di file (allegati, immagini, documenti)
- Conferma di lettura e indicatore di scrittura
- Cronologia chat salvata localmente e crittografata

### 🛡️ Sistema Escrow

Il sistema escrow è il cuore della fiducia in MyZubster. Quando un acquirente crea un ordine, il pagamento viene **bloccato in escrow** fino a quando il servizio non viene consegnato e l'acquirente conferma la soddisfazione. Solo allora i fondi vengono rilasciati al venditore.

**Come funziona l'escrow:**

1. **L'acquirente crea un ordine** – L'importo concordato viene bloccato in escrow (tramite Monero).
2. **Il venditore consegna il servizio** – Il venditore fornisce il lavoro o il servizio.
3. **L'acquirente conferma** – Una volta soddisfatto, l'acquirente rilascia i fondi.
4. **Il venditore riceve il pagamento** – Il Monero viene trasferito al wallet del venditore.

In caso di disputa, l'amministratore può intervenire e decidere l'esito sulla base di prove e registri delle comunicazioni (tutti crittografati e conservati in modo sicuro).

### 💰 Pagamenti Monero

Tutti i pagamenti vengono effettuati in **Monero (XMR)** – la criptovaluta leader nella privacy. Questo significa:

- Niente banche, niente intermediari
- Regolamento istantaneo
- Privacy totale – nessuno può vedere la cronologia delle transazioni o il saldo
- Senza confini – invia e ricevi da qualsiasi parte del mondo

### 🔐 Autenticazione JWT

Login e registrazione sicuri tramite **JSON Web Tokens**. La tua sessione è protetta e i tuoi dati non vengono mai esposti.

### 📦 Gestione Ordini

- Crea ordini di servizio con requisiti e scadenze chiare
- Traccia lo stato dell'ordine (in attesa, in corso, completato, in disputa)
- Ricevi aggiornamenti in tempo reale tramite notifiche push

### ⭐ Recensioni e Valutazioni

Costruisci fiducia nella comunità. Dopo ogni ordine, entrambe le parti possono valutarsi reciprocamente e lasciare un feedback. Questo aiuta tutti a prendere decisioni informate.

---

## 🏗️ Come Funziona lo Scambio di Servizi (Passo per Passo)
L'acquirente cerca un servizio (geolocalizzazione + filtri)
↓

L'acquirente visualizza il profilo del venditore e le recensioni
↓

L'acquirente avvia una chat per discutere i dettagli
↓

Concordano prezzo, tempi e ambito
↓

L'acquirente crea un ordine → il pagamento viene bloccato in escrow
↓

Il venditore consegna il servizio (o inizia il lavoro)
↓

L'acquirente verifica la consegna
↓

L'acquirente conferma la soddisfazione → l'escrow rilascia i fondi al venditore
↓

Entrambe le parti si valutano a vicenda

**La fiducia è integrata in ogni passaggio.**

---

## 🧩 Architettura
┌─────────────────────────────────────────────────────────────┐
│ MYZUBSTER-APP │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│ │ Geolocation │ │ Messaging │ │ Escrow │ │
│ │ (Mappa + GPS)│ │ (E2E Enc.) │ │ (Smart Contract)│ │
│ └──────────────┘ └──────────────┘ └──────────────────┘ │
│ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│ │ Monero │ │ JWT Auth │ │ Gestione Ordini │ │
│ │ Pagamenti │ │ (Sicuro) │ │ (Stato, Chat) │ │
│ └──────────────┘ └──────────────┘ └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘

---

## 🔐 Sicurezza e Privacy

- **Crittografia End‑to‑End** – Tutti i messaggi vengono crittografati prima di lasciare il tuo dispositivo.
- **Nessuna Vendita di Dati** – I tuoi dati sono tuoi. Non li vendiamo a nessuno.
- **Pagamenti Monero** – Privacy by design. Nessuno può tracciare la tua attività finanziaria.
- **Opzione Self‑Hosted** – Puoi ospitare la tua istanza del backend, dandoti il pieno controllo.

---

## 🚀 Guida Rapida

### Prerequisiti

- Node.js 18+
- Expo CLI
- Android Studio (per build APK)
- Dispositivo Android o emulatore

### Installazione

```bash
git clone https://github.com/DanielIoni-creator/MyZubster-App.git
cd MyZubster-App
npm install
cp .env.example .env
Configura .env
env

API_URL=http://192.168.1.10:3000/api
NODE_ENV=development

Avvia il server di sviluppo
bash

npx expo start --tunnel

Scansiona il QR code con Expo Go.
🔗 Progetti Correlati

    MyZubster-Gateway – Core gateway di pagamento Monero

    MyZubster-Marketplace – Backend del marketplace

📄 Licenza

MIT License
👨‍💻 L'Autore
Daniel Ioni – Sviluppatore Autodidatta & Monero Advocate

Sono uno sviluppatore italiano di 38 anni, basato a Rimini, con una profonda passione per la privacy, la libertà finanziaria e la tecnologia open source.

Il mio viaggio è iniziato con il mining di Bitcoin e si è evoluto in un coinvolgimento profondo con la comunità Monero. Ho fondato "Monero Italia" su Facebook, un gruppo dedicato a diffondere la consapevolezza sulle criptovalute incentrate sulla privacy in Italia.

Oltre al codice, amo gli animali – ho una piccola compagna di nome Chanel che mi tiene compagnia durante le sessioni di programmazione notturne. 🐱

La mia visione per MyZubster è creare un ecosistema libero, aperto e accessibile dove chiunque possa scambiare servizi e competenze senza intermediari. L'unica regola? Usalo per il bene. Niente attività illegali. Per il resto, tutto è concesso.

    🌐 Basato a Rimini, Italia

    💻 Sviluppatore Full‑Stack Autodidatta (Node.js, React, React Native, Android)

    🔒 Monero Advocate & Appassionato di Privacy
📱 Fondatore di "Monero Italia" (gruppo Facebook)

🐱 Papà di Chanel

📫 GitHub: DanielIoni-creator
Realizzato con ❤️ per la community Monero.
Follow the development of MyZubster and connect with me on social media:

- 📖 **Blog & Articles**: [DEV.to - Daniel Ioni](https://dev.to/danielioni)
- 🐦 **X (Twitter)**: [@myzubster](https://x.com/myzubster)
- 💼 **LinkedIn**: [Daniel Ioni](https://www.linkedin.com/in/daniel-ioni-62b2b9423/)
- 🐙 **GitHub**: [DanielIoni-creator](https://github.com/DanielIoni-creator)
- 🎵 **TikTok**: [@h4x0r_23](https://www.tiktok.com/@h4x0r_23)

**Stay updated on the journey!** 🚀
