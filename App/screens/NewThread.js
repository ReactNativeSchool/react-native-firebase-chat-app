import React from 'react';
import {View, Button} from 'react-native';
import firebase from 'react-native-firebase';

import {TextField} from '../components/Form';

export default class NewThread extends React.Component {
  state = {
    name: '',
  };

  handlePress = () => {
    firebase
      .firestore()
      .collection('MESSAGE_THREADS')
      .add({
        name: this.state.name,
      })
      .then(docRef => {
        docRef.collection('MESSAGES').add({
          text: `${this.state.name} created.`,
          createdAt: new Date().getTime(),
          system: true,
        });
      })
      .then(() => {
        this.props.navigation.pop();
      });
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextField
          placeholder="Thread Name"
          onChangeText={name => this.setState({name})}
        />
        <Button onPress={this.handlePress} title="Create" />
      </View>
    );
  }
}
