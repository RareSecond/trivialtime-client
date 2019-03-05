import React from 'react';
import styled from 'styled-components';
import { database } from 'firebase';
import useDb from './useDb';

const Wrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Buzzer = styled.img`
  width: 100%;
  filter: grayscale(${props => (props.isPressed ? 0 : '0.7')});
`;

const Player = ({ buzzed, incorrect }) => {
  const db = useDb();

  const buzz = () => {
    if (!incorrect && !buzzed) {
      const userKey = localStorage.getItem('userKey');
      db.ref(`users/${userKey}`).update({
        buzzedAt: database.ServerValue.TIMESTAMP,
      });
    }
  };

  return (
    <Wrapper>
      <Buzzer
        onClick={buzz}
        src="https://lh3.ggpht.com/Cll38pXB-_q861syyIhVDj54sl9j8ZZvH4V_41bXoVZffeW6dYklj1lp63pv7gtZi-o"
        isPressed={buzzed}
      />
    </Wrapper>
  );
};

export default Player;
