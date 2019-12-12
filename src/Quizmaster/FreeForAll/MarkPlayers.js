import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import useDb from '../../Data/useDb';
import Box from '../../Components/Box';
import Button from '../../Components/Button';

const PlayerWrapper = styled(Box)`
  margin: 20px 0;

  ${props => {
    if (props.answerCorrect !== undefined) {
      if (props.answerCorrect === false) {
        return `background-color: ${props.theme.alizarin}`;
      }

      return `background-color: ${props.theme.turquoise}`;
    }

    return null;
  }};
`;

const PlayerName = styled.div`
  color: ${props => props.theme.silver};
`;

const PlayerAnswer = styled.div`
  color: ${props => props.theme.midnightBlue};
  font-size: 8vw;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const MarkPlayers = ({ answeredPlayers }) => {
  const db = useDb();

  const markCorrect = player => {
    db.ref(`users/${player.key}`).update({
      answerCorrect: true,
      score: (player.score || 0) + 1,
      [`scores/${player.scores.length - 1}`]:
        (player.scores[player.scores.length - 1] || 0) + 1,
    });
  };

  const markIncorrect = player => {
    db.ref(`users/${player.key}`).update({
      answerCorrect: false,
    });
  };

  return _.sortBy(answeredPlayers, 'answeredAt').map(player => {
    return (
      <PlayerWrapper
        key={player.username}
        corrected={player.answerCorrect !== undefined}
        answerCorrect={player.answerCorrect}
      >
        <PlayerName>{player.username}</PlayerName>
        <PlayerAnswer>{player.answer}</PlayerAnswer>
        <ButtonWrapper>
          <Button bgColor="turquoise" onClick={() => markCorrect(player)}>
            Correct
          </Button>
          <Button bgColor="alizarin" onClick={() => markIncorrect(player)}>
            Incorrect
          </Button>
        </ButtonWrapper>
      </PlayerWrapper>
    );
  });
};

export default MarkPlayers;
