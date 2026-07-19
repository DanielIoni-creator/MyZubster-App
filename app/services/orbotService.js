// app/services/orbotService.js
import { Linking, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ORBOT_PACKAGE = 'org.torproject.android';

// Verifica se Orbot è installato
export const isOrbotInstalled = async () => {
  try {
    const result = await Linking.canOpenURL('orbot://');
    return result;
  } catch {
    return false;
  }
};

// Avvia Orbot e connetti
export const connectOrbot = async () => {
  const installed = await isOrbotInstalled();
  
  if (!installed) {
    Alert.alert(
      '🧅 Orbot non installato',
      'Scarica Orbot dal Play Store per connetterti al marketplace onion in modo anonimo.',
      [
        { text: 'Annulla', style: 'cancel' },
        { 
          text: '📲 Scarica Orbot', 
          onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=org.torproject.android') 
        }
      ]
    );
    return false;
  }

  try {
    // Avvia Orbot
    await Linking.openURL('orbot://connect');
    
    // Salva che Orbot è stato avviato
    await AsyncStorage.setItem('@MyZubster:orbot_connected', 'true');
    
    return true;
  } catch (error) {
    console.error('❌ Errore avvio Orbot:', error);
    Alert.alert('❌ Errore', 'Impossibile avviare Orbot. Verifica che sia installato.');
    return false;
  }
};

// Verifica se Orbot è connesso
export const isOrbotConnected = async () => {
  try {
    const connected = await AsyncStorage.getItem('@MyZubster:orbot_connected');
    return connected === 'true';
  } catch {
    return false;
  }
};

// Disconnetti Orbot
export const disconnectOrbot = async () => {
  try {
    await Linking.openURL('orbot://disconnect');
    await AsyncStorage.removeItem('@MyZubster:orbot_connected');
    return true;
  } catch {
    return false;
  }
};