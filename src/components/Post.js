import React, { PropTypes } from 'react';
import { TouchableOpacity, Platform, StyleSheet, Text, View, Image, Linking } from 'react-native';
import moment from 'moment/src/moment';
import { SecondaryFont } from '../fonts';
import { WINDOW_WIDTH } from '../constants';

export default function Post({ url, title, image, snippet, createdAt, source }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(url)}>
      <SecondaryFont>
        <Text style={styles.title}>{title}</Text>
      </SecondaryFont>
      {!!image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      <SecondaryFont>
        <Text style={styles.snippet}>{snippet}</Text>
      </SecondaryFont>
      <View style={styles.row}>
        <SecondaryFont>
          <Text style={styles.date}>{moment(createdAt).fromNow()}</Text>
        </SecondaryFont>
        <SecondaryFont>
          <Text style={styles.topic}>{source}</Text>
        </SecondaryFont>
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
    fontSize: WINDOW_WIDTH / 31,
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
