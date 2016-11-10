import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../constants';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(225, 231, 206, 0.7)',
    paddingVertical: 20,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    width: (WINDOW_WIDTH * 1.1) / 2,
  },
  label: {
    fontFamily: 'JosefinSlab',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default function LinkButton({ label, onPress }) {
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
