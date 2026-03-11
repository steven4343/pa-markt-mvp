import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getProviderBookings } from '../services/api';
import Loading from '../components/Loading';
import { getStatusColor, getServiceTypeLabel } from '../utils/helpers';

const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }
  };

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome back!</Text>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.business}>{user?.businessName}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#FFA500' }]}>
          <Text style={styles.statNumber}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#2196F3' }]}>
          <Text style={styles.statNumber}>{confirmedCount}</Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Your Service</Text>
        <Text style={styles.infoText}>{getServiceTypeLabel(user?.serviceType)}</Text>
        <Text style={styles.infoLabel}>Location: {user?.location}</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Bookings</Text>
      {bookings.length === 0 ? (
        <Text style={styles.emptyText}>No bookings yet</Text>
      ) : (
        bookings.slice(0, 5).map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <Text style={styles.bookingService}>Service #{booking.serviceId}</Text>
              <Text style={[styles.bookingStatus, { color: getStatusColor(booking.status) }]}>
                {booking.status.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.bookingDate}>{booking.date} at {booking.time}</Text>
            <Text style={styles.bookingAddress}>{booking.address}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2196F3',
  },
  welcome: {
    color: '#fff',
    fontSize: 14,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  business: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  logoutBtn: {
    padding: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  infoCard: {
    margin: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  infoLabel: {
    color: '#666',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 15,
    paddingBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
  },
  bookingCard: {
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bookingStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDate: {
    color: '#666',
    marginBottom: 4,
  },
  bookingAddress: {
    color: '#999',
    fontSize: 14,
  },
});

export default DashboardScreen;
