import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getProviderBookings, updateBooking } from '../services/api';
import Loading from '../components/Loading';
import { getStatusColor, formatDate } from '../utils/helpers';

const BookingsScreen = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await getProviderBookings(user.id);
      setBookings(response.data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBookings();
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBooking(bookingId, { status: newStatus });
      loadBookings();
      Alert.alert('Success', `Booking ${newStatus}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update booking');
    }
  };

  const renderBooking = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingId}>Booking #{item.id}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      
      <View style={styles.bookingDetails}>
        <Text style={styles.detailText}>Date: {item.date}</Text>
        <Text style={styles.detailText}>Time: {item.time}</Text>
        <Text style={styles.detailText}>Address: {item.address}</Text>
        <Text style={styles.detailText}>Price: ${item.price}</Text>
        {item.notes && <Text style={styles.notes}>Notes: {item.notes}</Text>}
      </View>

      <View style={styles.actions}>
        {item.status === 'pending' && (
          <>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.confirmBtn]}
              onPress={() => handleStatusUpdate(item.id, 'confirmed')}
            >
              <Text style={styles.actionBtnText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.cancelBtn]}
              onPress={() => handleStatusUpdate(item.id, 'cancelled')}
            >
              <Text style={styles.actionBtnText}>Decline</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === 'confirmed' && (
          <TouchableOpacity 
            style={[styles.actionBtn, styles.completeBtn]}
            onPress={() => handleStatusUpdate(item.id, 'completed')}
          >
            <Text style={styles.actionBtnText}>Mark Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookings found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 15,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bookingId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  confirmBtn: {
    backgroundColor: '#4CAF50',
  },
  cancelBtn: {
    backgroundColor: '#F44336',
  },
  completeBtn: {
    backgroundColor: '#2196F3',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 40,
  },
});

export default BookingsScreen;
