import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GuitarString = ({ notes, style }) => {
  return (
    <View style={[styles.string, style]}>
      {notes.map((note, index) => (
        <Text key={index} style={styles.note}>
          {note}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  string: {
    flexDirection: 'row',
    position: 'absolute', // Añadido para permitir posicionamiento absoluto
  },
  note: {
    margin: 5,
    fontSize: 18,
  },
});

export default GuitarString;