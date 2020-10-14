import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import {
  listenToMessages,
  createMessage,
  currentUser,
  markThreadLastRead,
} from '../firebase';

export default ({ route }) => {
  const thread = route?.params?.thread;
  const user = currentUser();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToMessages(thread._id).onSnapshot(
      (querySnapshot) => {
        const formattedMessages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });

        setMessages(formattedMessages);
      },
    );

    return () => {
      markThreadLastRead(thread._id);
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => {
          const text = newMessages[0].text;
          createMessage(thread._id, text);
        }}
        user={{
          _id: user.uid,
        }}
      />
    </View>
  );
};
