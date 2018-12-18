import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import constants from './constants';
import PlayerOverview from './PlayerOverview';

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

const Buzzer = styled.img`
  width: 100%;
`;

class Player extends React.Component {
  state = {
    username: '',
    lockedIn: false,
  };

  setUsername = event => {
    this.setState({
      username: event.target.value,
    });
  };

  join = () => {
    this.setState({
      lockedIn: true,
    });
    axios({
      method: 'post',
      url: `${constants.apiUrl}/join`,
      data: {
        username: this.state.username,
      },
    });
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

  render() {
    const { lockedIn } = this.state;

    return (
      <div>
        {!lockedIn ? (
          <React.Fragment>
            <UsernameInput
              onChange={this.setUsername}
              placeholder="Your name"
            />
            <Button onClick={this.join}>Doe mee!</Button>
          </React.Fragment>
        ) : (
          <Buzzer
            onClick={this.buzz}
            src="https://lh3.ggpht.com/Cll38pXB-_q861syyIhVDj54sl9j8ZZvH4V_41bXoVZffeW6dYklj1lp63pv7gtZi-o"
          />
        )}
        <PlayerOverview />
      </div>
    );
  }
}

export default Player;
