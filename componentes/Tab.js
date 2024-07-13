import React from 'react';
import { View, StyleSheet } from 'react-native';
import GuitarString from './String';

const GuitarTab = ({ tab }) => {
  return (
    <View style={styles.tab}>
      {tab.map((stringNotes, index) => (
        <GuitarString key={index} notes={stringNotes} style={{ top: index * 20 }} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    position: 'relative',
    height: 120,
    width: '100%',
  },
});

export default GuitarTab;