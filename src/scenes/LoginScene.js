import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, WebView, Modal, Image, TouchableOpacity, Platform } from 'react-native';
import CookieManager from 'react-native-cookies';
import { connectFeathers } from 'react-native-feathers-connector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinkButton, Loading } from '../components';
import { WINDOW_WIDTH } from '../constants';

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
          <View style={styles.socialHeader}>
            <View style={styles.side} />
            <Text style={styles.title}>
              Facebook Login
            </Text>
            <TouchableOpacity
              style={styles.side}
              onPress={() => this.setState({ webViewVisible: false })}
            >
              <Icon name="close" style={styles.icon} />
            </TouchableOpacity>
          </View>
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
        <Text style={[styles.headerText, styles.header]}>
          The New Orleans Mission{'\n'}
          <Text style={[styles.headerText, styles.subheading]}>
            Rescue &#8226; Recovery &#8226; Reengagement
          </Text>
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
    backgroundColor: 'transparent',
    fontFamily: 'JosefinSlab',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Pacifico',
  },
  subheading: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 50,
    fontFamily: 'Pacifico',
  },
  socialHeader: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
      },
      android: {
        elevation: 1,
      },
    }),
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontFamily: 'IM Fell French Canon SC',
    alignSelf: 'center',
  },
  icon: {
    fontSize: 25,
  },
  side: {
    width: WINDOW_WIDTH / 4,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});


export default connectFeathers(LoginScene);
