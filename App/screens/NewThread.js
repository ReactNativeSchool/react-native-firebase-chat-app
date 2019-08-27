import React from 'react';
import {View} from 'react-native';
import firebase from 'react-native-firebase';

import {TextField, Button} from '../components/Form';

export default class NewThread extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  handlePress = () => {
    if (this.state.name.length > 0) {
      this.setState({loading: true}, () => firebase
          .firestore()
          .collection('MESSAGE_THREADS')
          .add({
            name: this.state.name,
            latestMessage: {
              text: `${this.state.name} created.`,
              createdAt: new Date().getTime(),
            },
          })
          .then(docRef => {
            docRef.collection('MESSAGES').add({
              text: `${this.state.name} created.`,
              createdAt: new Date().getTime(),
              system: true,
            });

            this.props.navigation.pop();
          })
          .finally(() => {
            this.setState({loading: false});
          }));
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextField
          placeholder="Thread Name"
          onChangeText={name => this.setState({name})}
        />
        <Button
          onPress={this.handlePress}
          title="Create"
          disabled={this.state.loading}
        />
      </View>
    );
  }
}
