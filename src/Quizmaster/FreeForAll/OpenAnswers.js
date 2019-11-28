import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import useDb from '../../Data/useDb';

const Button = styled.div`
  background-color: green;
`;

const OpenAnswers = () => {
  const db = useDb();

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
