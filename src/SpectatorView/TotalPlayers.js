import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import BlockTitle from '../Components/BlockTitle';
import BlockContent from '../Components/BlockContent';
import BlockWrapper from '../Components/BlockWrapper';
import ContentText from '../Components/ContentText';

const Wrapper = styled(BlockWrapper)`
  grid-column: 5 / span 1;
  grid-row: 1 / span 1;
`;

const TotalPlayers = ({ players }) => (
  <Wrapper>
    <BlockTitle>Total Players</BlockTitle>
    <BlockContent center>
      <ContentText>{_.size(players)}</ContentText>
    </BlockContent>
  </Wrapper>
);

export default TotalPlayers;
