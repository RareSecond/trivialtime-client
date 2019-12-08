import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import OpenAnswers from './OpenAnswers';
import CountdownBar from './CountdownBar';
import usePlayers from '../../Data/usePlayers';
import MarkPlayers from './MarkPlayers';
import useDbValue from '../../Data/useDbValue';
import StartNextQuestion from './StartNextQuestion';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 10px;
`;

const FreeForAll = () => {
  const { answeredPlayers } = usePlayers();
  const answersStart = useDbValue('answersStart');

  if (!answersStart) {
    return (
      <Wrapper>
        <OpenAnswers />
      </Wrapper>
    );
  }

  if (answersStart) {
    return (
      <Wrapper>
        <CountdownBar />
        <MarkPlayers answeredPlayers={answeredPlayers} />
        <StartNextQuestion />
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
