import React from 'react';
import {View, Button} from 'react-native';

import {TextField} from '../components/Form';

export default class SignIn extends React.Component {
  state = {
    username: '',
  };

  handlePress = () => {
    alert(this.state.username);
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
