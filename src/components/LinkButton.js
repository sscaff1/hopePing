import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../constants';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    width: WINDOW_WIDTH * 3 / 4,
  },
  label: {
    color: 'white',
    fontSize: 20,
  },
});

export function LinkButton({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

LinkButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
