import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import Loader from './Loader';
import Scores from '../Player/FreeForAll/Scores';
import QuestionInfo from '../Player/QuestionInfo';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const BoxMessage = styled.div`
  margin: 10px 0;
  text-align: center;
  color: ${props => props.theme.turquoise};
`;

const StatusBox = ({ type, text }) => {
  return (
    <Wrapper>
      <Box padding={50}>
        <Loader type={type} />
        <BoxMessage>{text}</BoxMessage>
      </Box>
      <Scores />
      <QuestionInfo />
    </Wrapper>
  );
};

export default StatusBox;
