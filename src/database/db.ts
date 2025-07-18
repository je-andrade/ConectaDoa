import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDatabase = async () => {
  return SQLite.openDatabase({ name: 'conectadoa.db', location: 'default' });
};

export const setupDatabase = async () => {
  const db = await getDatabase();
  await db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS itens;'); // força recriação: para debug
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS itens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT NOT NULL,
        doador TEXT NOT NULL,
        contato TEXT NOT NULL,
        fotoUri TEXT
      );
    `);
  });
};
