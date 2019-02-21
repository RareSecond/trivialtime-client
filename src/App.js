import React from 'react';
import { hot } from 'react-hot-loader/root';
import RoleSelection from './RoleSelection';
import Skeleton from './Skeleton';

const App = () => (
  <Skeleton>
    <RoleSelection />
  </Skeleton>
);

export default hot(App);
