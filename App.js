import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import OffersScreen from './screens/OffersScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Carte') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Offres') {
              iconName = focused ? 'gift' : 'gift-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: 'white',
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Carte" component={MapScreen} />
        <Tab.Screen name="Offres" component={OffersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}