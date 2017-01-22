import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Sans } from '../fonts';
import { WINDOW_WIDTH, PURPLE } from '../constants';

export default function LinkButton({ label, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Sans>
        <Text style={styles.label}>
          {label}
        </Text>
      </Sans>
    </TouchableOpacity>
  );
}

LinkButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: View.propTypes.style,
};

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
    fontSize: 18,
    color: PURPLE,
    fontWeight: 'bold',
  },
});
