import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import StoreProductsScreen from '../screens/StoreProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CartIcon = ({ focused }) => {
  const { getCartCount } = useCart();
  const count = getCartCount();
  
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.iconText, focused && styles.iconTextFocused]}>Cart</Text>
      {count > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{count}</Text></View>}
    </View>
  );
};

const OrdersIcon = ({ focused }) => (
  <Text style={[styles.iconText, focused && styles.iconTextFocused]}>Orders</Text>
);

const HomeIcon = ({ focused }) => (
  <Text style={[styles.iconText, focused && styles.iconTextFocused]}>Stores</Text>
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
          name="Home" 
          component={HomeStack}
          options={{ 
            tabBarLabel: 'Stores',
            tabBarIcon: HomeIcon,
          }}
        />
        <Tab.Screen 
          name="Cart" 
          component={CartScreen}
          options={{ 
            tabBarLabel: 'Cart',
            tabBarIcon: CartIcon,
          }}
        />
        <Tab.Screen 
          name="Orders" 
          component={OrdersStack}
          options={{ 
            tabBarLabel: 'Orders',
            tabBarIcon: OrdersIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#333',
      headerTitleStyle: { fontWeight: '600' },
    }}
  >
    <Stack.Screen name="Stores" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="StoreProducts" component={StoreProductsScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
  </Stack.Navigator>
);

const OrdersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#333',
      headerTitleStyle: { fontWeight: '600' },
    }}
  >
    <Stack.Screen name="OrdersList" component={OrdersScreen} options={{ title: 'My Orders' }} />
    <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: 'Order Details' }} />
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
  iconContainer: {
    position: 'relative',
  },
  iconText: {
    fontSize: 12,
    color: '#666',
  },
  iconTextFocused: {
    color: '#2196F3',
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default AppNavigator;
