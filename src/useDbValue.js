import { useEffect, useContext, useState } from 'react';
import DatabaseContext from './DatabaseContext';

const useDbValue = dbPath => {
  const [value, setValue] = useState();
  const db = useContext(DatabaseContext);

  useEffect(() => {
    const document = db.ref(dbPath);
    document.on('value', updatedDoc => {
      setValue(updatedDoc.val());
    });
  });

  return value;
};

export default useDbValue;
