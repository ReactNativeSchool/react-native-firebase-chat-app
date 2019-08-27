import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';

export default class Messages extends React.Component {
  state = {
    messages: [
      {
        _id: 0,
        text: 'thread created',
        createdAt: new Date().getTime(),
        system: true,
      },
      {
        _id: 1,
        text: 'hello!',
        createdAt: new Date().getTime(),
        user: {
          _id: 2,
          name: 'Demo',
        },
      },
    ],
  };

  handleSend = async messages => {
    const text = messages[0].text;
    const thread = this.props.navigation.getParam('thread');
    const user = firebase.auth().currentUser.toJSON();

    await firebase
      .firestore()
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
      );

    firebase
      .firestore()
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
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.handleSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
