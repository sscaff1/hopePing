import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { WINDOW_WIDTH } from '../constants';


export default class DonateScene extends Component {
  state = {
    valid: false,
    formData: '',
  }
  onChange = (formData) => {
    /* eslint no-console: 0 */
    if (formData.valid) {
      this.setState({
        valid: true,
        formData: JSON.stringify(formData.values),
      }, () => console.log(this.state));
    }
  };

  onFocus = (field) => {
    /* eslint no-console: 0 */
    // console.log(field);
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
  }

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

          onFocus={this.onFocus}
          onChange={this.onChange}
        />
        <TouchableOpacity style={[styles.submitButton, !valid && styles.disabled]}>
          <Text style={styles.submit}>Donate</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    backgroundColor: 'green',
    alignSelf: 'center',
    marginTop: 10,
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
