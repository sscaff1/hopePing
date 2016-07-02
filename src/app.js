import React, { Component } from 'react';
import { Navigator, Linking, View, StyleSheet } from 'react-native';
import {
  DonateScene,
  HomeScene,
  LoginScene,
  NewsScene,
} from './scenes';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginTop: 20,
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
      <View style={styles.wrap}>
        <Navigator
          initialRoute={{ name: 'LoginScene' }}
          renderScene={this.renderScene}
        />
      </View>
    );
  }
}
