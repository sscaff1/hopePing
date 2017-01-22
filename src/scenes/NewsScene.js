import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import { connectFeathers } from 'react-native-feathers-connector';
import { Loading, Post } from '../components';
import { NEWS_SERVICE } from '../services';

class NewsScene extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
  };

  state = {
    articles: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }),
    articleRows: [],
    page: 0,
    loading: true,
  }

  componentWillMount() {
    this.getMoreNews();
  }

  getMoreNews = () => {
    const { page, articleRows } = this.state;
    const query = { page };
    this.props.feathers.service(NEWS_SERVICE).find({ query })
    .then((data) => {
      const articles = articleRows.concat(data);
      this.setState({
        articleRows: articles,
        articles: this.state.articles.cloneWithRows(articles),
        loading: false,
        page: page + 1,
      });
    })
    .catch(error => console.log(error));
  }

  renderRow = (article) => {
    const hasImages = article.multimedia.length > 0;
    const uri = hasImages && `https://www.nytimes.com/${article.multimedia[0].url}`;
    const height = hasImages && article.multimedia[0].height;
    const width = hasImages && article.multimedia[0].width;
    return (
      <Post
        url={article.web_url}
        title={article.headline.main}
        image={uri}
        height={height}
        width={width}
        createdAt={article.pub_date}
        source={article.source}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }
    return (
      <ListView
        dataSource={this.state.articles}
        renderRow={this.renderRow}
        onEndReached={this.getMoreNews}
        onEndReachedThreshold={600}
      />
    );
  }
}

export default connectFeathers(NewsScene);
