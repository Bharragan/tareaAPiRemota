import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, ScrollView } from 'react-native'; // Importa ScrollView
import axios from 'axios';
import { ImageBackground } from 'react-native';
const CardSearcher: React.FC = () => {
  const [cardName, setCardName] = useState('');
  const [cardInfo, setCardInfo] = useState<any | null>(null);
  const defaultCardImage = 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/49eb630950e50aa851fc9d544089d83dea7640324d7728251638b0b5f1642b8e.png';

  

  const searchCard = async () => {
    try {
      const response = await axios.get(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${cardName}`, {
        headers: {
          'X-RapidAPI-Key': '132c70d7d8msh7da217a35c2c3cap1aa31bjsn2bad06c283e5',
          'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
        },
      });

      // Mostrar información de la primera carta encontrada
      setCardInfo(response.data[0] || null);
    } catch (error) {
      console.error(error);
      setCardInfo(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Nombre de la carta"
        value={cardName}
        onChangeText={(text) => setCardName(text)}
        style={styles.input}
      />
      <Button title="Buscar" onPress={searchCard} />
      {cardInfo && (
        <View style={styles.cardContainer}>
          <Image source={{ uri: cardInfo.imgGold ? cardInfo.imgGold : defaultCardImage }} style={styles.cardImage} />
          <View style={styles.cardInfoContainer}>
            <Text style={styles.cardTitle}>{cardInfo.name}</Text>
            <Text style={styles.cardText}>{cardInfo.text}</Text>
            <Text style={styles.cardFlavor}>{cardInfo.flavor}</Text>
            <View style={styles.extraInfoContainer}>
              <Text style={styles.extraInfoLabel}>Spell School:</Text>
              <Text style={styles.extraInfo}>{cardInfo.spellSchool}</Text>
            </View>
            <View style={styles.extraInfoContainer}>
              <Text style={styles.extraInfoLabel}>Player Class:</Text>
              <Text style={styles.extraInfo}>{cardInfo.playerClass}</Text>
            </View>
            {/* Puedes agregar más campos según sea necesario */}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  cardContainer: {
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: undefined, // Para que la altura sea dinámica
    aspectRatio: 4 / 5, // Proporción de aspecto (ajústala según tus necesidades)
  },
  cardInfoContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    marginBottom: 5,
  },
  cardFlavor: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  extraInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraInfoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  extraInfo: {
    flex: 1,
  },
});

export default CardSearcher;
