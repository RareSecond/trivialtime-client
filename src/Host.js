import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MdCheck, MdClear, MdSkipNext } from 'react-icons/md';
import usePlayers from './usePlayers';
import usePusher from './usePusher';
import constants from './constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.hasPlayer ? props.theme.midnightBlue : props.theme.clouds};
  width: 100%;
  padding: 20px;
`;

const PlayerName = styled.div`
  color: ${props => props.theme.clouds};
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NameText = styled.div`
  font-size: 3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AnswerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0 0 auto;
`;

const Button = styled.div`
  border-radius: 10px;
  padding: 15px 15vw;
  font-size: 2em;
  color: ${props => props.theme.clouds};
`;

const CorrectButton = styled(Button)`
  background-color: ${props => props.theme.turquoise};
`;

const IncorrectButton = styled(Button)`
  background-color: ${props => props.theme.alizarin};
`;

const NoPlayer = styled(PlayerName)`
  color: ${props => props.theme.midnightBlue};
  text-transform: uppercase;
  text-align: center;
`;

const DeclineButtons = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
`;

const NextQuestionButton = styled(Button)`
  background-color: ${props => props.theme.midnightBlue};
  padding: 15px 30vw;
`;

const Host = () => {
  const markAsCorrect = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/correct`,
    });
  };

  const markAsIncorrect = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/incorrect`,
    });
  };

  const nextQuestion = () => {
    axios({
      method: 'post',
      url: `${constants.apiUrl}/next`,
    });
  };

  const players = usePlayers();
  const { currentPlayer } = players;
  useEffect(
    () => {
      if (currentPlayer && currentPlayer.username) {
        window.navigator.vibrate([150, 300, 100, 50, 500]);
      }
    },
    [currentPlayer]
  );

  const [question, setQuestion] = useState(1);

  usePusher('next-question', data => setQuestion(data.currentQuestion));

  if (currentPlayer) {
    return (
      <Wrapper hasPlayer>
        <PlayerName>
          <NameText>{currentPlayer.username}</NameText>
        </PlayerName>
        <AnswerButtons>
          <IncorrectButton onClick={markAsIncorrect}>
            <MdClear />
          </IncorrectButton>
          <CorrectButton onClick={markAsCorrect}>
            <MdCheck />
          </CorrectButton>
        </AnswerButtons>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <NoPlayer>
        No player for question {question}
        <br />
        {players.allPlayers.length} total players
        <br />
        {players.eligibilePlayers.length} players can still answer
      </NoPlayer>
      <DeclineButtons>
        <NextQuestionButton onClick={nextQuestion}>
          <MdSkipNext />
        </NextQuestionButton>
      </DeclineButtons>
    </Wrapper>
  );
};

export default Host;
