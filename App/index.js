import React from 'react';
import {Button} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import Initializing from './screens/Initializing';
import NewThread from './screens/NewThread';
import Threads from './screens/Threads';
import Messages from './screens/Messages';

const MessagingWithModal = createStackNavigator(
  {
    Messaging: createStackNavigator({
      Threads: {
        screen: Threads,
        navigationOptions: ({navigation}) => ({
          headerTitle: 'Message Threads',
          headerRight: (
            <Button
              title="New Thread"
              onPress={() => navigation.navigate('NewThread')}
            />
          ),
        }),
      },
      Messages: {
        screen: Messages,
        navigationOptions: ({navigation}) => ({
          headerTitle: navigation.getParam('thread', {}).name,
        }),
      },
    }),
    NewThread: createStackNavigator({
      NewThread: {
        screen: NewThread,
        navigationOptions: ({navigation}) => ({
          headerTitle: 'New Thread',
          headerRight: (
            <Button title="Cancel" onPress={() => navigation.pop()} />
          ),
        }),
      },
    }),
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
  Messaging: {
    screen: MessagingWithModal,
  },
});

export default createAppContainer(App);
