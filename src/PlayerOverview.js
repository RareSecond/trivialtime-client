import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Pusher from 'pusher-js';
import styled from 'styled-components';
import constants from './constants';

const Header = styled.div`
  margin-bottom: -15px;
  text-align: center;
  text-transform: uppercase;
  font-size: 15vw;

  @media only screen and (min-width: 700px) {
    font-size: 50px;
  }

  font-family: 'Staatliches', cursive;
  color: #7fc6a4;
`;

const SubHeader = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 5vw;

  @media only screen and (min-width: 700px) {
    font-size: 20px;
  }

  font-family: 'Staatliches', cursive;
  color: #7fc6a4;
  margin-bottom: 15px;
`;

const PlayerCard = styled.div`
  margin-bottom: 10px;
  background-color: #a6d3a0;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  font-size: 7vw;
  font-family: 'Staatliches', cursive;

  @media only screen and (min-width: 700px) {
    font-size: 30px;
  }
`;

const ActivePlayer = styled(PlayerCard)`
  background-color: #a6d3a0;
`;

const InactivePlayer = styled(PlayerCard)`
  background-color: #808782;
`;

const WrongPlayers = styled(PlayerCard)`
  background-color: #a6d3a0;
  opacity: 0.5;
`;

const Score = styled.div`
  font-size: 0.5em;
  color: #656565;
`;

class PlayerOverview extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: `${constants.apiUrl}`,
    }).then(response => {
      this.setState({
        players: response.data,
      });
    });
    this.socket = new Pusher('d61e39bd8719a7ff7ea6', {
      cluster: 'eu',
    });
    this.channel = this.socket.subscribe('buzzer-channel');
    this.channel.bind('players-update', data => {
      this.setState({
        players: data.message,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const newPlayerOn1 = _.find(this.state.players, ['order', 1]);
    const oldPlayerOn1 = _.find(prevState.players, ['order', 1]);
    if (
      this.props.host &&
      newPlayerOn1 &&
      !oldPlayerOn1 &&
      _.size(prevState.players) > 0
    ) {
      new Audio(
        'http://soundbible.com/mp3/service-bell_daniel_simion.mp3'
      ).play();
    }
  }

  render() {
    const { players } = this.state;
    const { hideHeader } = this.props;

    const buzzedPlayers = _.filter(players, player => {
      return player.order > 0;
    });
    const inactivePlayers = _.filter(players, player => {
      return player.order === 0;
    });
    const wrongPlayers = _.filter(players, player => {
      return player.order === -1;
    });

    return (
      <div>
        {!hideHeader && <Header>Spelers</Header>}
        <SubHeader>
          {_.size(players)} speler
          {_.size(players) === 1 ? '' : 's'}
        </SubHeader>
        {_.map(_.orderBy(buzzedPlayers, ['order'], ['asc']), player => {
          return (
            <ActivePlayer key={player.username}>
              {player.username}
              <Score>Score: {player.score}</Score>
            </ActivePlayer>
          );
        })}
        {_.map(inactivePlayers, player => {
          return (
            <InactivePlayer key={player.username}>
              {player.username}
              <Score>Score: {player.score}</Score>
            </InactivePlayer>
          );
        })}
        {_.map(wrongPlayers, player => {
          return (
            <WrongPlayers key={player.username}>
              {player.username}
              <Score>Score: {player.score}</Score>
            </WrongPlayers>
          );
        })}
      </div>
    );
  }
}

export default PlayerOverview;
