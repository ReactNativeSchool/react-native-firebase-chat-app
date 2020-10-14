import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { ThreadRow, Separator } from '../components/ThreadRow';
import { listenToThreads } from '../firebase';

export default ({ navigation }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToThreads().onSnapshot((querySnapshot) => {
      const formattedData = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        name: '',
        latestMessage: { text: '' },
        ...doc.data(),
      }));

      setThreads(formattedData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 50 }}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ThreadRow
            {...item}
            onPress={() => navigation.navigate('Messages', { thread: item })}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};
