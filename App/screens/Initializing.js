import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import { signIn } from '../firebase';

export default ({ onHasUser }) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        return signIn();
      }

      return onHasUser();
    });

    return () => unsubscribe();
  });

  return null;
};
