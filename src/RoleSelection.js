import React from 'react';
import styled from 'styled-components';
import Player from './Player';
import Host from './Host';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 5%;
`;

const HeaderImage = styled.img`
  width: 75%;
  display: block;
  margin: 0 auto 50px;
`;

const RoleButton = styled.div`
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

class RoleSelection extends React.Component {
  state = {
    role: '',
  };

  setRole = role => {
    this.setState({
      role,
    });
  };

  render() {
    const { role } = this.state;

    return (
      <Wrapper>
        <HeaderImage src="https://pbs.twimg.com/media/C1fov7yXUAA_Et0.jpg" />
        {role ? (
          role === 'player' ? (
            <Player />
          ) : (
            <Host />
          )
        ) : (
          <React.Fragment>
            <RoleButton
              onClick={() => {
                this.setRole('player');
              }}
            >
              Player
            </RoleButton>
            <RoleButton
              onClick={() => {
                this.setRole('host');
              }}
            >
              Quizmaster
            </RoleButton>
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

export default RoleSelection;
