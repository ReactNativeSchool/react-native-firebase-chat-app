import React from 'react';
import firebase from 'react-native-firebase';
import {uniqueNamesGenerator} from 'unique-names-generator';

export default class Initializing extends React.Component {
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(authUser => {
      if (!authUser) {
        return firebase.auth().signInAnonymously()
        .then(({ user }) => {
          return user.updateProfile({ displayName: uniqueNamesGenerator() })
        })
      }

      return this.props.navigation.navigate('Messaging')
    });
  }

  componentWillUnmount(){
    if (this.removeAuthListener) {
      this.removeAuthListener();
    }
  }

  render() {
    return null;
  }
}
