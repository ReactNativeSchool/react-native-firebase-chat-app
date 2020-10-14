import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export const currentUser = () => auth().currentUser.toJSON();

export const signIn = () =>
  auth()
    .signInAnonymously()
    .then(({ user }) =>
      user.updateProfile({
        displayName: uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
        }),
      }),
    );

export const listenToMessages = (threadId) =>
  firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc');

export const createMessage = async (threadId, text) => {
  const user = auth().currentUser.toJSON();

  await firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .set(
      {
        latestMessage: {
          text,
          createdAt: new Date().getTime(),
        },
      },
      { merge: true },
    );

  return firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .collection('MESSAGES')
    .add({
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: user.uid,
        displayName: user.displayName,
      },
    });
};

export const createNewThread = (name) =>
  firestore()
    .collection('MESSAGE_THREADS')
    .add({
      name,
      latestMessage: {
        text: `${name} created.`,
        createdAt: new Date().getTime(),
      },
    })
    .then((docRef) => {
      docRef.collection('MESSAGES').add({
        text: `${name} created.`,
        createdAt: new Date().getTime(),
        system: true,
      });
    });

export const listenToThreads = () =>
  firestore()
    .collection('MESSAGE_THREADS')
    .orderBy('latestMessage.createdAt', 'desc');

export const markThreadLastRead = (threadId) => {
  const user = currentUser();
  return firestore()
    .collection('USER_THREAD_TRACK')
    .doc(user.uid)
    .set(
      {
        [threadId]: {
          lastRead: new Date().getTime(),
        },
      },
      { merge: true },
    );
};

export const listenToThreadTracking = () => {
  const user = currentUser();
  return firestore().collection('USER_THREAD_TRACK').doc(user.uid);
};
