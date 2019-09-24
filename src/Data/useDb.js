import { useContext } from 'react';
import DatabaseContext from './DatabaseContext';

const useDb = () => {
  const db = useContext(DatabaseContext);

  return db;
};

export default useDb;
