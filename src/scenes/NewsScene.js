import React, { Component, PropTypes } from 'react';
import { Linking, View, Text, ListView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Loading } from '../components/Loading';
import { Navbar } from '../components/Navbar';
import moment from 'moment/src/moment';
import { WINDOW_WIDTH } from '../constants';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
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
    fontSize: 20,
  },
  snippet: {
    fontSize: 15,
    marginBottom: 10,
  },
  image: {
    marginVertical: 10,
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
      loading: true,
    };
  }

  componentWillMount() {
    const { topic } = this.props;
    const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const query = `?api-key=644c9545b0684d46949ac8ee9e15b697&q=${topic}&sort=newest`;
    const urlToFetch = baseUrl + query;
    fetch(urlToFetch)
    .then(results => results.json())
    .then(response =>
      this.setState({
        articles: this.state.articles.cloneWithRows(response.response.docs),
        loading: false,
      })
    )
    .catch(error => console.log(error));
  }

  renderRow(article) {
    const hasImages = article.multimedia.length > 0;
    const uri = hasImages && `http://www.nytimes.com/${article.multimedia[0].url}`;
    const height = hasImages && article.multimedia[0].height;
    const width = hasImages && article.multimedia[0].width;
    return (
      <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(article.web_url)}>
        <Text style={styles.title}>{article.headline.main}</Text>
        {hasImages && <Image source={{ uri }} style={[{ height, width }, styles.image]} />}
        <Text style={styles.snippet}>{article.snippet}</Text>
        <View style={styles.row}>
          <Text style={styles.date}>{moment(article.pub_date).fromNow()}</Text>
          <Text style={styles.topic}>{article.source}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { navigator, topic } = this.props;
    if (this.state.loading) {
      return (
        <Loading />
      );
    }
    return (
      <View style={styles.wrap}>
        <Navbar
          title={topic}
          routeBack={navigator.pop}
          routeForward={() => navigator.push('DonateScene')}
        />
        <ListView
          dataSource={this.state.articles}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}
