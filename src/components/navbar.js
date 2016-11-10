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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#008080',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: '900',
    fontFamily: 'JosefinSlab',
  },
  button: {
    height: 60,
    width: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sideLabel: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    fontFamily: 'JosefinSlab',
  },
  donate: {
    color: '#C1B5C6',
    fontWeight: 'bold',
    fontFamily: 'Pacifico',
    top: 5,
  },
});

export default function Navbar({ routeBack, title, routeForward, rightLabel }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.button} onPress={routeBack}>
        <Text style={styles.sideLabel}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>
        {title}
      </Text>
      <TouchableOpacity style={styles.button} onPress={routeForward}>
        <Text style={[styles.sideLabel, styles.donate]}>
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
