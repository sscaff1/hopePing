import React, { Component } from 'react';
import { Navigator, StyleSheet } from 'react-native';
import { FeathersWrapper } from 'react-native-feathers-connector';
import { HomeScene, LoginScene } from './scenes';
import { ENDPOINT, TIMEOUT } from './constants';

export default class App extends Component {
  renderScene = (route, navigator) => {
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
      <FeathersWrapper wsEndpoint={ENDPOINT} timeout={TIMEOUT}>
        <Navigator
          initialRoute={{ name: 'LoginScene' }}
          renderScene={this.renderScene}
          sceneStyle={styles.wrap}
        />
      </FeathersWrapper>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
});
