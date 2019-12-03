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
      apiKey: 'AIzaSyARZJ395Q_BH7FOsNqJ7IYiajHK1rf9pvs',
      authDomain: 'trivialtime-dev.firebaseapp.com',
      databaseURL: 'https://trivialtime-dev.firebaseio.com',
      projectId: 'trivialtime-dev',
      storageBucket: 'trivialtime-dev.appspot.com',
      messagingSenderId: '643695006662',
      appId: '1:643695006662:web:c1c9fbcab18dcdde2c58c7',
      measurementId: 'G-J6DLYN3B4G',
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
