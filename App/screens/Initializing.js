import React from 'react';
import firebase from 'react-native-firebase';

export default class Initializing extends React.Component {
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        return this.props.navigation.navigate('SignIn');
      }

      return this.props.navigation.navigate('Messaging');
    });
  }

  componentWillUnmount() {
    if (this.removeAuthListener) {
      this.removeAuthListener();
    }
  }

  render() {
    return null;
  }
}
