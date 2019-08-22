import React from 'react';
import {View, Button} from 'react-native';

import {TextField} from '../components/Form';
import {createNewThread} from '../firebase';

export default class NewThread extends React.Component {
  state = {
    name: '',
  };

  handlePress = () => {
    createNewThread(this.state.name).then(() => {
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
