import useDbValue from './useDbValue';
import {
  getNextPlayer,
  getActivePlayers,
  getAnsweredPlayers,
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
  };
};

export default usePlayers;
