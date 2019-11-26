import React, { useState } from 'react';
import styled from 'styled-components';
import useDb from '../../Data/useDb';

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

  const saveAnswer = () => {
    db.ref(`users/${userKey}`).update({
      answer,
    });
  };

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
