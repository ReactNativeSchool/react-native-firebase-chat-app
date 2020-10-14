import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { ThreadRow, Separator } from '../components/ThreadRow';

export default ({ navigation }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('MESSAGE_THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
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
