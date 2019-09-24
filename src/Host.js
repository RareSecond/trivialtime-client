import React from 'react';
import styled from 'styled-components';
import {
  MdCheck,
  MdClear,
  MdSkipNext,
  MdCached,
  MdUpdate,
} from 'react-icons/md';
import _ from 'lodash';
import useDbValue from './Data/useDbValue';
import useDb from './Data/useDb';
import { generateResettedPlayers, getEligiblePlayers } from './playerFunctions';
import usePlayers from './Data/usePlayers';

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

const ResetButton = styled(NextQuestionButton)`
  background-color: ${props => props.theme.alizarin};
`;

const Host = () => {
  const db = useDb();
  const currentQuestion = useDbValue('currentQuestion');
  const quizOngoing = useDbValue('quizOngoing');
  const { allPlayers, currentPlayer } = usePlayers();

  const resetPlayers = () => {
    // We have to first get the players here again,
    // because the realtime update might not have come through before resetting
    // e.g. increasing the score and then calling this function, will still
    // have the old player's score
    db.ref('users').once('value', snapshot => {
      const players = snapshot.val();
      db.ref('users').set(generateResettedPlayers(players));
    });
  };

  const resetFull = () => {
    const wantsToDelete = confirm(
      'Zeker dat je alle spelers en scores wilt verwijderen?'
    );
    if (wantsToDelete) {
      db.ref().update({ users: null, currentQuestion: 1 });
    }
  };

  const markAsCorrect = () => {
    db.ref()
      .update({
        [`users/${currentPlayer.key}/buzzedAt`]: null,
        [`users/${currentPlayer.key}/score`]: (currentPlayer.score || 0) + 1,
        currentQuestion: currentQuestion + 1,
      })
      .then(resetPlayers());
  };

  const markAsIncorrect = () => {
    db.ref(`users/${currentPlayer.key}`).update({
      buzzedAt: null,
      incorrect: true,
    });
  };

  const nextQuestion = () => {
    db.ref('currentQuestion')
      .set(currentQuestion + 1)
      .then(resetPlayers());
  };

  // if (!quizOngoing) {
  //   return <StartQuiz />;
  // }

  if (currentPlayer) {
    return (
      <Wrapper hasPlayer>
        <PlayerName>
          <NameText>{currentPlayer.username}</NameText>
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
          <MdUpdate />
        </NextQuestionButton>
        <ResetButton onClick={resetFull}>
          <MdCached />
        </ResetButton>
      </DeclineButtons>
    </Wrapper>
  );
};

export default Host;
