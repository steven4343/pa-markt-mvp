import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import OrdersScreen from '../screens/OrdersScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardIcon = ({ focused }) => (
  <Text style={[styles.iconText, focused && styles.iconTextFocused]}>Dashboard</Text>
);

const ProductsIcon = ({ focused }) => (
  <Text style={[styles.iconText, focused && styles.iconTextFocused]}>Products</Text>
);

const OrdersIcon = ({ focused }) => (
  <Text style={[styles.iconText, focused && styles.iconTextFocused]}>Orders</Text>
);

const AppNavigator = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#666',
        }}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ 
            tabBarLabel: 'Dashboard',
            tabBarIcon: DashboardIcon,
          }}
        />
        <Tab.Screen 
          name="Products" 
          component={ProductsStack}
          options={{ 
            tabBarLabel: 'Products',
            tabBarIcon: ProductsIcon,
          }}
        />
        <Tab.Screen 
          name="Orders" 
          component={OrdersScreen}
          options={{ 
            tabBarLabel: 'Orders',
            tabBarIcon: OrdersIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const ProductsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#333',
      headerTitleStyle: { fontWeight: '600' },
    }}
  >
    <Stack.Screen name="ProductsList" component={ProductsScreen} options={{ title: 'My Products' }} />
    <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product' }} />
    <Stack.Screen name="EditProduct" component={AddProductScreen} options={{ title: 'Edit Product' }} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    height: 60,
  },
  iconText: {
    fontSize: 12,
    color: '#666',
  },
  iconTextFocused: {
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default AppNavigator;
