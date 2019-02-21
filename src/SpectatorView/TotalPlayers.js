import React from 'react';
import styled from 'styled-components';
import BlockTitle from '../BlockTitle';
import BlockContent from '../BlockContent';
import BlockWrapper from '../BlockWrapper';
import ContentText from '../ContentText';

const Wrapper = styled(BlockWrapper)`
  grid-column: 5 / span 1;
  grid-row: 1 / span 1;
`;

const TotalPlayers = ({ players }) => (
  <Wrapper>
    <BlockTitle>Total Players</BlockTitle>
    <BlockContent center>
      <ContentText>{players.length}</ContentText>
    </BlockContent>
  </Wrapper>
);

export default TotalPlayers;
