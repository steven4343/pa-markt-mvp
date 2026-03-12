import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView } from 'react-native';
import { servicesService, providersService } from '../services/api';

const SERVICE_CATEGORIES = [
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'cleaning', label: 'Cleaning' },
  { id: 'hvac', label: 'HVAC' },
  { id: 'carpentry', label: 'Carpentry' },
  { id: 'mechanic', label: 'Mechanic' },
];

const ServicesScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [servicesRes, providersRes] = await Promise.all([
        servicesService.getAll({}),
        providersService.getAll({})
      ]);
      setServices(servicesRes.data);
      setProviders(providersRes.data);
    } catch (err) {
      console.error('Error loading services:', err);
      setError('Failed to load services. Make sure API is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(s => {
    if (selectedCategory && s.category !== selectedCategory) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const renderService = ({ item }) => {
    const provider = providers.find(p => p.id === item.providerId);
    return (
      <TouchableOpacity 
        style={styles.serviceCard}
        onPress={() => navigation.navigate('ServiceDetail', { service: item, provider })}
      >
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.serviceCategory}>{item.category}</Text>
          <Text style={styles.serviceDescription}>{item.description}</Text>
          <View style={styles.serviceFooter}>
            <Text style={styles.servicePrice}>${item.basePrice}</Text>
            <Text style={styles.providerName}>{provider?.businessName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading services...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        horizontal
        data={SERVICE_CATEGORIES}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === item.id && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(
              selectedCategory === item.id ? null : item.id
            )}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === item.id && styles.categoryTextActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Available Services</Text>
      <FlatList
        data={filteredServices}
        keyExtractor={item => item.id}
        renderItem={renderService}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No services found</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: '#F44336',
    textAlign: 'center',
    padding: 20,
  },
  retryButton: {
    marginTop: 15,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 15,
    paddingTop: 0,
  },
  categoriesList: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryChipActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  categoryText: {
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  list: {
    padding: 15,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  serviceInfo: {},
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  serviceCategory: {
    fontSize: 14,
    color: '#2196F3',
    marginTop: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  providerName: {
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 40,
  },
});

export default ServicesScreen;
