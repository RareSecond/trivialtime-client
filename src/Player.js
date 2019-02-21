import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import constants from './constants';
import PlayerOverview from './PlayerOverview';
import Buzzer from './Buzzer';

const UsernameInput = styled.input`
  width: 100%;
  display: block;
  border: none;
  border-bottom: 2px solid #a6d3a0;
  text-align: center;
  text-transform: uppercase;
  font-size: 15vw;
  font-family: 'Staatliches', cursive;

  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  margin: 20px auto;
  background-color: #a6d3a0;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  font-size: 15vw;
  font-family: 'Staatliches', cursive;
`;

class Player extends React.Component {
  state = {
    username: localStorage.getItem('username') || '',
    lockedIn: false,
  };

  setUsername = event => {
    this.setState({
      username: event.target.value,
    });
  };

  join = () => {
    const { username } = this.state;

    if (username) {
      this.setState({
        lockedIn: true,
      });
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

  buzz = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/buzz`,
      data: {
        username: this.state.username,
      },
    });
  };

  pass = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/pass`,
      data: {
        username: this.state.username,
      },
    });
  };

  render() {
    const { lockedIn, username } = this.state;

    return (
      <div>
        {!lockedIn ? (
          <React.Fragment>
            <UsernameInput
              onChange={this.setUsername}
              placeholder="Your name"
              value={username}
            />
            <Button onClick={this.join}>Doe mee!</Button>
          </React.Fragment>
        ) : (
          <Buzzer username={username} />
        )}
        <PlayerOverview />
        <Button onClick={this.pass}>Pas</Button>
      </div>
    );
  }
}

export default Player;
