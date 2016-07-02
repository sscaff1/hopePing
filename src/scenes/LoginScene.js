import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, WebView, Modal } from 'react-native';
import CookieManager from 'react-native-cookies';
import { LinkButton } from '../components/LinkButton';
import { connectFeathers } from '../connect/connectFeathers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
  },
});

class LoginScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    feathers: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      notWebView: true,
      authUrl: '',
      webViewVisible: false,
      showLogin: false,
    };
    this.setAuthUrl = ::this.setAuthUrl;
    this.handleWebViewChange = ::this.handleWebViewChange;
    this.authenticate = ::this.authenticate;
  }

  componentWillMount() {
    const { feathers } = this.props;
    feathers.authenticate()
    .then(() => this.props.navigator.resetTo('HomeScene'))
    .catch(() => {
      feathers.logout();
      this.setState({ showLogin: true });
    });
  }

  setAuthUrl(destination) {
    this.setState({
      authUrl: `http://localhost:3030/auth/${destination}`,
      notWebView: false,
      webViewVisible: true,
    });
  }

  authenticate(token) {
    const { feathers } = this.props;
    feathers.authenticate({
      type: 'token',
      token,
    })
    .then(() => this.props.navigator.resetTo('HomeScene'))
    .catch(() => feathers.logout());
  }

  handleWebViewChange(url) {
    if (url.url.indexOf('/success') > -1) {
      CookieManager.getAll((error, cookie) => this.authenticate(cookie['feathers-jwt'].value));
      this.setState({ webViewVisible: false });
    }
  }

  render() {
    const { notWebView, showLogin, webViewVisible } = this.state;
    return showLogin && notWebView ? (
      <View style={styles.container}>
        <Text style={styles.header}>
          Hope Ping
        </Text>
        <LinkButton
          onPress={() => this.setAuthUrl('facebook')}
          label="Login With Facebook"
        />
        <LinkButton
          onPress={() => this.setAuthUrl('google')}
          label="Login With Google"
        />
        <LinkButton
          onPress={() => this.setAuthUrl('linkedin')}
          label="Login With LinkedIn"
        />
      </View>
    ) : (
      <Modal
        animationType="slide"
        visible={webViewVisible}
      >
        <WebView
          onNavigationStateChange={this.handleWebViewChange}
          source={{ uri: this.state.authUrl }}
        />
      </Modal>
    );
  }
}

export default connectFeathers(LoginScene);
