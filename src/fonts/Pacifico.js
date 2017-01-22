import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Pacifico({ children }) {
  return (
    <Text style={styles.container}>
      {children}
    </Text>
  );
}

Pacifico.propTypes = {
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'pacifico',
    fontStyle: 'normal',
  },
});
