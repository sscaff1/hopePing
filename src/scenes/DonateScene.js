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

  componentWillMount() {
    console.log(this.props.feathers.get('user'));
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
    const { feathers } = this.props;
    if (this.state.valid) {
      feathers.service(STRIPE_SERVICE).get()
      .then((key) => {
        const client = new Stripe(key);
        console.log(feathers.get('user'));
      })
      .catch((error) => {
        // handle error
      });
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

  render() {
    const { valid } = this.state;
    return (
      <View style={styles.container}>
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
          cardScale={0.8}
          validatePostalCode={this.validatePostalCode}
          onChange={this.onChange}
        />
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
  container: {
    marginTop: 10,
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    height: 60,
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
