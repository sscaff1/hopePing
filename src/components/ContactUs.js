import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet, Linking, Alert } from 'react-native';
import { SecondaryFont } from '../fonts';
import { WINDOW_WIDTH } from '../constants';

export default class ContactUs extends Component {
  static propTypes = {
    textStyle: PropTypes.number,
  };

  handleClick = (url) => {
    Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', `Don't know how to open: ${url}`);
      }
    });
  };

  render() {
    return (
      <Text style={styles.center}>
        <SecondaryFont>
          <Text style={this.props.textStyle}>
            1134 Baronne St., New Orleans, LA 70113{'\n'}
            P.O. Box 56565, New Orleans, LA 70156{'\n'}
            Phone: 504-523-2116{'\n'}
            Email: volunteer@neworleansmission.org{'\n'}
            Website: http://www.neworleansmission.org/{'\n'}
          </Text>
        </SecondaryFont>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  link: {
    width: 200,
    height: 20,
    paddingTop: 7,
  },
  blueLink: {
    color: '#0000EE',
  },
});
