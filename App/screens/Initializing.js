import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {signIn} from '../firebase';

export default ({onHasUser}) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        console.log(authUser);
        return onHasUser();
      }

      return signIn().then(() => {
        onHasUser();
      });
    });

    return () => unsubscribe();
  }, []);

  return null;
};
