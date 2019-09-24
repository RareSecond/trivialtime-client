import React from 'react';
import styled from 'styled-components';
import { MdPowerSettingsNew } from 'react-icons/md';
import useDb from '../Data/useDb';

const Wrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.clouds};
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const NextQuestionButton = styled.div`
  border-radius: 10px;
  padding: 15px 15vw;
  font-size: 2em;
  color: ${props => props.theme.clouds};
  background-color: ${props => props.theme.midnightBlue};
  padding: 15px;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(MdPowerSettingsNew)`
  margin-right: 10px;
`;

const StartQuiz = () => {
  const db = useDb();

  const startQuiz = () => {
    db.ref('quizOngoing').set(1);
  };

  return (
    <Wrapper>
      <NextQuestionButton onClick={startQuiz}>
        <Icon />
        Start quiz
      </NextQuestionButton>
    </Wrapper>
  );
};

export default StartQuiz;
