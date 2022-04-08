import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

import {
  listenToMessages,
  createMessage,
  currentUser,
  markThreadLastRead,
} from '../firebase';

export default ({route}) => {
  const [messages, setMessages] = useState([]);
  const user = currentUser();
  const thread = route?.params?.thread || {};

  useEffect(() => {
    const unsubscribe = listenToMessages(thread._id).onSnapshot(
      querySnapshot => {
        const formattedMessages = querySnapshot.docs.map(doc => {
          return {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            user: {},
            ...doc.data(),
          };
        });

        setMessages(formattedMessages);
      },
    );

    return () => {
      unsubscribe();
      markThreadLastRead(thread._id);
    };
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => {
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
