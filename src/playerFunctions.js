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

export const getBuzzedPlayers = players => {
  return _.orderBy(
    _.filter(toArray(players), player => {
      return player.buzzedAt;
    }),
    ['buzzedAt'],
    ['asc']
  );
};

export const getPlayersByScore = players => {
  return _.orderBy(
    _.filter(toArray(players), player => {
      return player.score > 0;
    }),
    ['score'],
    ['desc']
  );
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

export const generateNewQuizDayPlayers = players => {
  const newPlayers = {};

  _.forEach(players, (player, key) => {
    newPlayers[key] = {
      ...player,
      active: false,
      scores: [...player.scores, player.scores[player.scores.length - 1]],
    };
  });

  return newPlayers;
};
