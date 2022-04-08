import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export const currentUser = () => auth().currentUser.toJSON();

export const createNewThread = threadName => {
  return firestore()
    .collection('MESSAGE_THREADS')
    .add({
      name: threadName,
      latestMessage: {
        text: `${threadName} created.`,
        createdAt: new Date().getTime(),
      },
    });
};

export const listenToThreads = () => {
  return firestore()
    .collection('MESSAGE_THREADS')
    .orderBy('latestMessage.createdAt', 'desc');
};

export const listenToMessages = threadId => {
  return firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc');
};

export const createMessage = (threadId, text) => {
  const user = currentUser();

  return firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .set(
      {
        latestMessage: {
          text,
          createdAt: new Date().getTime(),
        },
      },
      {merge: true},
    )
    .then(() => {
      return firestore()
        .collection('MESSAGE_THREADS')
        .doc(threadId)
        .collection('MESSAGES')
        .add({
          text,
          createdAt: new Date().getTime(),
          user: {
            _id: user.uid,
            name: user.displayName,
          },
        });
    });
};

export const signIn = () => {
  return auth()
    .signInAnonymously()
    .then(({user}) => {
      return user.updateProfile({
        displayName: uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
        }),
      });
    });
};

export const markThreadLastRead = threadId => {
  const user = currentUser();

  return firestore()
    .collection('USER_THREAD_TRACK')
    .doc(user.uid)
    .set(
      {
        [threadId]: new Date().getTime(),
      },
      {merge: true},
    );
};

export const listenToThreadTracking = () => {
  const user = currentUser();
  return firestore().collection('USER_THREAD_TRACK').doc(user.uid);
};
