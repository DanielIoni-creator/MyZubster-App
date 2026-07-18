import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import * as Clipboard from 'expo-clipboard';

export default function OrderScreen({ route }) {
  const { token } = useContext(AuthContext);
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${orderId}/payment-status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder(response.data);
    } catch (error) {
      console.error('Errore recupero ordine:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('✅ Copiato!', 'Indirizzo Monero copiato negli appunti.');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>⏳ Caricamento...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <Text>❌ Ordine non trovato.</Text>
      </View>
    );
  }

  const isCompleted = order.status === 'completed';
  const isPending = order.status === 'pending';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.id}>📋 Ordine #{order.id}</Text>
        <View style={[styles.statusBadge, isCompleted ? styles.completed : styles.pending]}>
          <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>💰 Importo</Text>
        <Text style={styles.value}>{order.amount} {order.currency}</Text>

        {order.moneroAmount && (
          <>
            <Text style={styles.label}>💎 Importo in XMR</Text>
            <Text style={styles.value}>{order.moneroAmount.toFixed(8)} XMR</Text>
          </>
        )}

        {order.moneroAddress && (
          <>
            <Text style={styles.label}>📬 Indirizzo Monero</Text>
            <TouchableOpacity onPress={() => copyToClipboard(order.moneroAddress)}>
              <Text style={styles.address} numberOfLines={3}>
                {order.moneroAddress}
              </Text>
              <Text style={styles.copyText}>📋 Tocca per copiare</Text>
            </TouchableOpacity>
          </>
        )}

        {order.confirmations > 0 && (
          <>
            <Text style={styles.label}>✔️ Conferme</Text>
            <Text style={styles.value}>{order.confirmations}</Text>
          </>
        )}

        {order.amountReceived > 0 && (
          <>
            <Text style={styles.label}>📥 Ricevuto</Text>
            <Text style={styles.value}>{order.amountReceived.toFixed(8)} XMR</Text>
          </>
        )}
      </View>

      {isPending && (
        <View style={styles.card}>
          <Text style={styles.warning}>⏳ In attesa del pagamento</Text>
          <Text style={styles.hint}>
            Invia esattamente {order.moneroAmount?.toFixed(8)} XMR all'indirizzo sopra.
          </Text>
          <TouchableOpacity style={styles.refreshButton} onPress={fetchOrder}>
            <Text style={styles.refreshText}>🔄 Aggiorna stato</Text>
          </TouchableOpacity>
        </View>
      )}

      {isCompleted && (
        <View style={[styles.card, styles.successCard]}>
          <Text style={styles.successText}>✅ Pagamento confermato!</Text>
        </View>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Torna alla Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  id: { fontSize: 18, fontWeight: 'bold' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, alignSelf: 'flex-start', marginTop: 8 },
  pending: { backgroundColor: '#ff9800' },
  completed: { backgroundColor: '#4CAF50' },
  statusText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 12, color: '#666' },
  value: { fontSize: 16, marginTop: 4 },
  address: { fontSize: 14, color: '#2196F3', marginTop: 4 },
  copyText: { fontSize: 12, color: '#999', marginTop: 4 },
  warning: { fontSize: 16, fontWeight: 'bold', color: '#ff9800' },
  hint: { fontSize: 14, color: '#666', marginTop: 8 },
  refreshButton: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  refreshText: { color: '#fff', fontWeight: 'bold' },
  successCard: { backgroundColor: '#e8f5e9' },
  successText: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center' },
  backButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  backButtonText: { color: '#666', fontSize: 16 },
});