import React from 'react';
import styled from 'styled-components';
import useDb from '../../Data/useDb';
import Box from '../../Components/Box';
import Button from '../../Components/Button';

const PlayerWrapper = styled(Box)`
  margin: 20px 0;
  opacity: ${props => (props.corrected ? 0.25 : 1)};
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

  return answeredPlayers.map(player => {
    return (
      <PlayerWrapper
        key={player.username}
        corrected={player.answerCorrect !== undefined}
      >
        <PlayerName>{player.username}</PlayerName>
        <PlayerAnswer>{player.answer}</PlayerAnswer>
        <ButtonWrapper>
          <Button
            bgColor="turquoise"
            onClick={() => markCorrect(player)}
            notIndicated={player.answerCorrect === false}
            disabled={player.answerCorrect !== undefined}
          >
            Correct
          </Button>
          <Button
            bgColor="alizarin"
            onClick={() => markIncorrect(player)}
            notIndicated={player.answerCorrect === true}
            disabled={player.answerCorrect !== undefined}
          >
            Incorrect
          </Button>
        </ButtonWrapper>
      </PlayerWrapper>
    );
  });
};

export default MarkPlayers;
