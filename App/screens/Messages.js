import React, { useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default () => {
  const [messages] = useState([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => alert(JSON.stringify(newMessages))}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};
