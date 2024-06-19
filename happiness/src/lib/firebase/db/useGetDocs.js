import { getFirestore, query, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useGetDocs = ({ path }) => {
  const db = getFirestore();
  const [data, setData] = useState();
  const wholePath = Array.isArray(path) ? path.join('/') : path;

  useEffect(() => {
    const q = query(collection(db, wholePath));

    getDocs(q).then((querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), docPath: doc.ref.path })),
      );
    });
  }, [db, wholePath]);

  return { data, loading: data === undefined };
};

export default useGetDocs;
