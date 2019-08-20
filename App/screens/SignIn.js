import React from 'react';
import {View, Button} from 'react-native';
import firebase from 'react-native-firebase';

import {TextField} from '../components/Form';

export default class SignIn extends React.Component {
  state = {
    username: '',
  };

  handlePress = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(async ({user}) => {
        await user.updateProfile({displayName: this.state.username});
        this.props.navigation.navigate('Messaging');
      })
      .catch(err => {
        console.log('error signing in', err);
      });
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextField
          placeholder="Username"
          onChangeText={username => this.setState({username})}
        />
        <Button onPress={this.handlePress} title="Join" />
      </View>
    );
  }
}
