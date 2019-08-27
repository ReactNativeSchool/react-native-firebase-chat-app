import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';

export default class Messages extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    const thread = this.props.navigation.getParam('thread');

    this.removeMessagesListener = firebase
      .firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
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

        console.log(messages);
        this.setState({messages});
      });
  }

  componentWillUnmount() {
    if (this.removeMessagesListener) {
      this.removeMessagesListener();
    }
  }

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
    const user = firebase.auth().currentUser.toJSON();

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.handleSend}
        user={{
          _id: user.uid,
        }}
      />
    );
  }
}
