import React from 'react';
import styled from 'styled-components';
import BlockTitle from '../Components/BlockTitle';
import BlockContent from '../Components/BlockContent';
import BlockWrapper from '../Components/BlockWrapper';
import ContentText from '../Components/ContentText';

const Wrapper = styled(BlockWrapper)`
  grid-column: 4 / span 1;
  grid-row: 1 / span 1;
`;

const EligiblePlayers = ({ players }) => (
  <Wrapper>
    <BlockTitle>Eligible Players</BlockTitle>
    <BlockContent center>
      <ContentText>{players.length}</ContentText>
    </BlockContent>
  </Wrapper>
);

export default EligiblePlayers;
