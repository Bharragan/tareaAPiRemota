import React from 'react';
import { View, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';

function App(): JSX.Element {
  return (
    <View>
      <Text>Hearthstone HUB</Text>
      <HomeScreen />
    </View>
  );
}

export default App;
