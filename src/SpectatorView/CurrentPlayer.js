import React from 'react';
import styled from 'styled-components';
import BlockTitle from '../Components/BlockTitle';
import BlockContent from '../Components/BlockContent';
import BlockWrapper from '../Components/BlockWrapper';
import ContentText from '../Components/ContentText';

const Wrapper = styled(BlockWrapper)`
  grid-column: 1 / span 3;
  grid-row: 1 / span 1;
`;

const PlayerName = styled(ContentText)`
  opacity: ${props => (props.hasPlayer ? 1 : 0.3)};
`;

const CurrentPlayer = ({ player }) => {
  let username = '';
  if (player) {
    username = player.username;
  } else {
    username = 'none';
  }

  return (
    <Wrapper>
      <BlockTitle>Current player</BlockTitle>
      <BlockContent noCenter center>
        <PlayerName hasPlayer={!!player}>{username}</PlayerName>
      </BlockContent>
    </Wrapper>
  );
};

export default CurrentPlayer;
