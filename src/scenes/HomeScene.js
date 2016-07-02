import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WINDOW_WIDTH } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 100,
    backgroundColor: 'lightblue',
    width: WINDOW_WIDTH / 2 - 40,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  header: {
    fontSize: 40,
  },
});

const causes = [
  { name: 'Homeless', icon: <Icon name="person" size={40} />, topic: 'homeless' },
  { name: 'People', icon: <Icon name="person" size={40} /> },
  { name: 'Testing', icon: <Icon name="person" size={40} /> },
];

export function HomeScene({ navigator }) {
  return (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.header}>Pick Your Cause</Text>
      {causes.map((cause, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.button, styles.center]}
          onPress={() => navigator.push({ name: 'NewsScene', passProps: { topic: cause.topic } })}
        >
          <View style={styles.center}>
            {cause.icon}
            <Text>{cause.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

HomeScene.propTypes = {
  navigator: PropTypes.object.isRequired,
};
