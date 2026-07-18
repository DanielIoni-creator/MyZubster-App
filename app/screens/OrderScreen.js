import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import * as Clipboard from 'expo-clipboard';

export default function OrderScreen({ route, navigation }) {
  const { token } = useContext(AuthContext);
  const { t } = useLanguage();
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrder();
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('✅ ' + t('order.copied'), t('order.copiedMessage'));
  };

  const getStatusText = (status) => {
    const statusMap = {
      'pending': t('dashboard.status.pending'),
      'completed': t('dashboard.status.completed'),
      'cancelled': t('dashboard.status.cancelled'),
    };
    return statusMap[status] || status.toUpperCase();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <Text>❌ {t('order.notFound')}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{t('order.back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isCompleted = order.status === 'completed';
  const isPending = order.status === 'pending';

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.card}>
        <Text style={styles.id}>{t('order.title', { id: order.id })}</Text>
        <View style={[styles.statusBadge, isCompleted ? styles.completed : styles.pending]}>
          <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>{t('order.amount')}</Text>
        <Text style={styles.value}>{order.amount} {order.currency}</Text>

        {order.moneroAmount && (
          <>
            <Text style={styles.label}>{t('order.amountXMR')}</Text>
            <Text style={styles.value}>{order.moneroAmount.toFixed(8)} XMR</Text>
          </>
        )}

        {order.moneroAddress && (
          <>
            <Text style={styles.label}>{t('order.moneroAddress')}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(order.moneroAddress)}>
              <Text style={styles.address} numberOfLines={3}>
                {order.moneroAddress}
              </Text>
              <Text style={styles.copyText}>{t('order.copyAddress')}</Text>
            </TouchableOpacity>
          </>
        )}

        {order.confirmations > 0 && (
          <>
            <Text style={styles.label}>{t('order.confirmations')}</Text>
            <Text style={styles.value}>{order.confirmations}</Text>
          </>
        )}

        {order.amountReceived > 0 && (
          <>
            <Text style={styles.label}>{t('order.received')}</Text>
            <Text style={styles.value}>{order.amountReceived.toFixed(8)} XMR</Text>
          </>
        )}
      </View>

      {isPending && (
        <View style={styles.card}>
          <Text style={styles.warning}>{t('order.waitingPayment')}</Text>
          <Text style={styles.hint}>
            {t('order.paymentHint', { amount: order.moneroAmount?.toFixed(8) })}
          </Text>
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <Text style={styles.refreshText}>{t('order.refresh')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {isCompleted && (
        <View style={[styles.card, styles.successCard]}>
          <Text style={styles.successText}>{t('order.paymentConfirmed')}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{t('order.back')}</Text>
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