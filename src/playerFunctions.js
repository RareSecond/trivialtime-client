import _ from 'lodash';

export const toArray = players => {
  return _.map(players, (player, key) => {
    return {
      ...player,
      key,
    };
  });
};

export const getNextPlayer = players => {
  return _.minBy(toArray(players), 'buzzedAt');
};

export const getEligiblePlayers = players => {
  return _.filter(toArray(players), player => {
    return !player.incorrect && !player.buzzedAt;
  });
};

export const generateResettedPlayers = players => {
  const newPlayers = {};

  _.forEach(players, (player, key) => {
    newPlayers[key] = {
      ...player,
      incorrect: null,
      buzzedAt: null,
    };
  });

  return newPlayers;
};
