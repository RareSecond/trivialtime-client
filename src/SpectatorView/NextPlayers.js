import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import BlockTitle from '../BlockTitle';
import BlockContent from '../BlockContent';
import BlockWrapper from '../BlockWrapper';

const Wrapper = styled(BlockWrapper)`
  grid-column: 1 / span 3;
  grid-row: 2 / span 2;
  position: relative;
`;

const Player = styled.div`
  font-size: 6vh;
  color: ${props => props.theme.wetAsphalt};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${props => (!props.hasNoPlayers ? 1 : 0.3)};
`;

const ExtraPlayers = styled.div`
  position: absolute;
  right: 0px;
  bottom: -20px;
  font-size: 6vh;
  color: ${props => props.theme.wetAsphalt};
`;

const NextPlayers = ({ players }) => {
  const visibleNextPlayers = _.slice(players, 0, 4);
  const hiddenNextPlayers = _.slice(players, 4);
  const hasNextPlayers = _.size(visibleNextPlayers) > 0;

  return (
    <Wrapper>
      <BlockTitle>Next Players</BlockTitle>
      <BlockContent noCenter>
        {hasNextPlayers ? (
          _.map(visibleNextPlayers, player => (
            <Player key={player.username}>{player.username}</Player>
          ))
        ) : (
          <Player hasNoPlayers>none</Player>
        )}
        {_.size(hiddenNextPlayers) > 0 && (
          <ExtraPlayers>+{hiddenNextPlayers.length}</ExtraPlayers>
        )}
      </BlockContent>
    </Wrapper>
  );
};

export default NextPlayers;
