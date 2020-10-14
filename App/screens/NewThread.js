import React, { useState } from 'react';
import { View } from 'react-native';

import { TextField, Button } from '../components/Form';

export default () => {
  const [threadName, setThreadName] = useState('');

  const handlePress = () => {
    alert(`New Thread Name: ${threadName}`);
  };

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}
    >
      <TextField
        placeholder="Thread Name"
        onChangeText={(name) => setThreadName(name)}
      />
      <Button onPress={handlePress} title="Create" />
    </View>
  );
};
