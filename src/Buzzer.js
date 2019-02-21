import React from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import styled from 'styled-components';
import constants from './constants';

const Buzzer = styled.img`
  width: 100%;
  filter: grayscale(${props => (props.isPressed ? 0 : '0.7')});
`;

class Player extends React.Component {
  state = {
    pressedButton: false,
  };

  componentDidMount() {
    this.socket = new Pusher('d61e39bd8719a7ff7ea6', {
      cluster: 'eu',
    });
    this.channel = this.socket.subscribe('buzzer-channel');
    this.channel.bind('next-question', () => {
      this.setState({
        pressedButton: false,
      });
    });
  }

  buzz = () => {
    this.setState({
      pressedButton: true,
    });
    axios({
      method: 'post',
      url: `${constants.apiUrl}/buzz`,
      data: {
        username: this.props.username,
      },
    });
  };

  render() {
    const { pressedButton } = this.state;

    return (
      <Buzzer
        onClick={this.buzz}
        src="https://lh3.ggpht.com/Cll38pXB-_q861syyIhVDj54sl9j8ZZvH4V_41bXoVZffeW6dYklj1lp63pv7gtZi-o"
        isPressed={pressedButton}
      />
    );
  }
}

export default Player;
