import { useEffect, useContext, useState } from 'react';
import DatabaseContext from './DatabaseContext';

const useDbValue = dbPath => {
  const [value, setValue] = useState();
  const db = useContext(DatabaseContext);

  useEffect(
    () => {
      if (dbPath) {
        const document = db.ref(dbPath);
        document.on('value', updatedDoc => {
          setValue(updatedDoc.val());
        });
      }
    },
    [dbPath]
  );

  return value;
};

export default useDbValue;
