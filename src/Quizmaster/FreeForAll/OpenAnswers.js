import React, { useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import useDb from '../../Data/useDb';
import useDbValue from '../../Data/useDbValue';

const Button = styled.div`
  background-color: green;
`;

const OpenAnswers = () => {
  const db = useDb();
  const answersStart = useDbValue('answersStart');

  useEffect(
    () => {
      const msToAnswer = 1000 * 20;
      const closeAnswersIn = answersStart + msToAnswer - dayjs().valueOf();

      const timeout = setTimeout(() => {
        db.ref('answersStart').remove();
      }, closeAnswersIn);

      return () => clearTimeout(timeout);
    },
    [answersStart]
  );

  return (
    <>
      <Button
        onClick={() => {
          db.ref('answersStart').set(dayjs().valueOf());
        }}
      >
        Open answers
      </Button>
    </>
  );
};

export default OpenAnswers;
