import React from 'react';
import styled from 'styled-components';
import NoSleep from 'nosleep.js';
import { MdAirplay, MdPlayCircleFilled, MdMic } from 'react-icons/md';
import Player from './Player';
import Host from './Quizmaster/Host';
import Spectator from './Spectator';
import Box from './Components/Box';
import Players from './Components/Icons/Players';
import Microphone from './Components/Icons/Microphone';

var noSleep = new NoSleep();

const SelectionWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SelectionBox = styled(Box)`
  margin-bottom: 50px;
`;

const SingleSelection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SelectionText = styled.div`
  color: ${props => props.theme.turquoise};
  font-size: 8vw;
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
            <SelectionBox>
              <SingleSelection
                onClick={() => {
                  this.setRole('player');
                }}
              >
                <Players />
                <SelectionText>Player ></SelectionText>
              </SingleSelection>
            </SelectionBox>
            <SelectionBox>
              <SingleSelection
                onClick={() => {
                  this.setRole('host');
                }}
              >
                <Microphone />
                <SelectionText>Quizmaster ></SelectionText>
              </SingleSelection>
            </SelectionBox>
          </SelectionWrapper>
        )}
      </React.Fragment>
    );
  }
}

export default RoleSelection;
