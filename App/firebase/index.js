import firebase from 'react-native-firebase';

// User
export const currentUser = () => firebase.auth().currentUser.toJSON();

export const signIn = username =>
  firebase
    .auth()
    .signInAnonymously()
    .then(({user}) => user.updateProfile({displayName: username}));

export const signOut = () => firebase.auth().signOut();

// Messages
export const listenToMessages = threadId =>
  firebase
    .firestore()
    .collection('MESSAGE_THREADS')
    .doc(threadId)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc');

export const createMessage = async (threadId, messageText) => {
  const user = firebase.auth().currentUser.toJSON();

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
