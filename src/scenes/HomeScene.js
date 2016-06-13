import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

export function HomeScene({ navigator }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

HomeScene.propTypes = {
  navigator: PropTypes.object.isRequired,
};
