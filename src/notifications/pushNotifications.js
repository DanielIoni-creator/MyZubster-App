// ============================================
// NOTIFICHE PUSH PER TRANSIZIONI MYZ
// ============================================

// Configurazione Firebase Cloud Messaging
const FCM_CONFIG = {
  apiKey: process.env.FCM_API_KEY,
  authDomain: process.env.FCM_AUTH_DOMAIN,
  projectId: process.env.FCM_PROJECT_ID,
  storageBucket: process.env.FCM_STORAGE_BUCKET,
  messagingSenderId: process.env.FCM_SENDER_ID,
  appId: process.env.FCM_APP_ID
};

let messaging = null;

export const setupPushNotifications = async () => {
  try {
    // Inizializza Firebase
    const { initializeApp } = await import('firebase/app');
    const { getMessaging, getToken, onMessage } = await import('firebase/messaging');
    
    const app = initializeApp(FCM_CONFIG);
    messaging = getMessaging(app);

    // Richiedi permessi
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.FCM_VAPID_KEY
      });
      console.log('✅ FCM Token:', token);
      return token;
    }
  } catch (error) {
    console.error('Errore configurazione notifiche:', error);
  }
};

export const sendTransactionNotification = (transaction) => {
  // Invia notifica per una transazione
  const notification = {
    title: '💰 Nuova transazione MYZ',
    body: `${transaction.amount} MYZ - ${transaction.type}`,
    icon: '/icon.png',
    data: {
      transactionId: transaction.id,
      url: `/transactions/${transaction.id}`
    }
  };
  
  // Se il browser supporta le notifiche
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(notification.title, {
      body: notification.body,
      icon: notification.icon,
      data: notification.data
    });
  }
  
  console.log('📱 Notifica transazione:', notification);
};

export const onMessageListener = () => {
  if (messaging) {
    onMessage(messaging, (payload) => {
      console.log('📨 Messaggio ricevuto:', payload);
      const notification = {
        title: payload.notification?.title || 'Aggiornamento MyZubster',
        body: payload.notification?.body || 'Nuova notifica',
        data: payload.data || {}
      };
      sendTransactionNotification(notification);
    });
  }
};

export default { setupPushNotifications, sendTransactionNotification, onMessageListener };
