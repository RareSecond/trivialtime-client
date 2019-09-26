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

export const getActivePlayers = players => {
  return _.filter(players, 'active');
};

export const getEligiblePlayers = players => {
  return _.filter(toArray(getActivePlayers(players)), player => {
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

export const getPlayersByTodayScore = players => {
  return _.orderBy(
    _.filter(toArray(players), player => {
      const lastScoreIndex = player.scores.length - 1;
      return (
        player.scores[lastScoreIndex] - player.scores[lastScoreIndex - 1] > 0
      );
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
