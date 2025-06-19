import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { getDatabase } from '../database/db';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Wallpaper from '../components/Wallpaper';

type Props = NativeStackScreenProps<RootStackParamList, 'NovoItem'>;

export default function NewItemScreen({ navigation }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [doador, setDoador] = useState('');
  const [contato, setContato] = useState('');
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  const selecionarFoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setFotoUri(response.assets[0].uri || null);
      }
    });
  };

  const salvarItem = async () => {
    if (!titulo || !descricao || !contato || !doador) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const db = await getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO itens (titulo, descricao, doador, contato, fotoUri) VALUES (?, ?, ?, ?, ?)',
        [titulo, descricao, doador, contato, fotoUri],
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
    <Wallpaper>
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
        <TextInput
          placeholder="Nome para contato"
          style={styles.input}
          onChangeText={setDoador}
          value={doador}
        />
        <TextInput
          placeholder="Telefone para contato"
          style={styles.input}
          onChangeText={setContato}
          value={contato}
        />
        <TouchableOpacity onPress={selecionarFoto} style={styles.fotoButton}>
          <Text style={styles.fotoButtonText}>Selecionar Foto</Text>
        </TouchableOpacity>
        {fotoUri && (
          <Image source={{ uri: fotoUri }} style={styles.fotoPreview} />
        )}
        <Button title="Salvar" onPress={salvarItem} />
      </View>
    </Wallpaper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#ffffffb3',
  },
  fotoButton: {
    backgroundColor: '#34eb8f',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  fotoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fotoPreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 5,
  },
});
