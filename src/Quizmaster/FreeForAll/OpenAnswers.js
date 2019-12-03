import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import useDb from '../../Data/useDb';
import FullWidthButton from '../../Components/FullWidthButton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const OpenAnswers = () => {
  const db = useDb();

  return (
    <Wrapper>
      <FullWidthButton
        bgColor="turquoise"
        onClick={() => {
          db.ref('answersStart').set(dayjs().valueOf());
        }}
      >
        Open answers
      </FullWidthButton>
    </Wrapper>
  );
};

export default OpenAnswers;
