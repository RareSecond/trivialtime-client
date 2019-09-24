import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { getEligiblePlayers } from '../playerFunctions';
import Actions from './Actions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.clouds};
  width: 100%;
  padding: 20px;
`;

const PlayerName = styled.div`
  color: ${props => props.theme.clouds};
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled(PlayerName)`
  color: ${props => props.theme.midnightBlue};
  text-transform: uppercase;
  text-align: center;
`;

const NoPlayer = ({ allPlayers, currentQuestion }) => {
  return (
    <Wrapper>
      <Info>
        No player for question {currentQuestion}
        <br />
        {_.size(allPlayers)} total players
        <br />
        {getEligiblePlayers(allPlayers).length} players can still answer
      </Info>
      <Actions />
    </Wrapper>
  );
};

export default NoPlayer;
