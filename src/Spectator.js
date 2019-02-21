import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Pusher from 'pusher-js';
import styled from 'styled-components';
import constants from './constants';
import PlayerOverview from './PlayerOverview';
import TodayScores from './SpectatorView/TodayScores';
import CurrentPlayer from './SpectatorView/CurrentPlayer';
import EligiblePlayers from './SpectatorView/EligiblePlayers';
import TotalPlayers from './SpectatorView/TotalPlayers';
import CurrentQuestion from './SpectatorView/CurrentQuestion';
import NextPlayers from './SpectatorView/NextPlayers';
import TotalScores from './SpectatorView/TotalScores';

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 18% 18% 18% 18% 18%;
  grid-column-gap: 50px;
  grid-row-gap: 2.5%;
  justify-items: stretch;
`;

class Spectator extends React.Component {
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

  render() {
    const { players } = this.state;

    const buzzedPlayers = _.orderBy(
      _.filter(players, player => {
        return player.order > 0;
      }),
      ['order'],
      ['asc']
    );

    const [currentPlayer, ...nextPlayers] = buzzedPlayers;

    const eligibilePlayers = _.filter(players, player => {
      return player.order === 0;
    });

    const playersByScore = _.orderBy(
      _.filter(players, player => {
        return player.score > 0;
      }),
      ['score'],
      ['desc']
    );

    return (
      <Wrapper>
        <CurrentPlayer player={currentPlayer} />
        <EligiblePlayers players={eligibilePlayers} />
        <TotalPlayers players={players} />
        <CurrentQuestion />
        <NextPlayers players={nextPlayers} />
        <TodayScores lePlayers={playersByScore} />
        <TotalScores />
      </Wrapper>
    );
  }
}

export default Spectator;
