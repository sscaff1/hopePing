import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { WINDOW_WIDTH, PURPLE } from '../constants';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(225, 231, 206, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 20,
    width: WINDOW_WIDTH * 0.8,
  },
  label: {
    fontFamily: 'JosefinSlab',
    fontSize: 18,
    color: PURPLE,
    fontWeight: 'bold',
  },
});

export default function LinkButton({ label, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

LinkButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: View.propTypes.style,
};
