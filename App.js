// App.js - MyZubster App (React Native/Expo)
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:4000';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [skills, setSkills] = useState([]);
  const [logs, setLogs] = useState([]);

  const log = (msg) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  useEffect(() => {
    AsyncStorage.getItem('token').then(t => { if (t) setToken(t); });
  }, []);

  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        await AsyncStorage.setItem('token', data.token);
        log(`✅ Login: ${data.user.username}`);
        Alert.alert('Successo', `Benvenuto ${data.user.username}!`);
      } else {
        log(`❌ Errore: ${data.error}`);
        Alert.alert('Errore', data.error || 'Login fallito');
      }
    } catch (err) {
      log(`❌ Errore: ${err.message}`);
      Alert.alert('Errore', err.message);
    }
  };

  const getSkills = async () => {
    try {
      const res = await fetch(`${API_URL}/api/skills`);
      const data = await res.json();
      setSkills(data);
      log(`📚 Caricate ${data.length} competenze`);
    } catch (err) {
      log(`❌ Errore: ${err.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚀 MyZubster</Text>
      <Text style={styles.subtitle}>App mobile per pagamenti Monero</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="email@example.com" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="password" />
        <Button title="🔐 Login" onPress={login} />
        <View style={styles.buttonSpacer} />
        <Button title="📚 Carica Competenze" onPress={getSkills} />
      </View>

      <View style={styles.card}>
        <Text style={styles.logsTitle}>📋 Log</Text>
        {logs.map((logItem, i) => (
          <Text key={i} style={styles.logText}>{logItem}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: 'white', borderRadius: 10, padding: 15, marginVertical: 10, elevation: 2 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginVertical: 5 },
  buttonSpacer: { height: 10 },
  logsTitle: { fontWeight: 'bold', marginBottom: 5 },
  logText: { fontSize: 12, color: '#555', fontFamily: 'monospace' }
});