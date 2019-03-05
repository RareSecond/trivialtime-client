import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import constants from './constants';
import PlayerOverview from './PlayerOverview';
import Buzzer from './Buzzer';
import usePlayers from './usePlayers';
import useDb from './useDb';
import useDbValue from './useDbValue';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.clouds};
  width: 100%;
  padding: 20px;
  justify-content: center;
`;

const UsernameInput = styled.input`
  width: 100%;
  display: block;
  border: none;
  border: 2px solid ${props => props.theme.turquoise};
  text-align: center;
  text-transform: uppercase;
  font-size: 15vw;
  font-family: 'Staatliches', cursive;
  color: ${props => props.theme.midnightBlue};

  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  margin: 20px auto;
  background-color: ${props => props.theme.turquoise};
  width: 100%;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  font-size: 15vw;
  font-family: 'Staatliches', cursive;
  border-radius: 10px;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
`;

const Player = () => {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [lockedIn, setLockedIn] = useState(false);
  const db = useDb();

  const userKey = localStorage.getItem('userKey');
  const player = useDbValue(userKey && `users/${userKey}`);

  const lockUsername = event => {
    setUsername(event.target.value);
  };

  const join = () => {
    if (username) {
      localStorage.setItem('username', username);
      db.ref('users')
        .orderByChild('username')
        .equalTo(username)
        .limitToFirst(1)
        .once('value', snapshot => {
          const user = snapshot.val();

          if (!user) {
            db.ref('users')
              .push({
                username,
                active: true,
              })
              .then(res => {
                localStorage.setItem('userKey', res.key);
                setLockedIn(true);
              });
          } else {
            const currentUserKey = Object.keys(user)[0];
            localStorage.setItem('userKey', currentUserKey);
            db.ref(`users/${currentUserKey}`)
              .update({
                active: true,
              })
              .then(() => {
                setLockedIn(true);
              });
          }
        });
    }
  };

  const pass = () => {
    if (!player.buzzedAt) {
      db.ref(`users/${userKey}`).update({
        incorrect: true,
      });
    }
  };

  return (
    <Wrapper>
      {!lockedIn ? (
        <React.Fragment>
          <UsernameInput
            onChange={lockUsername}
            placeholder="Your name"
            value={username}
          />
          <Button onClick={join}>Doe mee!</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Buzzer
            username={username}
            buzzed={player && player.buzzedAt}
            incorrect={player && player.incorrect}
          />
          <Button onClick={pass} disabled={player && player.incorrect}>
            Pas
          </Button>
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default Player;
