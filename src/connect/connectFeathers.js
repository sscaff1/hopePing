import React, { PropTypes, Component } from 'react';
import { AsyncStorage } from 'react-native';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';

if (! window.navigator || ! window.navigator.hasOwnProperty('userAgent')) {
  Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}

const io = require('socket.io-client/socket.io');

export function connectFeathers(ConnectComponent) {
  class FeathersConnector extends Component {
    static propTypes = {
      endpoint: PropTypes.string,
      timeout: PropTypes.number,
    };

    static defaultProps = {
      timeout: 5000,
      endpoint: 'http://localhost:3030',
    };

    constructor(props, context) {
      super(props, context);
      this.state = {
        connected: false,
      };
      const options = {
        transports: ['websocket'],
        forceNew: true,
        reconnectionDelay: props.timeout,
        reconnection: true,
      };
      const socket = io(props.endpoint, options);
      this.app = feathers()
        .configure(socketio(socket))
        .configure(hooks())
        // Use AsyncStorage to store our login toke
        .configure(authentication({
          storage: AsyncStorage,
        }));
    }

    componentDidMount() {
      this.app.io.on('connect', () => {
        this.setState({
          connected: true,
        });
      });
      this.app.io.on('disconnect', () => {
        this.setState({
          connected: false,
        });
      });
    }

    render() {
      return <ConnectComponent {...this.props} feathers={this.app} />;
    }
  }

  return FeathersConnector;
}
