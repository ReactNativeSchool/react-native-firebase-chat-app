import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export default ({ onHasUser }) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        return auth()
          .signInAnonymously()
          .then(({ user }) =>
            user.updateProfile({
              displayName: uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
              }),
            }),
          );
      }

      return onHasUser();
    });

    return () => unsubscribe();
  });

  return null;
};
