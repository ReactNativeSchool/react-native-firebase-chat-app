import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import { ThreadRow, Separator } from '../components/ThreadRow';

export default ({ navigation }) => {
  const [threads] = useState([
    {
      _id: '1',
      unread: false,
      name: 'Demo 1',
      latestMessage: {
        text: 'Hello, this is an example.',
      },
    },
    {
      _id: '2',
      unread: true,
      name: 'Demo 2',
      latestMessage: {
        text: 'Hello, this is another example.',
      },
    },
  ]);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 50 }}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ThreadRow
            {...item}
            onPress={() => navigation.navigate('Messages', { thread: item })}
            unread={item.unread}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};
