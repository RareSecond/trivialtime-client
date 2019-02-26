import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import constants from './constants';
import PlayerOverview from './PlayerOverview';
import Buzzer from './Buzzer';
import usePlayers from './usePlayers';

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

  const lockUsername = event => {
    setUsername(event.target.value);
  };

  const players = usePlayers() || {};
  const currentPlayer = _.find(players.allPlayers, [
    'username',
    _.toLower(username),
  ]);

  const currentOrder = currentPlayer && currentPlayer.order;

  const join = () => {
    if (username) {
      setLockedIn(true);
      localStorage.setItem('username', username);
      axios({
        method: 'post',
        url: `${constants.apiUrl}/join`,
        data: {
          username,
        },
      });
    }
  };

  const pass = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/pass`,
      data: {
        username,
      },
    });
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
          <Buzzer username={username} buzzed={currentOrder > 0} />
          <Button onClick={pass} disabled={currentOrder < 0}>
            Pas
          </Button>
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default Player;
