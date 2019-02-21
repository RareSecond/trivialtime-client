import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PlayerOverview from './PlayerOverview';
import constants from './constants';

const Button = styled.div`
  margin: 10px auto;
  color: white;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  font-size: 10vw;
  font-family: 'Staatliches', cursive;
`;

const Correct = styled(Button)`
  background-color: #a6d3a0;
`;

const Incorrect = styled(Button)`
  background-color: #656565;
`;

const Reset = styled(Button)`
  background-color: #d6f8d6;
`;

class Host extends React.Component {
  markAsCorrect = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/correct`,
    });
  };

  markAsIncorrect = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/incorrect`,
    });
  };

  nextQuestion = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/next`,
    });
  };

  reset = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/reset`,
    });
  };

  render() {
    return (
      <div>
        <Correct onClick={this.markAsCorrect}>Correct</Correct>
        <Incorrect onClick={this.markAsIncorrect}>Incorrect</Incorrect>
        <Incorrect onClick={this.nextQuestion}>Next question</Incorrect>
        <PlayerOverview host />
        <Reset onClick={this.reset}>Reset</Reset>
      </div>
    );
  }
}

export default Host;
