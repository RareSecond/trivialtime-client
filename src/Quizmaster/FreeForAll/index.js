import React from 'react';
import styled from 'styled-components';
import OpenAnswers from './OpenAnswers';
import CountdownBar from './CountdownBar';

const Wrapper = styled.div`
  width: 100%;
`;

const FreeForAll = () => {
  return (
    <Wrapper>
      <OpenAnswers />
      <CountdownBar />
    </Wrapper>
  );
};

export default FreeForAll;
