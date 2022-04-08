import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export default ({onHasUser}) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        console.log(authUser);
        return onHasUser();
      }

      return auth()
        .signInAnonymously()
        .then(({user}) => {
          return user.updateProfile({
            displayName: uniqueNamesGenerator({
              dictionaries: [adjectives, colors, animals],
            }),
          });
        })
        .then(() => {
          onHasUser();
        });
    });

    return () => unsubscribe();
  }, []);

  return null;
};
