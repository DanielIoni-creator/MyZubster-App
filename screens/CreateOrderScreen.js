import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export default function CreateOrderScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [skillId, setSkillId] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async () => {
    if (!skillId || !amount) {
      Alert.alert('❌ Errore', 'Compila tutti i campi obbligatori.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/orders', {
        skillId: parseInt(skillId),
        amount: parseFloat(amount),
        currency,
        customerEmail: 'user@example.com'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Alert.alert('✅ Successo', 'Ordine creato con successo!');
      navigation.navigate('Order', { orderId: response.data.id });
    } catch (error) {
      console.error('Errore creazione ordine:', error);
      Alert.alert('❌ Errore', 'Impossibile creare l\'ordine. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📦 Nuovo Ordine</Text>

      <Text style={styles.label}>ID Competenza *</Text>
      <TextInput
        style={styles.input}
        placeholder="Inserisci l'ID della competenza"
        value={skillId}
        onChangeText={setSkillId}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Importo *</Text>
      <TextInput
        style={styles.input}
        placeholder="Importo (es. 50)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Valuta</Text>
      <TextInput
        style={styles.input}
        placeholder="USD, EUR, ecc."
        value={currency}
        onChangeText={setCurrency}
        autoCapitalize="characters"
      />

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabled]}
        onPress={handleCreateOrder}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? '⏳ Creazione...' : '✅ Crea Ordine'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Annulla</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  submitButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  disabled: { backgroundColor: '#a5d6a7' },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cancelButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  cancelButtonText: { color: '#666', fontSize: 16 },
});