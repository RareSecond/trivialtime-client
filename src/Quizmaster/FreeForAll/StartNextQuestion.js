import React from 'react';
import useDb from '../../Data/useDb';
import { generateResettedPlayersFFA } from '../../playerFunctions';
import useDbValue from '../../Data/useDbValue';

const StartNextQuestion = () => {
  const db = useDb();
  const currentQuestion = useDbValue('currentQuestion');

  const startQuestion = () => {
    db.ref('answersStart').remove();
    db.ref('currentQuestion').set(currentQuestion + 1);

    // We have to first get the players here again,
    // because the realtime update might not have come through before resetting
    // e.g. increasing the score and then calling this function, will still
    // have the old player's score
    db.ref('users').once('value', snapshot => {
      const players = snapshot.val();
      db.ref('users').set(generateResettedPlayersFFA(players));
    });
  };
  return <button onClick={startQuestion}>Start next question</button>;
};

export default StartNextQuestion;
