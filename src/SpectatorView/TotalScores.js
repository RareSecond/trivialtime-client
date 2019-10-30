import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { ResponsiveLine } from '@nivo/line';
import BlockTitle from '../Components/BlockTitle';
import BlockContent from '../Components/BlockContent';
import BlockWrapper from '../Components/BlockWrapper';
import { getPlayersByTotalScore } from '../playerFunctions';

const Wrapper = styled(BlockWrapper)`
  grid-column: 1 / span 6;
  grid-row: 4 / span 2;
`;

const RowBlockContent = styled(BlockContent)`
  flex-direction: row;
`;

const ChartWrapper = styled.div`
  width: 70%;
  height: 27vh;
`;

const TooltipWrapper = styled.div`
  background-color: white;
  padding: 10px;
  box-shadow: 7px 7px 0px #bdc3c7;
  border-radius: 10px;
`;

const Scores = styled.div`
  width: 30%;
  align-self: flex-start;
  padding: 20px;
`;

const PlayerScore = styled.div`
  color: ${props => props.theme.midnightBlue};
  font-size: 20px;
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
      <RowBlockContent>
        <ChartWrapper>
          <ResponsiveLine
            data={scoresData}
            margin={{ top: 30, right: 20, bottom: 20, left: 20 }}
            pointSize={10}
            pointBorderWidth={10}
            enableGridX={false}
            enableGridY={false}
            enablePointLabel
            axisLeft={null}
            axisBottom={null}
            colors={{ scheme: 'set3' }}
            tooltip={data => {
              const yCoord = data.point.data.y;
              const xCoord = data.point.data.x;
              const playersWithCurrentScore = _.filter(players, player => {
                return player.scores[xCoord - 1] === yCoord;
              });
              return (
                <TooltipWrapper>
                  {playersWithCurrentScore.map(player => (
                    <div key={player.username}>{player.username}</div>
                  ))}
                </TooltipWrapper>
              );
            }}
            useMesh
          />
        </ChartWrapper>
        <Scores>
          {_.map(getPlayersByTotalScore(players), player => (
            <PlayerScore key={player.username}>
              {player.score} - {player.username}
            </PlayerScore>
          ))}
        </Scores>
      </RowBlockContent>
    </Wrapper>
  );
};

export default TotalScores;
