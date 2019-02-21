import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import constants from '../constants';
import usePusher from '../usePusher';
import BlockTitle from '../BlockTitle';
import BlockContent from '../BlockContent';
import BlockWrapper from '../BlockWrapper';

const Wrapper = styled(BlockWrapper)`
  grid-column: 4 / span 3;
  grid-row: 2 / span 2;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 25vh;
`;

const chartColors = [
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
];

const TodayScores = ({ lePlayers }) => {
  const [players, updatePlayers] = useState([]);
  const fetchPlayers = useCallback(() => {
    axios({
      method: 'get',
      url: `${constants.apiUrl}/players`,
    }).then(response => {
      updatePlayers(response.data);
    });
  });
  useEffect(fetchPlayers, []);

  usePusher(fetchPlayers);

  const playersWithPositiveScore = _.filter(
    players,
    player => player.score > 0
  );
  const chartData = _.orderBy(
    _.map(lePlayers, player => {
      return {
        score: player.score,
        name: player.username,
      };
    }),
    ['score'],
    ['asc']
  );

  return (
    <Wrapper>
      <BlockTitle>Today's Score</BlockTitle>
      <BlockContent>
        <ChartWrapper>
          <ResponsiveBar
            data={chartData}
            indexBy="name"
            keys={['score']}
            layout="horizontal"
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 75,
            }}
            groupMode="grouped"
            colorBy={a => {
              return chartColors[a.index] || '#000';
            }}
            enableGridY={false}
            axisBottom={false}
          />
        </ChartWrapper>
      </BlockContent>
    </Wrapper>
  );
};

export default TodayScores;
