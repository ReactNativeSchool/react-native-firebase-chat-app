import React from 'react';
import {View, Button} from 'react-native';

import {TextField} from '../components/Form';
import {signIn} from '../firebase';

export default class SignIn extends React.Component {
  state = {
    username: '',
  };

  handlePress = () => {
    signIn(this.state.username)
      .then(() => this.props.navigation.navigate('Messaging'))
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
