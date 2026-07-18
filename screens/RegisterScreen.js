import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert('❌ Errore', 'Compila tutti i campi.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/users/register', { email, password, name });
      Alert.alert('✅ Successo', 'Registrazione completata. Ora puoi accedere.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('❌ Errore', 'Impossibile registrarsi. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Crea account</Text>

      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
        <Text style={styles.registerButtonText}>{loading ? '⏳ Registrazione...' : '✅ Registrati'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Hai già un account? Accedi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  registerButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center' },
  registerButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  loginText: { textAlign: 'center', marginTop: 16, color: '#2196F3' },
});