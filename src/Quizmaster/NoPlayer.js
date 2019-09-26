import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { MdPerson, MdQuestionAnswer } from 'react-icons/md';
import { getEligiblePlayers, getActivePlayers } from '../playerFunctions';
import Actions from './Actions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.noOneLeft ? props.theme.alizarin : props.theme.clouds};
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
  color: ${props =>
    props.noOneLeft ? props.theme.clouds : props.theme.midnightBlue};
  text-transform: uppercase;
  text-align: center;
  position: relative;
`;

const TotalPlayers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  font-size: 1.6em;
`;

const CurrentQuestion = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 1.6em;
`;

const NoPlayer = ({ allPlayers, currentQuestion }) => {
  const amountOfPlayersLeft = getEligiblePlayers(allPlayers).length;
  const totalPlayers = getActivePlayers(allPlayers).length;
  const noOneLeft = amountOfPlayersLeft === 0;

  return (
    <Wrapper noOneLeft={noOneLeft}>
      <Info noOneLeft={noOneLeft}>
        <TotalPlayers>
          <MdPerson />
          {totalPlayers}
        </TotalPlayers>
        <CurrentQuestion>
          {currentQuestion}
          /6
          <MdQuestionAnswer />
        </CurrentQuestion>
        {!noOneLeft && (
          <>
            Awaiting player..
            <br />
            <br />
          </>
        )}
        {amountOfPlayersLeft} players can still answer
      </Info>
      <Actions noOneLeft={noOneLeft} />
    </Wrapper>
  );
};

export default NoPlayer;
