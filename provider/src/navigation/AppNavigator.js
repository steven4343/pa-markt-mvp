import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardIcon = ({ focused }) => (
  <Text style={[styles.iconText, focused && styles.iconTextFocused]}>Dashboard</Text>
);

const BookingsIcon = ({ focused }) => (
  <Text style={[styles.iconText, focused && styles.iconTextFocused]}>Bookings</Text>
);

const ProfileIcon = ({ focused }) => (
  <Text style={[styles.iconText, focused && styles.iconTextFocused]}>Profile</Text>
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
          name="Bookings" 
          component={BookingsScreen}
          options={{ 
            tabBarLabel: 'Bookings',
            tabBarIcon: BookingsIcon,
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ 
            tabBarLabel: 'Profile',
            tabBarIcon: ProfileIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

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
