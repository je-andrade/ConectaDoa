import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getDatabase } from '../database/db';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Wallpaper from '../components/Wallpaper';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Item = {
  id: number;
  titulo: string;
  descricao: string;
  doador: string;
  contato: string;
  fotoUri: string | null;
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

  const excluirItem = async (id: number) => {
    Alert.alert('Excluir item', 'Deseja excluir este item?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const db = await getDatabase();
          db.transaction(tx => {
            tx.executeSql('DELETE FROM itens WHERE id = ?', [id], () => {
              carregarItens();
            });
          });
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarItens);
    return unsubscribe;
  }, [navigation]);

  return (
    <Wallpaper>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Button
            title="Cadastrar novo item"
            onPress={() => navigation.navigate('NovoItem')}
          />
          <FlatList
            data={itens}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }} // para não cobrir os últimos itens
            renderItem={({ item }) => (
              <View style={styles.item}>
                {item.fotoUri ? (
                  <Image source={{ uri: item.fotoUri }} style={styles.foto} />
                ) : null}
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text>{item.descricao}</Text>
                <Text style={styles.contato}>Doador: {item.doador}</Text>
                <Text style={styles.contato}>Contato: {item.contato}</Text>
                <TouchableOpacity
                  onPress={() => excluirItem(item.id)}
                  style={styles.botaoExcluir}
                >
                  <Icon name="delete" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* FAB no topo do Wallpaper */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('About')}
        >
          <Icon name="info" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </Wallpaper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  contato: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#444',
  },
  foto: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  botaoExcluir: {
    marginTop: 10,
    backgroundColor: '#e53935',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ee',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
