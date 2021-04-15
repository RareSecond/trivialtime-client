import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { initializeApp, database } from 'firebase';
import RoleSelection from './RoleSelection';
import Skeleton from './Skeleton';
import DatabaseContext from './Data/DatabaseContext';

const App = () => {
  const [db, setDb] = useState();

  useEffect(() => {
    const config = {
      apiKey: FB_APIKEY,
      authDomain: FB_AUTHDOMAIN,
      databaseURL: FB_DATABASEURL,
      projectId: FB_PROJECTID,
      storageBucket: FB_STORAGEBUCKET,
      messagingSenderId: FB_MESSAGINGSENDERID,
    };

    initializeApp(config);

    setDb(database());
  }, []);

  return (
    <DatabaseContext.Provider value={db}>
      <Skeleton>
        <RoleSelection />
      </Skeleton>
    </DatabaseContext.Provider>
  );
};

export default hot(App);
