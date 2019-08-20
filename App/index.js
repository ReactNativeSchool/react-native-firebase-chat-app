import React from 'react';
import {YellowBox, Button, ScrollView} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import firebase from 'react-native-firebase';

import Initializing from './screens/Initializing';
import SignIn from './screens/SignIn';
import Threads from './screens/Threads';
import Messages from './screens/Messages';

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
]);

const MessagingStack = createStackNavigator({
  Threads: {
    screen: Threads,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Message Threads',
      headerRight: (
        <Button title="Drawer" onPress={() => navigation.openDrawer()} />
      ),
    }),
  },
  Messages: {
    screen: Messages,
    navigationOptions: ({navigation}) => ({
      headerTitle: navigation.getParam('thread', {}).name,
    }),
  },
});

const MessagingStackWithDrawer = createDrawerNavigator(
  {
    Messaging: MessagingStack,
  },
  {
    drawerPosition: 'right',
    contentComponent: props => (
      <ScrollView>
        <SafeAreaView
          style={{flex: 1}}
          forceInset={{top: 'always', horizontal: 'never'}}>
          <DrawerItems {...props} />
          <Button title="Create Thread" onPress={() => alert('todo')} />
          <Button
            title="Sign Out"
            onPress={() =>
              firebase
                .auth()
                .signOut()
                .then(() => props.navigation.navigate('SignIn'))
            }
          />
        </SafeAreaView>
      </ScrollView>
    ),
  },
);

const App = createSwitchNavigator({
  Initializing: {
    screen: Initializing,
  },
  SignIn: {
    screen: SignIn,
  },
  Messaging: {
    screen: MessagingStackWithDrawer,
  },
});

export default createAppContainer(App);
