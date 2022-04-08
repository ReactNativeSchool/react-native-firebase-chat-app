import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default ({route}) => {
  const [messages, setMessages] = useState([]);
  const user = auth().currentUser.toJSON();
  const thread = route?.params?.thread || {};

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
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
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => {
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
              {merge: true},
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
                    name: user.displayName,
                  },
                });
            });
        }}
        user={{
          _id: user.uid,
        }}
      />
    </View>
  );
};
