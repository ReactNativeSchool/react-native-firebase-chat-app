import { useEffect } from 'react';

export default ({ onHasUser }) => {
  useEffect(() => {
    onHasUser();
  }, []);

  return null;
};
