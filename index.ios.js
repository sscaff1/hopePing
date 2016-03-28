'use strict';
import React, { AppRegistry, Navigator } from 'react-native';
import {App} from './src/app';
import {NavBar} from './src/components/navbar';

const hopePing = () => (
  <Navigator
    style={{flex: 1}}
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
