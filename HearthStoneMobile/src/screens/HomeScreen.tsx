import React from 'react';
import { View } from 'react-native';
import CardSearcher from '../components/CardSearcher.tsx';

const HomeScreen: React.FC = () => {
  return (
    <View>
      <CardSearcher />
      {/* Puedes agregar más componentes aquí */}
    </View>
  );
};

export default HomeScreen;
