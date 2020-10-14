import React, { useState } from 'react';
import { View } from 'react-native';

import { TextField, Button } from '../components/Form';
import { createNewThread } from '../firebase';

export default ({ navigation }) => {
  const [threadName, setThreadName] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    createNewThread(threadName)
      .then(() => {
        navigation.pop();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}
    >
      <TextField
        placeholder="Thread Name"
        onChangeText={(name) => setThreadName(name)}
      />
      <Button onPress={handlePress} title="Create" disabled={loading} />
    </View>
  );
};
