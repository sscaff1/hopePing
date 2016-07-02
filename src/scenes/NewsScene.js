import React, { Component, PropTypes } from 'react';
import { Linking, View, Text, ListView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment/src/moment';
import { WINDOW_WIDTH } from '../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  title: {
    fontSize: 20,
  },
  snippet: {
    fontSize: 15,
  },
  row: {
    width: WINDOW_WIDTH - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: 'lightgray',
  },
  topic: {
    fontSize: 14,
    color: 'gray',
  },
});

export class NewsScene extends Component {
  static propTypes = {
    topic: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      articles: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
  }

  componentWillMount() {
    const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const query = `?api-key=644c9545b0684d46949ac8ee9e15b697`;
    const urlToFetch = baseUrl + encodeURIComponent(query);
    console.log(urlToFetch);
    fetch(urlToFetch)
    .then(results => results.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }

  renderRow(article) {
    const uri = `http://www.nytimes.com/${article.multimedia[0].url}`;
    const height = article.multimedia[0].height;
    const width = article.multimedia[0].width;
    return (
      <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(article.web_url)}>
        <Text style={styles.title}>{article.headline.main}</Text>
        <Image source={{ uri }} style={{ height, width }} />
        <Text style={styles.snippet}>{article.snippet}</Text>
        <View style={styles.row}>
          <Text style={styles.date}>{moment(article.pub_date).fromNow()}</Text>
          <Text style={styles.topic}>{article.news_desk}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.articles}
        renderRow={this.renderRow}
      />
    );
  }
}
