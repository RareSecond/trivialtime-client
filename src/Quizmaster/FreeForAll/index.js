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
`;

const FreeForAll = () => {
  const { answeredPlayers, activePlayers } = usePlayers();
  const answersStart = useDbValue('answersStart');

  const allPlayersAnswered = answeredPlayers.length === activePlayers.length;

  if (!answersStart) {
    return (
      <Wrapper>
        <OpenAnswers />
      </Wrapper>
    );
  }

  if (answersStart && !allPlayersAnswered) {
    return <CountdownBar />;
  }

  return (
    <Wrapper>
      <MarkPlayers answeredPlayers={answeredPlayers} />
      <StartNextQuestion />
    </Wrapper>
  );

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
