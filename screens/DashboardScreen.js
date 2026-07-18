import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export default function DashboardScreen({ navigation }) {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Errore recupero ordini:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('Order', { orderId: item.id })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Ordine #{item.id}</Text>
        <View style={[styles.statusBadge, item.status === 'completed' ? styles.completed : styles.pending]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.orderAmount}>💰 {item.amount} {item.currency}</Text>
      {item.moneroAddress && (
        <Text style={styles.moneroAddress} numberOfLines={1}>
          📬 {item.moneroAddress}
        </Text>
      )}
      <Text style={styles.orderDate}>📅 {new Date(item.createdAt).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>⏳ Caricamento...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>👋 Ciao, {user?.name || 'Utente'}!</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateOrder')}
        >
          <Text style={styles.createButtonText}>+ Nuovo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>📋 I tuoi ordini</Text>
      
      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nessun ordine ancora.</Text>
          <Text style={styles.emptySubtext}>Crea il tuo primo ordine! 🚀</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  welcome: { fontSize: 20, fontWeight: 'bold' },
  createButton: { backgroundColor: '#4CAF50', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  createButtonText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  list: { paddingBottom: 20 },
  orderCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 16, fontWeight: 'bold' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pending: { backgroundColor: '#ff9800' },
  completed: { backgroundColor: '#4CAF50' },
  statusText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  orderAmount: { fontSize: 14, color: '#333', marginTop: 6 },
  moneroAddress: { fontSize: 12, color: '#888', marginTop: 4 },
  orderDate: { fontSize: 11, color: '#aaa', marginTop: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 16, color: '#666' },
  emptySubtext: { fontSize: 14, color: '#999', marginTop: 8 },
});