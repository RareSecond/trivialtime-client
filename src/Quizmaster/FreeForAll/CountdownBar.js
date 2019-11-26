import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import useDbValue from '../../Data/useDbValue';

const Bar = styled.div.attrs({
  style: ({ percentLeft }) => ({
    width: `${percentLeft}%`,
  }),
})`
  background-color: red;
  height: 20px;
`;

const CountdownBar = () => {
  const [percentLeft, setPercentLeft] = useState(100);
  const answersStart = useDbValue('answersStart');

  const animateBar = () => {
    const msToAnswer = 1000 * 20;
    const closeAnswersAt = answersStart + msToAnswer;
    const currentMiliseconds = dayjs().valueOf();
    if (currentMiliseconds < closeAnswersAt) {
      const currentPercentLeft =
        ((closeAnswersAt - currentMiliseconds) /
          (closeAnswersAt - answersStart)) *
        100;
      setPercentLeft(currentPercentLeft);
      requestAnimationFrame(animateBar);
    }
  };

  useEffect(
    () => {
      if (!answersStart) {
        setPercentLeft(0);
      } else {
        animateBar();
      }
    },
    [answersStart]
  );

  return <Bar percentLeft={percentLeft} />;
};

export default CountdownBar;
