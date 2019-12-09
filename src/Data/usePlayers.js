import useDbValue from './useDbValue';
import {
  getNextPlayer,
  getActivePlayers,
  getAnsweredPlayers,
  getPlayersByTotalScore,
} from '../playerFunctions';

const usePlayers = () => {
  const allPlayers = useDbValue('users');

  return {
    allPlayers,
    buzzedPlayers: [],
    currentPlayer: getNextPlayer(allPlayers),
    eligibilePlayers: [],
    activePlayers: getActivePlayers(allPlayers),
    answeredPlayers: getAnsweredPlayers(allPlayers),
    playersByScore: getPlayersByTotalScore(allPlayers),
  };
};

export default usePlayers;
