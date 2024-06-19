import { getFirestore, deleteDoc, doc } from 'firebase/firestore';

const useDelete = () => {
  const db = getFirestore();

  return (path) => {
    const wholePath = Array.isArray(path) ? path.join('/') : path;
    return deleteDoc(doc(db, wholePath));
  };
};

export default useDelete;
