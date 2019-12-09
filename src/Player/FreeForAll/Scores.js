import React, { useState } from 'react';
import styled from 'styled-components';
import { MdPoll } from 'react-icons/md';
import BarScores from '../../SpectatorView/FreeForAll/BarScores';
import usePlayers from '../../Data/usePlayers';

const Wrapper = styled.div``;

const ScoreIcon = styled(MdPoll)`
  color: ${props =>
    props.scoresVisible ? props.theme.turquoise : props.theme.clouds};
  font-size: 30px;
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
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
      <ScoreIcon
        onTouchStart={() => setScoresVisible(true)}
        onTouchEnd={() => setScoresVisible(false)}
        scoresVisible
      />
    </Wrapper>
  );
};

export default Scores;
