import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Initializing from './screens/Initializing';
import NewThread from './screens/NewThread';
import Threads from './screens/Threads';
import Messages from './screens/Messages';

import {HeaderIcon} from './components/HeaderIcon';

const MessagingWithModal = createStackNavigator(
  {
    Messaging: createStackNavigator({
      Threads: {
        screen: Threads,
        navigationOptions: ({navigation}) => ({
          headerTitle: 'Message Threads',
          headerRight: () => (
            <HeaderIcon
              iconName="add"
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
          headerRight: () => (
            <HeaderIcon iconName="close" onPress={() => navigation.pop()} />
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
