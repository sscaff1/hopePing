import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function SecondaryFont({ children }) {
  return (
    <Text style={styles.container}>
      {children}
    </Text>
  );
}

SecondaryFont.propTypes = {
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'OpenSans',
    fontStyle: 'normal',
  },
});
