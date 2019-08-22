import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

import {listenToMessages, createMessage, currentUser} from '../firebase';

export default class Messages extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    const thread = this.props.navigation.getParam('thread', {});

    this.removeMessageListener = listenToMessages(thread._id).onSnapshot(
      querySnapshot => {
        const messages = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data(),
        }));

        this.setState({messages});
      },
    );
  }

  componentWillUnmount() {
    if (this.removeMessageListener) {
      this.removeMessageListener();
    }
  }

  onSend = async (messages = []) => {
    const thread = this.props.navigation.getParam('thread', {});

    createMessage(thread._id, messages[0].text);
  };

  render() {
    const user = currentUser();

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
