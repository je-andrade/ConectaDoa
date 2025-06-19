import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import NewItemScreen from '../screens/NewItemScreen';
import AboutScreen from '../screens/AboutScreen';

export type RootStackParamList = {
  Home: undefined;
  NovoItem: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>ConectaDoa</Text>
    <Text style={styles.subtitle}>Cadastre e visualize itens para doação</Text>
  </View>
);

export default function AppNavigator() {
  useEffect(() => {
    const verificarBoasVindas = async () => {
      const jaViu = await AsyncStorage.getItem('boasVindasVisto');
      if (!jaViu) {
        Alert.alert(
          'Bem-vindo ao ConectaDoa!',
          'Este aplicativo permite cadastrar e visualizar itens para doação, pois o que não vale nada para um, pode ser um tesouro para o próximo. Use o botão "Cadastrar novo item" para adicionar itens à lista.',
        );
        await AsyncStorage.setItem('boasVindasVisto', 'true');
      }
    };
    verificarBoasVindas();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: () => <HomeHeader /> }}
        />
        <Stack.Screen
          name="NovoItem"
          component={NewItemScreen}
          options={{ title: 'Novo Item' }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'Sobre o App' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
  },
});
