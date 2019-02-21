import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';
import constants from './constants';
import usePusher from './usePusher';

const usePlayers = () => {
  const [players, updatePlayers] = useState([]);
  const fetchPlayers = useCallback(() => {
    axios({
      method: 'get',
      url: `${constants.apiUrl}`,
    }).then(response => {
      updatePlayers(response.data);
    });
  });
  useEffect(fetchPlayers, []);

  usePusher('players-update', fetchPlayers);

  const buzzedPlayers = _.orderBy(
    _.filter(players, player => {
      return player.order > 0;
    }),
    ['order'],
    ['asc']
  );

  const eligibilePlayers = _.filter(players, player => {
    return player.order === 0;
  });

  const currentPlayer = buzzedPlayers[0] || null;

  return {
    allPlayers: players,
    buzzedPlayers,
    currentPlayer,
    eligibilePlayers,
  };
};

export default usePlayers;
