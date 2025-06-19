import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

type Props = {
  children: ReactNode;
};

export default function Wallpaper({ children }: Props) {
  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
