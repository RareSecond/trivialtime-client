import React from 'react';
import styled from 'styled-components';
import AnswerInput from './AnswerInput';
import useDbValue from '../../Data/useDbValue';
import CountdownBar from '../../Quizmaster/FreeForAll/CountdownBar';

const Wrapper = styled.div`
  width: 100%;
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
            <div>Waiting for other players</div>
          ) : (
            <AnswerInput userKey={userKey} />
          )}
        </>
      ) : (
        <div>Waiting for quizmaster</div>
      )}
    </Wrapper>
  );
};

export default FreeForAll;
