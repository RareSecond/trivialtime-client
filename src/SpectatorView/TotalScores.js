import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { ResponsiveLine } from '@nivo/line';
import BlockTitle from '../Components/BlockTitle';
import BlockContent from '../Components/BlockContent';
import BlockWrapper from '../Components/BlockWrapper';

const Wrapper = styled(BlockWrapper)`
  grid-column: 1 / span 6;
  grid-row: 4 / span 2;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 27vh;
`;

const TotalScores = ({ players }) => {
  const scoresData = _.map(players, player => {
    return {
      id: player.username,
      data: _.map(player.scores, (score, index) => ({
        x: index + 1,
        y: score,
      })),
    };
  });
  return (
    <Wrapper>
      <BlockTitle>Total Scores</BlockTitle>
      <BlockContent>
        <ChartWrapper>
          <ResponsiveLine
            data={scoresData}
            margin={{ top: 30, right: 70, bottom: 20, left: 20 }}
            pointSize={10}
            pointBorderWidth={10}
            enableGridX={false}
            enableGridY={false}
            enablePointLabel
            axisLeft={null}
            axisBottom={null}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
              },
            ]}
          />
        </ChartWrapper>
      </BlockContent>
    </Wrapper>
  );
};

export default TotalScores;
