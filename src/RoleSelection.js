import React from 'react';
import styled from 'styled-components';
import NoSleep from 'nosleep.js';
import { MdAirplay, MdPlayCircleFilled, MdMic } from 'react-icons/md';
import Player from './Player';
import Host from './Quizmaster/Host';
import Spectator from './Spectator';

var noSleep = new NoSleep();

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 100px 5%;
  width: 100%;
`;

const SelectionWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RoleButton = styled.div`
  margin: 20px auto;
  background-color: ${props => props.theme.turquoise};
  color: white;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  font-size: 30px;
  width: 600px;
  max-width: 90%;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  @media only screen and (min-width: 700px) {
    font-size: 50px;
  }
`;

const RoleIcon = styled.span`
  margin-right: 10px;
  flex: 0 0 auto;
`;

const RoleText = styled.span`
  flex-grow: 1;
`;

class RoleSelection extends React.Component {
  state = {
    role: '',
  };

  componentDidMount() {
    if (PRODUCTION) {
      window.addEventListener('beforeunload', event => {
        event.returnValue = 'Your custom message.';
      });
    }
  }

  setRole = role => {
    this.setState({
      role,
    });
    noSleep.enable();
  };

  render() {
    const { role } = this.state;

    return (
      <React.Fragment>
        {role ? (
          role === 'player' ? (
            <Player />
          ) : role === 'host' ? (
            <Host />
          ) : (
            <Spectator />
          )
        ) : (
          <SelectionWrapper>
            <RoleButton
              onClick={() => {
                this.setRole('player');
              }}
            >
              <RoleIcon>
                <MdPlayCircleFilled />
              </RoleIcon>
              <RoleText>Player</RoleText>
            </RoleButton>
            <RoleButton
              onClick={() => {
                this.setRole('host');
              }}
            >
              <RoleIcon>
                <MdMic />
              </RoleIcon>
              <RoleText>Quizmaster</RoleText>
            </RoleButton>
            <RoleButton
              onClick={() => {
                this.setRole('spectator');
              }}
            >
              <RoleIcon>
                <MdAirplay />
              </RoleIcon>
              <RoleText>Spectator</RoleText>
            </RoleButton>
          </SelectionWrapper>
        )}
      </React.Fragment>
    );
  }
}

export default RoleSelection;
