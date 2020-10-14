import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { ThreadRow, Separator } from '../components/ThreadRow';
import { listenToThreads, listenToThreadTracking } from '../firebase';

const isThreadUnread = (thread, threadTracking) => {
  // new message in thread sicne we last checked
  // never viewed that thread before (unread)
  if (
    !threadTracking[thread._id] ||
    threadTracking[thread._id].lastRead < thread.latestMessage.createdAt
  ) {
    return true;
  }

  return false;
};

export default ({ navigation }) => {
  const [threads, setThreads] = useState([]);
  const [threadTracking, setThreadTracking] = useState({});

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

  useEffect(() => {
    const unsubscribe = listenToThreadTracking().onSnapshot((querySnapshot) => {
      setThreadTracking(querySnapshot.data() || {});
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
            unread={isThreadUnread(item, threadTracking)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};
