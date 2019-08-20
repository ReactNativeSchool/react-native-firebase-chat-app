import {YellowBox} from 'react-native';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

import Initializing from './screens/Initializing';
import SignIn from './screens/SignIn';
import Threads from './screens/Threads';
import Messages from './screens/Messages';

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillMount is deprecated',
]);

const MessagingStack = createStackNavigator({
  Threads: {
    screen: Threads,
    navigationOptions: {
      headerTitle: 'Message Threads',
    },
  },
  Messages: {
    screen: Messages,
    navigationOptions: ({navigation}) => ({
      headerTitle: navigation.getParam('thread', {}).name,
    }),
  },
});

const App = createSwitchNavigator({
  SignIn: {
    screen: SignIn
  },
  Initializing: {
    screen: Initializing,
  },
  Messaging: {
    screen: MessagingStack,
  }
});

export default createAppContainer(App);
