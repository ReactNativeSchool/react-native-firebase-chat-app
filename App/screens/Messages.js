import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';

export default class Messages extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    const thread = this.props.navigation.getParam('thread', {});

    this.removeMessageListener = firebase
      .firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data(),
        }));

        this.setState({messages});
      });
  }

  componentWillUnmount() {
    if (this.removeMessageListener) {
      this.removeMessageListener();
    }
  }

  onSend = async (messages = []) => {
    const thread = this.props.navigation.getParam('thread', {});
    const user = firebase.auth().currentUser.toJSON();

    await firebase
      .firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text: messages[0].text,
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
        text: messages[0].text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          name: user.displayName,
        },
      });
  };

  render() {
    const user = firebase.auth().currentUser.toJSON();

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: user.uid,
          name: user.displayName,
        }}
      />
    );
  }
}
