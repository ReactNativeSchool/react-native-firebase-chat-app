import {YellowBox} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Threads from './screens/Threads';
import Messages from './screens/Messages';

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillMount is deprecated',
]);

const App = createStackNavigator({
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

export default createAppContainer(App);
