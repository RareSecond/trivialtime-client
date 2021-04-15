import React from 'react';
import styled from 'styled-components';
import { MdCheck, MdClear } from 'react-icons/md';
import useDbValue from '../Data/useDbValue';
import useDb from '../Data/useDb';
import { generateResettedPlayers } from '../playerFunctions';
import usePlayers from '../Data/usePlayers';
import NoPlayer from './NoPlayer';
import EndQuizDay from './EndQuizDay';
import StartQuiz from './StartQuiz';
import FreeForAll from './FreeForAll';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.midnightBlue};
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

const Host = () => {
  const db = useDb();
  const currentQuestion = useDbValue('currentQuestion');
  const quizOngoing = useDbValue('quizOngoing');
  const quizMode = useDbValue('quizMode');
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

  const markAsCorrect = () => {
    db.ref()
      .update({
        [`users/${currentPlayer.key}/buzzedAt`]: null,
        [`users/${currentPlayer.key}/score`]: (currentPlayer.score || 0) + 1,
        [`users/${currentPlayer.key}/scores/${currentPlayer.scores.length -
          1}`]:
          (currentPlayer.scores[currentPlayer.scores.length - 1] || 0) + 1,
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

  if (currentQuestion > QUESTIONSPERDAY) {
    return <EndQuizDay />;
  }

  if (!quizOngoing) {
    return <StartQuiz />;
  }

  if (quizMode === 'freeForAll') {
    return <FreeForAll />;
  }

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

  return <NoPlayer allPlayers={allPlayers} currentQuestion={currentQuestion} />;
};

export default Host;
