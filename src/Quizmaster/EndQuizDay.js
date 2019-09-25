import React from 'react';
import styled from 'styled-components';
import usePlayers from '../Data/usePlayers';
import { generateNewQuizDayPlayers } from '../playerFunctions';
import useDb from '../Data/useDb';
import useDbValue from '../Data/useDbValue';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.theme.clouds};
  width: 100%;
  padding: 20px;
`;

const Button = styled.div`
  border-radius: 10px;
  font-size: 2em;
  color: ${props => props.theme.clouds};
  background-color: ${props => props.theme.alizarin};
  padding: 15px;
  margin-bottom: 5px;
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EndQuizDay = () => {
  const db = useDb();
  const { allPlayers } = usePlayers();
  const quizDay = useDbValue('quizDay');

  const endQuizDay = () => {
    db.ref('users').set(generateNewQuizDayPlayers(allPlayers));
    db.ref('quizDay').set(quizDay + 1);
  };

  return (
    <Wrapper>
      <Button onClick={endQuizDay}>End quiz day</Button>
    </Wrapper>
  );
};

export default EndQuizDay;
