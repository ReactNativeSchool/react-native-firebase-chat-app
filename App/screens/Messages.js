import React, { useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default ({ route }) => {
  const thread = route?.params?.thread;
  const user = auth().currentUser.toJSON();

  const [messages] = useState([]);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => {
          const text = newMessages[0].text;
          firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .set(
              {
                latestMessage: {
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true },
            )
            .then(() => {
              return firestore()
                .collection('MESSAGE_THREADS')
                .doc(thread._id)
                .collection('MESSAGES')
                .add({
                  text,
                  createdAt: new Date().getTime(),
                  user: {
                    _id: user.uid,
                    displayName: user.displayName,
                  },
                });
            });
        }}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};
