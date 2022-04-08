import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {ThreadRow, Separator} from '../components/ThreadRow';

export default ({navigation}) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('MESSAGE_THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        // console.log(querySnapshot.docs);
        const allThreads = querySnapshot.docs.map(snapshot => {
          return {
            _id: snapshot.id,
            name: '',
            latestMessage: {text: ''},
            ...snapshot.data(),
          };
        });

        setThreads(allThreads);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingBottom: 50}}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ThreadRow
            {...item}
            onPress={() => navigation.navigate('Messages', {thread: item})}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};
