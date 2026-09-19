import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './i18n'; // Initialize i18n
import { AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>(
    'login',
  );

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="dark-content" />
        {currentScreen === 'login' ? (
          <LoginScreen
            onNavigateToRegister={() => setCurrentScreen('register')}
          />
        ) : (
          <RegisterScreen onNavigateBack={() => setCurrentScreen('login')} />
        )}
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
