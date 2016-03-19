'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import {App} from './src/app';
import {NavBar} from './src/app';

const hopePing = () => (
  <Navigator
    initialRoute={{component: App, name: 'Hope Ping'}}
    navigationBar={<NavBar />}
    renderScene={(route, navigator) => {
      const MySceneComponent = route.component;
      return (
        <MySceneComponent
          name={route.name}
          navigator={navigator}
        />
      )}
    }
  />
);

AppRegistry.registerComponent('hopePing', () => hopePing);
