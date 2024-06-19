import { useEffect, useState } from 'react';
import { getFirestore, query, collection, onSnapshot } from 'firebase/firestore';

const useOnSnapshot = ({ path }) => {
  const db = getFirestore();
  const [data, setData] = useState();

  const wholePath = Array.isArray(path) ? path.join('/') : path;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, wholePath)),
      (querySnapshot) => {
        setData(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), docPath: doc.ref.path })),
        );
      },
      () => {
        console.log('error');
      },
    );

    return unsubscribe;
  }, [db, wholePath]);

  return { data, loading: data === undefined };
};

export default useOnSnapshot;
