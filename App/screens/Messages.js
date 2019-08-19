import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

export default class Messages extends React.Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 3,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 3,
            name: 'Steve',
          },
        },
        {
          _id: 2,
          text: 'Wassup',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
          },
        },
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
        {
          _id: 0,
          text: 'This is a system message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
