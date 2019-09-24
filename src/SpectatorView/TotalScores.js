import React from 'react';
import styled from 'styled-components';
import BlockTitle from '../Components/BlockTitle';
import BlockContent from '../Components/BlockContent';
import BlockWrapper from '../Components/BlockWrapper';

const Wrapper = styled(BlockWrapper)`
  grid-column: 1 / span 6;
  grid-row: 4 / span 2;
`;

const TotalScores = () => (
  <Wrapper>
    <BlockTitle>Total Scores</BlockTitle>
    <BlockContent>COMING SOON</BlockContent>
  </Wrapper>
);

export default TotalScores;
