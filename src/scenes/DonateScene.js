import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { connectFeathers } from 'react-native-feathers-connector';
import Stripe from 'react-native-stripe-api';
import { DonateAmount } from '../components';
import { STRIPE_SERVICE } from '../services';
import { WINDOW_WIDTH, GREEN } from '../constants';

class DonateScene extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
  };

  state = {
    valid: false,
    formData: '',
  };

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
    const { feathers } = this.props;
    const { valid, formData } = this.state;
    const chargeAmount = this.donate.getAmount();
    if (valid) {
      feathers.service(STRIPE_SERVICE).get()
      .then((key) => {
        const client = new Stripe(key);
        const number = formData.number.replace(' ', '');
        const [expMonth, expYear] = formData.expiry.split('/');
        return client.createToken(number, expMonth, expYear, formData.cvc);
      })
      .then(stripeToken => feathers.service(STRIPE_SERVICE).create({ stripeToken, chargeAmount }))
      .then(result => console.log(result))
      .catch(error => console.log(error));
    }
    return null;
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

  goToSpecialMessage = () => {
    this.props.navigator
  }

  render() {
    const { valid } = this.state;
    return (
      <View>
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
        />
        <DonateAmount ref={ref => (this.donate = ref)} />
        <TouchableOpacity
          onPress={this.onSubmit}
          style={[styles.submitButton, !valid && styles.disabled]}
        >
          <Text style={styles.submit}>Donate</Text>
        </TouchableOpacity>
      </View>
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
});
