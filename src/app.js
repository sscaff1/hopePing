import React, { Component } from 'react';
import { Navigator, Linking, StyleSheet } from 'react-native';
import {
  DonateScene,
  HomeScene,
  LoginScene,
  NewsScene,
} from './scenes';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
});

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
    const routeName = typeof route === 'string' ? route : route.name;
    switch (routeName) {
      case 'DonateScene':
        return (
          <DonateScene
            navigator={navigator}
            routeBack={() => navigator.pop()}
            {...route.passProps}
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
      case 'NewsScene':
        return (
          <NewsScene
            navigator={navigator}
            {...route.passProps}
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
        sceneStyle={styles.wrap}
      />
    );
  }
}
