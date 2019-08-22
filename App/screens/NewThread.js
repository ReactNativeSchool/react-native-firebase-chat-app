import React from 'react';
import {View} from 'react-native';

import {TextField, Button} from '../components/Form';
import {createNewThread} from '../firebase';

export default class NewThread extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  handlePress = () => {
    this.setState({loading: true}, () => {
      if (this.state.name.length) {
        createNewThread(this.state.name)
          .then(() => {
            this.props.navigation.pop();
          })
          .finally(() => this.setState({loading: false}));
      }
    });
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
