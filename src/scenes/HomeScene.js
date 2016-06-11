import React, { PropTypes } from 'react';
import { View } from 'react-native';

export function HomeScene({ navigator }) {
  return (
    <View />
  );
}

HomeScene.propTypes = {
  navigator: PropTypes.object.isRequired,
};
