import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AboutScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sobre este App</Text>
      <Text style={styles.content}>
        Este app é projeto para a Matéria "Programação Para Dispositivos Móveis
        em Android" como trabalho de extensão
      </Text>

      <Text style={styles.label}>Instituição</Text>
      <Text style={styles.content}>Estácio</Text>

      <Text style={styles.label}>Aluno</Text>
      <Text style={styles.content}>Jean Roberto</Text>

      <Text style={styles.label}>Data Final de Desenvolvimento do App</Text>
      <Text style={styles.content}>19 de Junho de 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(19, 19, 19, 0.8)',
  },
  label: {
    fontWeight: 'bold',
    color: 'rgb(244, 237, 237)',
    marginTop: 10,
  },
  content: {
    fontStyle: 'italic',
    color: 'rgb(255, 252, 252).8)',
  },
});
