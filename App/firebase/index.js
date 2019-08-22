import firebase from 'react-native-firebase';
import {uniqueNamesGenerator} from 'unique-names-generator';

// User
export const currentUser = () => firebase.auth().currentUser.toJSON();

export const signIn = () =>
  firebase
    .auth()
    .signInAnonymously()
    .then(({user}) =>
      user.updateProfile({displayName: uniqueNamesGenerator()}),
    );

// Messages
export const listenToMessages = threadId =>
  firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc');

export const createMessage = async (threadId, messageText) => {
  const user = currentUser();

  await firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .set(
      {
        latestMessage: {
          text: messageText,
          createdAt: new Date().getTime(),
        },
      },
      {merge: true},
    );

  return firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .collection('MESSAGES')
    .add({
      text: messageText,
      createdAt: new Date().getTime(),
      user: {
        _id: user.uid,
        name: user.displayName,
      },
    });
};

// Threads
export const listenToThreads = () =>
  firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .orderBy('latestMessage.createdAt', 'desc');

export const createNewThread = threadName => {
  const messageText = `${threadName} created.`;
  const createdAt = new Date().getTime();

  return firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .add({
      name: threadName,
      latestMessage: {
        text: messageText,
        createdAt,
      },
    })
    .then(docRef => {
      docRef.collection('MESSAGES').add({
        text: messageText,
        createdAt,
        system: true,
      });
    });
};

// Thread Tracking

export const markThreadLastRead = threadId => {
  const user = currentUser();
  firebase
    .firestore()
    .collection('USER_THREAD_TRACK')
    .doc(user.uid)
    .set(
      {
        [threadId]: {
          lastRead: new Date().getTime(),
        },
      },
      {merge: true},
    );
};

export const listenToThreadTracking = () => {
  const user = currentUser();
  return firebase
    .firestore()
    .collection('USER_THREAD_TRACK')
    .doc(user.uid);
};
