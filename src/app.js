import React, { Component } from 'react';
import { Navigator, Linking, StyleSheet } from 'react-native';
import { FeathersWrapper } from 'react-native-feathers-connector';
import {
  HomeScene,
  LoginScene,
} from './scenes';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.renderScene = ::this.renderScene;
    this.handleOpenUrl = ::this.handleOpenUrl;
  }

  componentDidMount() {
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
      <FeathersWrapper wsEndpoint="http://localhost:3030" timeout={2000}>
        <Navigator
          initialRoute={{ name: 'LoginScene' }}
          renderScene={this.renderScene}
          sceneStyle={styles.wrap}
        />
      </FeathersWrapper>
    );
  }
}
