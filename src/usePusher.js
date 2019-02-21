import { useEffect } from 'react';
import Pusher from 'pusher-js';

export default (message, callback) => {
  useEffect(() => {
    const socket = new Pusher('d61e39bd8719a7ff7ea6', {
      cluster: 'eu',
    });

    const channel = socket.subscribe('buzzer-channel');
    channel.bind(message, data => {
      callback(data);
    });
  }, []);
};
