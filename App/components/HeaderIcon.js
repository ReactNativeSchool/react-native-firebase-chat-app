import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    paddingRight: 10,
  },
  icon: {
    tintColor: '#aaa',
    width: 25,
  },
});

const iconMap = iconName => {
  switch (iconName) {
    case 'close':
      return require('../assets/icons/close.png');
    case 'add':
    default:
      return require('../assets/icons/add.png');
  }
};

export const HeaderIcon = ({iconName, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Image
      source={iconMap(iconName)}
      style={styles.icon}
      resizeMode="contain"
    />
  </TouchableOpacity>
);
