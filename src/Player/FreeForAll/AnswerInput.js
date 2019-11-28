import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import useDb from '../../Data/useDb';
import useDbValue from '../../Data/useDbValue';

const UsernameInput = styled.input`
  width: 100%;
  display: block;
  border: none;
  border: 2px solid ${props => props.theme.turquoise};
  padding: 5px;
  text-align: center;
  font-size: 10vw;
  font-family: 'Staatliches', cursive;
  color: ${props => props.theme.midnightBlue};
  max-height: 200px;
  overflow: auto;

  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  margin: 20px auto;
  background-color: ${props => props.theme.turquoise};
  width: 100%;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  font-size: 10vw;
  font-family: 'Staatliches', cursive;
  border-radius: 10px;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
`;

const AnswerInput = ({ userKey }) => {
  const [answer, setAnswer] = useState('');
  const db = useDb();
  const answersStart = useDbValue('answersStart');

  const saveAnswer = () => {
    db.ref(`users/${userKey}`).update({
      answer,
    });
  };

  useEffect(
    () => {
      if (answersStart) {
        const msToAnswer = 1000 * 20;
        const closeAnswersIn = answersStart + msToAnswer - dayjs().valueOf();

        const timeout = setTimeout(() => {
          db.ref(`users/${userKey}`).update({
            answer: ' ',
            answerCorrect: false,
          });
        }, closeAnswersIn);

        return () => clearTimeout(timeout);
      }
    },
    [answersStart]
  );

  return (
    <React.Fragment>
      <UsernameInput
        value={answer}
        placeholder="Your answer"
        onChange={e => setAnswer(e.target.value)}
      />
      <Button onClick={saveAnswer}>Verstuur</Button>
    </React.Fragment>
  );
};

export default AnswerInput;
