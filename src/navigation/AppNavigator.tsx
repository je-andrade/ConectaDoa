import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewItemScreen from '../screens/NewItemScreen';

export type RootStackParamList = {
  Home: undefined;
  NovoItem: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NovoItem" component={NewItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
