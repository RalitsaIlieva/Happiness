import { useCallback } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const useAddDoc = ({ path } = {}) => {
  const db = getFirestore();

  const wholePath = Array.isArray(path) ? path.join('/') : path;

  return useCallback(
    ({ values, path: newPath }) => {
      const finalPath = newPath || wholePath;
      const wholeFinalPath = Array.isArray(finalPath) ? finalPath.join('/') : finalPath;

      return addDoc(collection(db, wholeFinalPath), values);
    },

    [db, wholePath],
  );
};

export default useAddDoc;
