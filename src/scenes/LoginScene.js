import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connectFeathers } from '../connect/connectFeathers';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
  },
});

class LoginScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.routeLoginSuccess = ::this.routeLoginSuccess;
  }

  routeLoginSuccess() {
    console.log('logging in');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Hope Ping
        </Text>
      </View>
    );
  }
}

export default connectFeathers(LoginScene);
