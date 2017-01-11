import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import { connectFeathers } from 'react-native-feathers-connector';
import { Loading, Post } from '../components';
import { FEED_SERVICE } from '../services';

class SocialScene extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id,
      }),
      loading: true,
      nextPage: undefined,
    };
    this.posts = [];
    this.getPosts();
  }

  getPosts = () => {
    const { nextPage } = this.state;
    const query = { nextPage };
    this.props.feathers.service(FEED_SERVICE).find({ query })
    .then((result) => {
      this.posts = this.posts.concat(result.data);
      this.setState({
        posts: this.state.posts.cloneWithRows(this.posts),
        loading: false,
        nextPage: result.paging.next,
      });
    });
  }

  renderRow = post => (
    <Post
      url={post.permalink_url}
      title={post.message}
      image={post.picture}
      height={300}
      width={300}
      createdAt={post.created_time}
    />
  );

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <ListView
        dataSource={this.state.posts}
        renderRow={this.renderRow}
        onEndReached={this.getPosts}
        onEndReachedThreshold={600}
      />
    );
  }
}

export default connectFeathers(SocialScene);
