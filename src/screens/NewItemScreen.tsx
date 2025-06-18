import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getDatabase } from '../database/db';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'NovoItem'>;

export default function NewItemScreen({ navigation }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const salvarItem = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const db = await getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO itens (titulo, descricao) VALUES (?, ?)',
        [titulo, descricao],
        () => {
          Alert.alert('Item salvo com sucesso!');
          navigation.goBack();
        },
        (_, error) => {
          console.error('Erro ao salvar:', error);
          return true;
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        style={styles.input}
        onChangeText={setTitulo}
        value={titulo}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        onChangeText={setDescricao}
        value={descricao}
        multiline
      />
      <Button title="Salvar" onPress={salvarItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
