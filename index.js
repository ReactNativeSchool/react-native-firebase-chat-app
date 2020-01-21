import {AppRegistry, YellowBox} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
]);

AppRegistry.registerComponent(appName, () => App);
