import React, { JSX, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { setupDatabase } from './src/database/db';

export default function App(): JSX.Element | null {
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setupDatabase().then(() => setPronto(true));
  }, []);

  if (!pronto) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.text}>Carregando ConectaDoa...</Text>
      </View>
    );
  }

  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
