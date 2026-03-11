import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { bookingsService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ServiceDetailScreen = ({ route, navigation }) => {
  const { service, provider } = route.params;
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState(user?.address || '');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!date || !time || !address) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Please login to book a service');
      navigation.navigate('Login');
      return;
    }

    setLoading(true);
    try {
      await bookingsService.create({
        serviceId: service.id,
        providerId: provider.id,
        consumerId: user.id,
        date,
        time,
        address,
        notes,
        price: service.basePrice,
      });
      Alert.alert('Success', 'Booking created! The provider will confirm shortly.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.category}>{service.category}</Text>
        <Text style={styles.price}>${service.basePrice}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About this Service</Text>
        <Text style={styles.description}>{service.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Provider</Text>
        <View style={styles.providerCard}>
          <View style={styles.providerAvatar}>
            <Text style={styles.avatarText}>{provider?.name?.charAt(0)}</Text>
          </View>
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{provider?.businessName}</Text>
            <Text style={styles.providerType}>{provider?.serviceType}</Text>
            <Text style={styles.providerLocation}>{provider?.location}</Text>
            <Text style={styles.rating}>★ {provider?.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Book Service</Text>
        
        <Text style={styles.label}>Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Time *</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={time}
          onChangeText={setTime}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your address"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your issue..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>${service.basePrice}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.bookButton, loading && styles.bookButtonDisabled]}
        onPress={handleBooking}
        disabled={loading}
      >
        <Text style={styles.bookButtonText}>
          {loading ? 'Booking...' : 'Book Now'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  category: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  providerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  providerInfo: {
    marginLeft: 15,
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  providerType: {
    fontSize: 14,
    color: '#2196F3',
    marginTop: 2,
  },
  providerLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rating: {
    fontSize: 14,
    color: '#FFA500',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },
  totalLabel: {
    fontSize: 18,
    color: '#333',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    opacity: 0.6,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ServiceDetailScreen;
