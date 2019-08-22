import React from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {} from 'react-native-gesture-handler';

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
  button: {
    backgroundColor: '#2196F3',
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A6D5FA',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export const TextField = ({style = {}, ...props}) => (
  <TextInput style={[styles.input, style]} {...props} />
);

export const Button = ({title, onPress, disabled}) => {
  const buttonStyles = [styles.button];
  if (disabled) {
    buttonStyles.push(styles.buttonDisabled);
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
