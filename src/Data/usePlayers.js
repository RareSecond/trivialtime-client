import useDbValue from './useDbValue';
import { getNextPlayer, getActivePlayers } from '../playerFunctions';

const usePlayers = () => {
  const allPlayers = useDbValue('users');

  return {
    allPlayers,
    buzzedPlayers: [],
    currentPlayer: getNextPlayer(allPlayers),
    eligibilePlayers: [],
    activePlayers: getActivePlayers(allPlayers),
  };
};

export default usePlayers;
