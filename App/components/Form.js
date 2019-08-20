import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
  },
});

export const TextField = ({style = {}, ...props}) => (
  <TextInput style={[styles.input, style]} {...props} />
);
