import React, { useState } from 'react';
import styled from 'styled-components';
import { MdPoll } from 'react-icons/md';
import BarScores from '../../SpectatorView/FreeForAll/BarScores';
import usePlayers from '../../Data/usePlayers';

const Wrapper = styled.div``;

const ScoreIconWrapper = styled.div`
  z-index: 20;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
`;

const ScoreIcon = styled(MdPoll)`
  color: ${props => props.theme.turquoise};
  font-size: 40px;
`;

const ScoreWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.75);
`;

const Scores = () => {
  const { playersByScore } = usePlayers();
  const [scoresVisible, setScoresVisible] = useState(false);

  return (
    <Wrapper>
      {scoresVisible && (
        <ScoreWrapper>
          <BarScores players={playersByScore} />
        </ScoreWrapper>
      )}
      <ScoreIconWrapper>
        <ScoreIcon
          onTouchStart={() => setScoresVisible(true)}
          onTouchEnd={() => setScoresVisible(false)}
        />
      </ScoreIconWrapper>
    </Wrapper>
  );
};

export default Scores;
