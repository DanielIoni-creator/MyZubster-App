import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

// Schermate placeholder
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 MyZubster</Text>
      <Text style={styles.subtitle}>Benvenuto nel tuo orto digitale!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function WalletScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👛 Wallet</Text>
      <Text style={styles.subtitle}>I tuoi fondi in MYZ e XMR</Text>
    </View>
  );
}

function GardenScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌱 Orto</Text>
      <Text style={styles.subtitle}>Le tue piante e animali</Text>
    </View>
  );
}

function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📡 Scanner</Text>
      <Text style={styles.subtitle}>Scansiona NFC o QR code</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profilo</Text>
      <Text style={styles.subtitle}>Le tue impostazioni</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Garden" component={GardenScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
