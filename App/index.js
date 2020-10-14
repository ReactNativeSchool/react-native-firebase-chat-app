import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Initializing from './screens/Initializing';
import NewThread from './screens/NewThread';
import Threads from './screens/Threads';
import Messages from './screens/Messages';

import { HeaderIcon } from './components/HeaderIcon';

const MessagingStack = createStackNavigator();
const MessagingStackScreen = () => (
  <MessagingStack.Navigator>
    <MessagingStack.Screen
      name="Threads"
      component={Threads}
      options={({ navigation }) => ({
        title: 'Message Threads',
        headerRight: () => (
          <HeaderIcon
            iconName="add"
            onPress={() => navigation.navigate('NewThread')}
          />
        ),
      })}
    />
    <MessagingStack.Screen
      name="Messages"
      component={Messages}
      options={({ route }) => ({
        title: route?.params?.thread?.name,
        headerBackTitle: 'Back',
      })}
    />
  </MessagingStack.Navigator>
);

const NewThreadStack = createStackNavigator();
const NewThreadStackScreen = () => (
  <NewThreadStack.Navigator>
    <NewThreadStack.Screen
      name="NewThread"
      component={NewThread}
      options={({ navigation }) => ({
        title: 'New Thread',
        headerLeft: null,
        headerRight: () => (
          <HeaderIcon iconName="close" onPress={() => navigation.pop()} />
        ),
      })}
    />
  </NewThreadStack.Navigator>
);

const ModalStack = createStackNavigator();
export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Initializing onHasUser={() => setLoggedIn(true)} />;
  }

  return (
    <NavigationContainer>
      <ModalStack.Navigator mode="modal" headerMode="none">
        <ModalStack.Screen name="Messaging" component={MessagingStackScreen} />
        <ModalStack.Screen name="NewThread" component={NewThreadStackScreen} />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};
