import React, { JSX, useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { setupDatabase } from './src/database/db';

export default function App(): JSX.Element | null {
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setupDatabase().then(() => setPronto(true));
  }, []);

  if (!pronto) return null;

  return <AppNavigator />;
}
