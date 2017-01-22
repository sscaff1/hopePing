import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Sans({ children }) {
  return (
    <Text style={styles.container}>
      {children}
    </Text>
  );
}

Sans.propTypes = {
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'josefinsans',
    fontStyle: 'normal',
  },
});
