import React from 'react';
import {FlatList} from 'react-native';

import {ThreadRow, Separator} from '../components/ThreadRow';

const DATA = [
  {
    _id: '1',
    name: 'Thread 1',
    latestMessage: {
      text:
        'This is the latest message. It says things. This is the latest message. It says things. This is the latest message. It says things.',
      date: Date(2019, 7, 19, 10, 30, 0, 0),
    },
    unread: true,
  },
  {
    _id: '2',
    name: 'Thread 2',
    latestMessage: {
      text:
        'This is the latest message. It says things. This is the latest message. It says things. This is the latest message. It says things.',
      date: Date(2019, 7, 19, 10, 30, 0, 0),
    },
    unread: true,
  },
  {
    _id: '3',
    name: 'Thread 3',
    latestMessage: {
      text:
        'This is the latest message. It says things. This is the latest message. It says things. This is the latest message. It says things.',
      date: Date(2019, 7, 19, 10, 30, 0, 0),
    },
    unread: false,
  },
];

export default ({navigation}) => (
  <FlatList
    data={DATA}
    keyExtractor={item => item._id}
    renderItem={({item}) => (
      <ThreadRow
        {...item}
        onPress={() => navigation.navigate('Messages', {thread: item})}
      />
    )}
    ItemSeparatorComponent={() => <Separator />}
  />
);
