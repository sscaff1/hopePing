import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function MainFont({ children }) {
  return (
    <Text style={styles.container}>
      {children}
    </Text>
  );
}

MainFont.propTypes = {
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'RingBearer',
    fontStyle: 'normal',
  },
});
