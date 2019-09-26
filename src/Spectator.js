import React from 'react';
import styled from 'styled-components';
import TodayScores from './SpectatorView/TodayScores';
import CurrentPlayer from './SpectatorView/CurrentPlayer';
import EligiblePlayers from './SpectatorView/EligiblePlayers';
import TotalPlayers from './SpectatorView/TotalPlayers';
import CurrentQuestion from './SpectatorView/CurrentQuestion';
import NextPlayers from './SpectatorView/NextPlayers';
import TotalScores from './SpectatorView/TotalScores';
import {
  getEligiblePlayers,
  getBuzzedPlayers,
  getPlayersByTodayScore,
} from './playerFunctions';
import useDbValue from './Data/useDbValue';

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 100px 5%;
  width: 100%;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 18% 18% 18% 18% 18%;
  grid-column-gap: 50px;
  grid-row-gap: 2.5%;
  justify-items: stretch;
`;

const Spectator = () => {
  const players = useDbValue('users') || [];
  const eligibilePlayers = getEligiblePlayers(players);
  const [currentPlayer, ...nextPlayers] = getBuzzedPlayers(players);
  const playersByScore = getPlayersByTodayScore(players);

  return (
    <Wrapper>
      <CurrentPlayer player={currentPlayer} />
      <EligiblePlayers players={eligibilePlayers} />
      <TotalPlayers players={players} />
      <CurrentQuestion />
      <NextPlayers players={nextPlayers} />
      <TodayScores lePlayers={playersByScore} />
      <TotalScores players={players} />
    </Wrapper>
  );
};

export default Spectator;
