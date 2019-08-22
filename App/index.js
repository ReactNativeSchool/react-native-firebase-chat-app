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

import {signOut} from './firebase';
import Initializing from './screens/Initializing';
import NewThread from './screens/NewThread';
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
          <Button
            title="Create Thread"
            onPress={() => {
              props.navigation.navigate('NewThread');
              props.navigation.closeDrawer();
            }}
          />
          <Button
            title="Sign Out"
            onPress={() =>
              signOut().then(() => props.navigation.navigate('SignIn'))
            }
          />
        </SafeAreaView>
      </ScrollView>
    ),
  },
);

const MessagingWithDrawerAndModal = createStackNavigator(
  {
    Messaging: MessagingStackWithDrawer,
    NewThread,
  },
  {
    headerMode: 'none',
    mode: 'modal',
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
    screen: MessagingWithDrawerAndModal,
  },
});

export default createAppContainer(App);
