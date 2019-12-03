import React from 'react';
import styled from 'styled-components';
import AnswerInput from './AnswerInput';
import useDbValue from '../../Data/useDbValue';
import CountdownBar from '../../Quizmaster/FreeForAll/CountdownBar';
import Loader from '../../Components/Loader';
import Box from '../../Components/Box';

const Wrapper = styled.div`
  width: 100%;
`;

const BoxMessage = styled.div`
  margin: 10px 0;
  color: ${props => props.theme.turquoise};
  text-align: center;
`;

const FreeForAll = ({ userKey = '-Lu2DGB6P1FS9KxGaBbw' }) => {
  const currentPlayer = useDbValue(`users/${userKey}`);
  const answersStart = useDbValue('answersStart');

  return (
    <Wrapper>
      {answersStart ? (
        <>
          <CountdownBar />
          {currentPlayer.answer ? (
            <Box padding={50}>
              <Loader />
              <BoxMessage>Waiting for quizmaster</BoxMessage>
              <BoxMessage>
                Your last answer was{' '}
                {currentPlayer.answerCorrect ? 'correct' : 'incorrect'}
              </BoxMessage>
            </Box>
          ) : (
            <AnswerInput userKey={userKey} />
          )}
        </>
      ) : (
        <Box padding={50}>
          <Loader />
          <BoxMessage>Waiting for quizmaster</BoxMessage>
        </Box>
      )}
    </Wrapper>
  );
};

export default FreeForAll;
