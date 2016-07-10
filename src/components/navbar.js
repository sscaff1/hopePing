import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: 'blue',
    paddingTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: '900',
  },
  button: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideLabel: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
  },
});

export function Navbar({ routeBack, title, routeForward, rightLabel }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.button} onPress={routeBack}>
        <Text style={styles.sideLabel}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>
        {title}
      </Text>
      <TouchableOpacity style={styles.button} onPress={routeForward}>
        <Text style={styles.sideLabel}>
          {rightLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

Navbar.propTypes = {
  routeBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  routeForward: PropTypes.func.isRequired,
  rightLabel: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  rightLabel: 'Donate',
};
