import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Buzzer from './Player/Buzzer';
import useDb from './Data/useDb';
import useDbValue from './Data/useDbValue';
import FreeForAll from './Player/FreeForAll';
import Box from './Components/Box';
import FullWidthButton from './Components/FullWidthButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  justify-content: center;
`;

const UsernameInput = styled.input`
  width: 100%;
  display: block;
  border: none;
  border-bottom: 2px solid ${props => props.theme.turquoise};
  text-align: center;
  text-transform: uppercase;
  font-size: 10vw;
  font-family: 'Staatliches', cursive;
  color: ${props => props.theme.turquoise};
  background-color: transparent;
  margin-bottom: 15px;

  &:focus {
    outline: none;
  }
`;

const EilandGif = styled.img`
  width: 100%;
  height: auto;
  display: block;
  margin-top: 10px;
`;

const Player = () => {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [lockedIn, setLockedIn] = useState(false);
  const [userKey, setUserKey] = useState('');
  const db = useDb();

  const player = useDbValue(userKey && `users/${userKey}`);
  const quizOngoing = useDbValue('quizOngoing');
  const quizDay = useDbValue('quizDay');
  const quizMode = useDbValue('quizMode');

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
                scores: _.times(quizDay, _.constant(0)),
              })
              .then(res => {
                setUserKey(res.key);
                localStorage.setItem('userKey', res.key);
                setLockedIn(true);
              });
          } else {
            const currentUserKey = Object.keys(user)[0];

            setUserKey(currentUserKey);
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

  if (!quizOngoing) {
    return (
      <Wrapper>
        Waiting for quizmaster to start today&apos;s quiz..
        <EilandGif src="https://media1.giphy.com/media/3o6ZtfzV59Q8faMmmk/giphy.gif?cid=790b7611c44813f697fda481b3394ae130c5f036e6910a15&rid=giphy.gif" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {!lockedIn ? (
        <Box>
          <UsernameInput
            onChange={lockUsername}
            placeholder="Your name"
            value={username}
          />
          <FullWidthButton bgColor="turquoise" onClick={join}>
            Doe mee!
          </FullWidthButton>
        </Box>
      ) : (
        <React.Fragment>
          {player && player.active ? (
            <>
              {quizMode === 'freeForAll' ? (
                <FreeForAll userKey={userKey} />
              ) : (
                <>
                  <Buzzer
                    username={username}
                    userKey={userKey}
                    buzzed={player && player.buzzedAt}
                    incorrect={player && player.incorrect}
                  />
                  <Button onClick={pass} disabled={player && player.incorrect}>
                    Pas
                  </Button>
                </>
              )}
            </>
          ) : (
            'Player not found. Please refresh.'
          )}
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default Player;
