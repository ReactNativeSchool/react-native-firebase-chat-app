import React, { useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default () => {
  const [messages, setMessages] = useState([]);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => {
          setMessages(GiftedChat.append(messages, newMessages));
        }}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};
