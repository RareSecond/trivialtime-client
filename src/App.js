import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { initializeApp, database } from 'firebase';
import RoleSelection from './RoleSelection';
import Skeleton from './Skeleton';
import DatabaseContext from './DatabaseContext';

const App = () => {
  const [db, setDb] = useState();

  useEffect(() => {
    const config = {
      apiKey: 'AIzaSyDk5fA_myXb5I91RyKZBd5RpdZe63qIlNQ',
      authDomain: 'trivialtime-jd.firebaseapp.com',
      databaseURL: 'https://trivialtime-jd.firebaseio.com',
      projectId: 'trivialtime-jd',
      storageBucket: 'trivialtime-jd.appspot.com',
      messagingSenderId: '1096818248339',
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
