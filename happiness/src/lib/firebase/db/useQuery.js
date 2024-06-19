import { useEffect, useState } from 'react';
import { getFirestore, onSnapshot, query, collection } from 'firebase/firestore';

const useQuery = (collectionName) => {
  const db = getFirestore();
  const [items, setItems] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, collectionName)),
      (querySnapshot) => {
        const newItems = {};
        querySnapshot.forEach((doc) => {
          newItems[doc.id] = doc.data();
        });
        setItems(newItems);
      },
      () => {
        setError(true);
      },
    );

    return unsubscribe;
  }, [db, collectionName]);

  return [items, error];
};

export default useQuery;
