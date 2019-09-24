import useDbValue from './useDbValue';
import { getNextPlayer } from '../playerFunctions';

const usePlayers = () => {
  const allPlayers = useDbValue('users');

  return {
    allPlayers,
    buzzedPlayers: [],
    currentPlayer: getNextPlayer(allPlayers),
    eligibilePlayers: [],
  };
};

export default usePlayers;
