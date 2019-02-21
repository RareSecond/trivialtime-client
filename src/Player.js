import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import constants from './constants';
import PlayerOverview from './PlayerOverview';
import Buzzer from './Buzzer';

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
      <Wrapper>
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
          <React.Fragment>
            <Buzzer username={username} />
            <Button onClick={this.pass}>Pas</Button>
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

export default Player;
