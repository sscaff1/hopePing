import React, { PropTypes } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Linking } from 'react-native';
import moment from 'moment/src/moment';
import { WINDOW_WIDTH } from '../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Open Sans',
  },
  snippet: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Open Sans',
  },
  imageContainer: {
    height: WINDOW_WIDTH / 2,
    width: WINDOW_WIDTH / 2,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  row: {
    width: WINDOW_WIDTH - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  topic: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#008080',
  },
  buttonLabel: {
    fontSize: 25,
    fontFamily: 'Pacifico',
    color: '#C1B5C6',
  },
});

export default function Post({ url, title, image, snippet, createdAt, source }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(url)}>
      <Text style={styles.title}>{title}</Text>
      {!!image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      <Text style={styles.snippet}>{snippet}</Text>
      <View style={styles.row}>
        <Text style={styles.date}>{moment(createdAt).fromNow()}</Text>
        <Text style={styles.topic}>{source}</Text>
      </View>
    </TouchableOpacity>
  );
}

Post.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  snippet: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};

Post.defaultProps = {
  source: 'facebook',
};
