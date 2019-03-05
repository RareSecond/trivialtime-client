import React from 'react';
import styled from 'styled-components';
import { MdCheck, MdClear, MdSkipNext, MdCached } from 'react-icons/md';
import _ from 'lodash';
import useDbValue from './useDbValue';
import useDb from './useDb';
import {
  getNextPlayer,
  generateResettedPlayers,
  getEligiblePlayers,
} from './playerFunctions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.hasPlayer ? props.theme.midnightBlue : props.theme.clouds};
  width: 100%;
  padding: 20px;
`;

const PlayerName = styled.div`
  color: ${props => props.theme.clouds};
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NameText = styled.div`
  font-size: 3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AnswerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0 0 auto;
`;

const Button = styled.div`
  border-radius: 10px;
  padding: 15px 15vw;
  font-size: 2em;
  color: ${props => props.theme.clouds};
`;

const CorrectButton = styled(Button)`
  background-color: ${props => props.theme.turquoise};
`;

const IncorrectButton = styled(Button)`
  background-color: ${props => props.theme.alizarin};
`;

const NoPlayer = styled(PlayerName)`
  color: ${props => props.theme.midnightBlue};
  text-transform: uppercase;
  text-align: center;
`;

const DeclineButtons = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
`;

const NextQuestionButton = styled(Button)`
  background-color: ${props => props.theme.midnightBlue};
  padding: 15px 30vw;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Host = () => {
  const db = useDb();
  const allPlayers = useDbValue('users');
  const currentQuestion = useDbValue('currentQuestion');

  const nextPlayer = getNextPlayer(allPlayers);

  const resetPlayers = () => {
    db.ref('users').set(generateResettedPlayers(allPlayers));
  };

  const markAsCorrect = () => {
    db.ref()
      .update({
        [`users/${nextPlayer.key}/buzzedAt`]: null,
        [`users/${nextPlayer.key}/score`]: (nextPlayer.score || 0) + 1,
        currentQuestion: currentQuestion + 1,
      })
      .then(resetPlayers());
  };

  const markAsIncorrect = () => {
    db.ref(`users/${nextPlayer.key}`).update({
      buzzedAt: null,
      incorrect: true,
    });
  };

  const nextQuestion = () => {
    db.ref('currentQuestion')
      .set(currentQuestion + 1)
      .then(resetPlayers());
  };

  if (nextPlayer) {
    return (
      <Wrapper hasPlayer>
        <PlayerName>
          <NameText>{nextPlayer.username}</NameText>
        </PlayerName>
        <AnswerButtons>
          <IncorrectButton onClick={markAsIncorrect}>
            <MdClear />
          </IncorrectButton>
          <CorrectButton onClick={markAsCorrect}>
            <MdCheck />
          </CorrectButton>
        </AnswerButtons>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <NoPlayer>
        No player for question {currentQuestion}
        <br />
        {_.size(allPlayers)} total players
        <br />
        {getEligiblePlayers(allPlayers).length} players can still answer
      </NoPlayer>
      <DeclineButtons>
        <NextQuestionButton onClick={nextQuestion}>
          <MdSkipNext />
        </NextQuestionButton>
        <NextQuestionButton onClick={resetPlayers}>
          <MdCached />
        </NextQuestionButton>
      </DeclineButtons>
    </Wrapper>
  );
};

export default Host;
