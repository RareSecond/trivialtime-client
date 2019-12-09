import React from 'react';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Wrapper = styled.div`
  margin: 10px 0;
`;

const TimerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerValue = styled.div`
  font-size: 50px;
`;

const TimerText = styled.div`
  max-width: 360px;
  text-align: center;
  font-size: 16px;
`;

const renderTime = value => {
  if (value === 0) {
    return <TimerText>Te laat...</TimerText>;
  }

  return (
    <TimerInfo>
      <TimerValue>{value}</TimerValue>
      <TimerText>seconden</TimerText>
    </TimerInfo>
  );
};

const CountdownBar = () => {
  return (
    <Wrapper>
      <CountdownCircleTimer
        isPlaying
        durationSeconds={20}
        colors={[['#1abc9c']]}
        renderTime={renderTime}
        onComplete={() => [false, 1000]}
      />
    </Wrapper>
  );
};

export default CountdownBar;
