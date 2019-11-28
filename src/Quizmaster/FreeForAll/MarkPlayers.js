import React from 'react';
import styled from 'styled-components';
import useDb from '../../Data/useDb';

const Wrapper = styled.div`
  padding: 0 10px;
`;

const PlayerWrapper = styled.div`
  border: lightgrey 2px solid;
  position: relative;
  padding: 15px 10px;
  margin: 20px 0;
`;

const PlayerName = styled.div`
  background-color: white;
  position: absolute;
  left: 10px;
  top: 0px;
  padding: 0px 10px;
  transform: translateY(-50%);
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

const AnswerButton = styled.button`
  color: ${props => props.theme.clouds};
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 15px;
  border: none;
  opacity: ${props => (props.notIndicated ? 0.3 : 1)};

  &:focus {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
    outline: none;
  }
`;

const CorrectButton = styled(AnswerButton)`
  background-color: ${props => props.theme.turquoise};
`;

const IncorrectButton = styled(AnswerButton)`
  background-color: ${props => props.theme.alizarin};
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

  return (
    <Wrapper>
      {answeredPlayers.map(player => {
        return (
          <PlayerWrapper key={player.username}>
            <PlayerName>{player.username}</PlayerName>
            <PlayerAnswer>{player.answer}</PlayerAnswer>
            <ButtonWrapper>
              <CorrectButton
                onClick={() => markCorrect(player)}
                notIndicated={player.answerCorrect === false}
                disabled={player.answerCorrect !== undefined}
              >
                Correct
              </CorrectButton>
              <IncorrectButton
                onClick={() => markIncorrect(player)}
                notIndicated={player.answerCorrect === true}
                disabled={player.answerCorrect !== undefined}
              >
                Incorrect
              </IncorrectButton>
            </ButtonWrapper>
          </PlayerWrapper>
        );
      })}
    </Wrapper>
  );
};

export default MarkPlayers;
