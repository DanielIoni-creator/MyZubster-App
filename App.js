import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './app/context/AuthContext';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import DashboardScreen from './app/screens/DashboardScreen';
import CreateOrderScreen from './app/screens/CreateOrderScreen';
import OrderScreen from './app/screens/OrderScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useContext(AuthContext);
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
          <Stack.Screen name="Order" component={OrderScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}