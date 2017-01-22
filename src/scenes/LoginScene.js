import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, WebView, Modal, Image } from 'react-native';
import CookieManager from 'react-native-cookies';
import { connectFeathers } from 'react-native-feathers-connector';
import { Pacifico, Sans } from '../fonts';
import { LinkButton, Loading, Header } from '../components';

const HOME_BACKGROUND = require('../img/hope.png');

class LoginScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    feathers: PropTypes.object.isRequired,
  }

  state = {
    authUrl: '',
    webViewVisible: false,
    showLogin: false,
  };

  componentWillMount() {
    const { feathers } = this.props;
    return feathers.authenticate()
    .then(({ accessToken }) => feathers.passport.verifyJWT(accessToken))
    .then(payload => feathers.service('users').get(payload.userId))
    .then((user) => {
      feathers.set('user', user);
      this.props.navigator.resetTo('HomeScene');
    })
    .catch(this.logout);
  }

  setAuthUrl = (destination) => {
    this.setState({
      authUrl: `http://localhost:3030/auth/${destination}`,
      webViewVisible: true,
    });
  }

  authenticate = (token) => {
    const { feathers } = this.props;
    return feathers.authenticate({ strategy: 'jwt', accessToken: token })
    .then(({ accessToken }) => feathers.passport.verifyJWT(accessToken))
    .then(payload => feathers.service('users').get(payload.userId))
    .then((user) => {
      feathers.set('user', user);
      this.props.navigator.resetTo('HomeScene');
    })
    .catch(() => feathers.logout());
  }

  logout = () => {
    this.props.feathers.logout();
    this.setState({ showLogin: true });
  }

  handleWebViewChange = (url) => {
    if (url.url.indexOf('/success') > -1) {
      CookieManager.getAll((error, cookie) => {
        this.authenticate(cookie['feathers-jwt'].value);
        this.setState({ webViewVisible: false });
      });
    }
  }

  renderWebView = () => {
    const { webViewVisible } = this.state;
    return (
      <Modal
        animationType="slide"
        visible={webViewVisible}
      >
        <View style={styles.container}>
          <Header
            title="Facebook Login"
            icon="close"
            iconAction={() => this.setState({ webViewVisible: false })}
          />
          <WebView
            startInLoadingState
            onNavigationStateChange={this.handleWebViewChange}
            source={{ uri: this.state.authUrl }}
            renderLoading={() => <Loading />}
          />
        </View>
      </Modal>
    );
  }

  render() {
    const { showLogin } = this.state;
    return showLogin && (
      <Image style={styles.wrap} source={HOME_BACKGROUND}>
        <Text style={styles.headerText}>
          <Pacifico>
            <Text style={styles.header}>
              The New Orleans Mission{'\n'}
            </Text>
          </Pacifico>
          <Sans>
            <Text style={styles.subheading}>
              Rescue &#8226; Recovery &#8226; Re-Engagement
            </Text>
          </Sans>
        </Text>
        <LinkButton
          onPress={() => this.setAuthUrl('facebook')}
          label="Login With Facebook"
        />
        {this.renderWebView()}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 70,
  },
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    fontSize: 30,
  },
  subheading: {
    fontSize: 20,
  },
});


export default connectFeathers(LoginScene);
