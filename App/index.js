import {createStackNavigator, createAppContainer} from 'react-navigation';

import Threads from './screens/Threads';
import Messages from './screens/Messages';

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
