import React from 'react';
import {FlatList} from 'react-native';

import {ThreadRow, Separator} from '../components/ThreadRow';

export default class Threads extends React.Component {
  state = {
    threads: [
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
    ],
  };

  render() {
    return (
      <FlatList
        data={this.state.threads}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ThreadRow
            {...item}
            onPress={() =>
              this.props.navigation.navigate('Messages', {thread: item})
            }
            unread={item.unread}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    );
  }
}
