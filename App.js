import React from 'react';
import { AuthProvider } from './src/hooks/useAuth';
import StackNavigator from './src/components/StackNavigator';

export default function App() {
  return (
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  );
}
