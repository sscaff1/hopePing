import React, { PropTypes } from 'react';
import { TouchableOpacity, Platform, StyleSheet, Text, View, Image, Linking } from 'react-native';
import moment from 'moment/src/moment';
import { Sans } from '../fonts';
import { WINDOW_WIDTH } from '../constants';

export default function Post({ url, title, image, snippet, createdAt, source }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(url)}>
      <Sans>
        <Text style={styles.title}>{title}</Text>
      </Sans>
      {!!image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      <Sans>
        <Text style={styles.snippet}>{snippet}</Text>
      </Sans>
      <View style={styles.row}>
        <Sans>
          <Text style={styles.date}>{moment(createdAt).fromNow()}</Text>
        </Sans>
        <Sans>
          <Text style={styles.topic}>{source}</Text>
        </Sans>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  title: {
    fontSize: 18,
    lineHeight: 20,
  },
  snippet: {
    fontSize: 16,
    marginBottom: 10,
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
    color: '#C1B5C6',
  },
});
