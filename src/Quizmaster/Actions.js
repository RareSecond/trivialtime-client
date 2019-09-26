import React from 'react';
import styled from 'styled-components';
import { MdSkipNext, MdCached, MdUpdate } from 'react-icons/md';
import useDb from '../Data/useDb';
import { generateResettedPlayers } from '../playerFunctions';
import useDbValue from '../Data/useDbValue';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
`;

const Button = styled.div`
  border-radius: 10px;
  padding: 15px 15vw;
  font-size: 2em;
  color: ${props => props.theme.clouds};
  padding: 15px 30vw;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NextQuestionButton = styled(Button)`
  background-color: ${props => props.theme.midnightBlue};
`;

const ResetButton = styled(NextQuestionButton)`
  background-color: ${props => props.theme.alizarin};
`;

const Actions = ({ noOneLeft }) => {
  const db = useDb();
  const currentQuestion = useDbValue('currentQuestion');

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

  const nextQuestion = () => {
    db.ref('currentQuestion')
      .set(currentQuestion + 1)
      .then(resetPlayers());
  };

  const resetFull = () => {
    // eslint-disable-next-line no-restricted-globals
    const wantsToDelete = confirm(
      'Zeker dat je alle spelers en scores wilt verwijderen?'
    );
    if (wantsToDelete) {
      db.ref().update({
        users: null,
        currentQuestion: 1,
        quizDay: 1,
        quizOngoing: false,
      });
    }
  };

  return (
    <Wrapper>
      <NextQuestionButton onClick={nextQuestion}>
        <MdSkipNext />
      </NextQuestionButton>
      {!noOneLeft && (
        <>
          <NextQuestionButton onClick={resetPlayers}>
            <MdUpdate />
          </NextQuestionButton>
          <ResetButton onClick={resetFull}>
            <MdCached />
          </ResetButton>
        </>
      )}
    </Wrapper>
  );
};

export default Actions;
