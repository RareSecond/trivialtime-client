import React, { useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import OpenAnswers from './OpenAnswers';
import CountdownBar from './CountdownBar';
import usePlayers from '../../Data/usePlayers';
import MarkPlayers from './MarkPlayers';
import useDbValue from '../../Data/useDbValue';
import StartNextQuestion from './StartNextQuestion';
import useDb from '../../Data/useDb';
import Scores from '../../Player/FreeForAll/Scores';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 10px;
`;

const FreeForAll = () => {
  const { answeredPlayers } = usePlayers();
  const answersOpen = useDbValue('answersOpen');

  const db = useDb();

  useEffect(
    () => {
      if (answersOpen) {
        const timeOut = setTimeout(() => {
          db.ref('answersClosed').set(true);
        }, 20 * 1000);

        return () => clearTimeout(timeOut);
      }
    },
    [answersOpen]
  );

  if (!answersOpen) {
    return (
      <Wrapper>
        <OpenAnswers />
        <Scores />
      </Wrapper>
    );
  }

  if (answersOpen) {
    return (
      <Wrapper>
        <CountdownBar />
        <MarkPlayers answeredPlayers={answeredPlayers} />
        <StartNextQuestion />
        <Scores />
      </Wrapper>
    );
  }

  // return (
  //   <Wrapper>
  //     {answersStart && !allPlayersAnswered ? (
  //       <CountdownBar />
  //     ) : (
  //       answeredPlayers.length > 0 && (
  //         <>
  //           <MarkPlayers answeredPlayers={answeredPlayers} />
  //           <StartNextQuestion />
  //         </>
  //       )
  //     )}
  //   </Wrapper>
  // );
};

export default FreeForAll;
