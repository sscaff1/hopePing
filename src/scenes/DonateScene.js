import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from '../components/Navbar';
import { connectFeathers } from '../connect/connectFeathers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class DonateScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    feathers: PropTypes.object.isRequired,
  };

  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <Navbar
          title="Donate"
          routeBack={navigator.pop}
          routeForward={() => console.log('on donate')}
          rightLabel=""
        />

      </View>
    );
  }
}

export default connectFeathers(DonateScene);
