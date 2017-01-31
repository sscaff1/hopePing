import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  LayoutAnimation,
} from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { connectFeathers } from 'react-native-feathers-connector';
import Stripe from 'react-native-stripe-api';
import { DonateAmount, Loading } from '../components';
import { STRIPE_SERVICE } from '../services';
import { WINDOW_WIDTH, WINDOW_HEIGHT, GREEN } from '../constants';

const SUCCESS_PHOTO = require('../img/donate-image.png');

class DonateScene extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  state = {
    valid: false,
    formData: '',
    loaderVisible: false,
    showSuccess: false,
  };

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onChange = (formData) => {
    /* eslint no-console: 0 */
    if (formData.valid) {
      this.setState({
        valid: true,
        formData: formData.values,
      });
    }
  };

  onSubmit = () => {
    const { feathers, navigator } = this.props;
    const { valid, formData } = this.state;
    const chargeAmount = this.donate.getAmount();
    if (valid) {
      this.setState({ loaderVisible: true }, () => {
        feathers.service(STRIPE_SERVICE).get()
        .then((key) => {
          const client = new Stripe(key);
          const number = formData.number.replace(' ', '');
          const [expMonth, expYear] = formData.expiry.split('/');
          return client.createToken(number, expMonth, expYear, formData.cvc);
        })
        .then(stripeToken => feathers.service(STRIPE_SERVICE).create({ stripeToken, chargeAmount }))
        .then(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          this.setState({ showSuccess: true }, () => {
            this.timer = setTimeout(() => {
              this.timer = null;
              navigator.resetTo('LoginScene');
              navigator.replace('HomeScene');
            }, 3000);
          });
        })
        .catch(error => console.log(error));
      });
    }
  };

  scroll = (focus = true) => {
    this.scrollView.scrollTo({ y: focus ? WINDOW_WIDTH / 2 : 0 });
  };

  validatePostalCode = (code) => {
    const regex = /\d{5}/g;
    if (!code) {
      return 'incomplete';
    }
    const stringPostal = code.toString();
    if (stringPostal.match(regex)) {
      return 'valid';
    } else if (stringPostal.length > 0) {
      return 'invalid';
    }
    return 'incomplete';
  };

  renderLoader = () => {
    const { loaderVisible, showSuccess } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={loaderVisible}
      >
        <View style={styles.loading}>
          {showSuccess ? (
            <Image style={styles.successPicture} source={SUCCESS_PHOTO} />
          ) : (
            <Loading />
          )}
        </View>
      </Modal>
    );
  }

  render() {
    const { valid } = this.state;
    return (
      <ScrollView ref={ref => (this.scrollView = ref)}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          requiresPostalCode
          labelStyle={styles.label}
          inputStyle={styles.input}
          validColor={'black'}
          invalidColor={'red'}
          placeholderColor={'darkgray'}
          cardScale={0.6}
          validatePostalCode={this.validatePostalCode}
          onChange={this.onChange}
          labels={{ expiry: 'EXPIRES' }}
        />
        <DonateAmount
          ref={ref => (this.donate = ref)}
          onBlur={() => this.scroll(false)}
          onFocus={this.scroll}
        />
        <TouchableOpacity
          onPress={this.onSubmit}
          style={[styles.submitButton, !valid && styles.disabled]}
        >
          <Text style={styles.submit}>Donate</Text>
        </TouchableOpacity>
        {this.renderLoader()}
      </ScrollView>
    );
  }
}

export default connectFeathers(DonateScene);

const styles = StyleSheet.create({
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    height: 50,
    width: WINDOW_WIDTH * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREEN,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  submit: {
    color: 'white',
    fontSize: 20,
  },
  disabled: {
    backgroundColor: 'lightgray',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  successPicture: {
    alignSelf: 'center',
    width: WINDOW_WIDTH,
    resizeMode: 'contain',
  },
});
