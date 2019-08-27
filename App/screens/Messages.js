import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

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

  handleSend = messages => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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
