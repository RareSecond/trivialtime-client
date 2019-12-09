import React from 'react';
import styled from 'styled-components';
import AnswerInput from './AnswerInput';
import useDbValue from '../../Data/useDbValue';
import CountdownBar from '../../Quizmaster/FreeForAll/CountdownBar';
import Loader from '../../Components/Loader';
import Box from '../../Components/Box';
import Scores from './Scores';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const MyBox = styled(Box)`
  transform: rotateY(${props => (props.isMarked ? 180 : 0)}deg);
  transition: all 0.4s;
  background-color: ${props =>
    props.isMarked
      ? props.correct
        ? props.theme.turquoise
        : props.theme.alizarin
      : props.theme.clouds};
`;

const InnerWrapper = styled.div`
  transform: rotateY(${props => (props.isMarked ? -180 : 0)}deg);
  transition: all 0.4s;
`;

const BoxMessage = styled.div`
  margin: 10px 0;
  text-align: center;
  color: ${props => props.theme.turquoise};
`;

const ResultMessage = styled.div`
  margin: 10px 0;
  text-align: center;
  font-size: 30px;
  color: ${props => props.theme.clouds};
`;

const FreeForAll = ({ userKey = '-Lu2DGB6P1FS9KxGaBbw' }) => {
  const currentPlayer = useDbValue(`users/${userKey}`);
  const answersOpen = useDbValue('answersOpen');
  const answersClosed = useDbValue('answersClosed');

  if (!currentPlayer) {
    return null;
  }

  if (currentPlayer.answer) {
    if (currentPlayer.answerCorrect !== undefined) {
      if (currentPlayer.answerCorrect) {
        return (
          <Wrapper>
            <MyBox padding={50} isMarked correct>
              <InnerWrapper isMarked>
                <ResultMessage>Correct!</ResultMessage>
              </InnerWrapper>
            </MyBox>
            <Scores />
          </Wrapper>
        );
      }

      return (
        <Wrapper>
          <MyBox padding={50} isMarked>
            <InnerWrapper isMarked>
              <ResultMessage>Incorrect..</ResultMessage>
            </InnerWrapper>
          </MyBox>
          <Scores />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <MyBox padding={50}>
          <InnerWrapper>
            <Loader type="players" />
            <BoxMessage>Awaiting results</BoxMessage>
          </InnerWrapper>
        </MyBox>
        <Scores />
      </Wrapper>
    );
  }

  if (answersClosed) {
    return (
      <Wrapper>
        <CountdownBar />
        <Scores />
      </Wrapper>
    );
  }

  if (answersOpen) {
    return (
      <Wrapper>
        <CountdownBar />
        <AnswerInput userKey={userKey} />
        <Scores />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Box padding={50}>
        <Loader type="quizmaster" />
        <BoxMessage>Waiting for quizmaster</BoxMessage>
      </Box>
      <Scores />
    </Wrapper>
  );
};

export default FreeForAll;
