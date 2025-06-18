import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getDatabase } from '../database/db';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Item = {
  id: number;
  titulo: string;
  descricao: string;
};

export default function HomeScreen({ navigation }: Props) {
  const [itens, setItens] = useState<Item[]>([]);

  const carregarItens = async () => {
    const db = await getDatabase();
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM itens', [], (_, { rows }) => {
        setItens(rows.raw());
      });
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarItens);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button
        title="Cadastrar novo item"
        onPress={() => navigation.navigate('NovoItem')}
      />
      <FlatList
        data={itens}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
