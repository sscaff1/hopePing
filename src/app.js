import React, { Component } from 'react';
import { Navigator, Linking } from 'react-native';
import {
  DonateScene,
  HomeScene,
  LoginScene,
} from './scenes';

export class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.renderScene = ::this.renderScene;
    this.handleOpenUrl = ::this.handleOpenUrl;
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenUrl);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenUrl);
  }

  handleOpenUrl() {
    console.log(arguments);
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'DonateScene':
        return (
          <DonateScene
            navigator={navigator}
            routeBack={() => navigator.pop()}
          />
        );
      case 'HomeScene':
        return (
          <HomeScene
            navigator={navigator}
            routeBack={() => navigator.pop()}
          />
        );
      case 'LoginScene':
        return (
          <LoginScene
            navigator={navigator}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'LoginScene' }}
        renderScene={this.renderScene}
      />
    );
  }
}
