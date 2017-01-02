import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { STRIPE_SERVICE } from '../services';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants';
import { connectFeathers } from '../connect';

function InputLabel({ children }) {
  return (
    <Text style={styles.label}>
      {children}
    </Text>
  );
}

InputLabel.propTypes = {
  children: PropTypes.string.isRequired,
};

class DonateScene extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      zip: '',
      cc: '',
      cvc: '',
      expiration: '',
      amount: '',
      comment: '',
    };
    this.changeText = this.changeText.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  changeText(field, text) {
    this.setState({
      [field]: text,
    });
  }

  validateForm() {

  }

  submitForm() {
    fetch('https://js.stripe.com/v2/')
    .then(stripe => console.log(stripe));
  }

  render() {
    const { zip, cc, expiration, cvc, amount, comment } = this.state;
    return (
      <View style={styles.container}>
        <InputLabel>Card Number</InputLabel>
        <TextInput
          onChangeText={text => this.changeText('cc', text)}
          keyboardType="numeric"
          value={cc}
          style={styles.input}
          placeholder="Credit Card Number"
        />
        <View style={styles.row}>
          <View style={[styles.rowColumn, styles.left]}>
            <InputLabel>Expiration</InputLabel>
            <TextInput
              onChangeText={(text) => {
                this.changeText('expiration', text);
              }}
              keyboardType="numeric"
              value={expiration}
              style={styles.input}
              placeholder="MMYYYY"
            />
          </View>
          <View style={[styles.rowColumn, styles.right]}>
            <InputLabel>CVC</InputLabel>
            <TextInput
              onChangeText={text => this.changeText('cvc', text)}
              keyboardType="numeric"
              value={cvc}
              secureTextEntry
              style={styles.input}
              placeholder="****"
            />
          </View>
        </View>
        <InputLabel>Billing Zip Code</InputLabel>
        <TextInput
          onChangeText={text => this.changeText('zip', text)}
          keyboardType="numeric"
          value={zip}
          style={styles.input}
          placeholder="Zip Code"
        />
        <InputLabel>Amount</InputLabel>
        <TextInput
          onChangeText={text => this.changeText('amount', text)}
          keyboardType="numeric"
          value={amount}
          style={styles.input}
          placeholder="Amount To Donate"
        />
        <InputLabel>Comment/Special Cause</InputLabel>
        <TextInput
          multiline
          onChangeText={text => this.changeText('comment', text)}
          value={comment}
          style={[styles.input, styles.multiline]}
          placeholder="Let us know about your donation"
        />
        <TouchableOpacity onPress={this.submitForm} style={styles.button}>
          <Text style={styles.buttonLabel}>
            Donate
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: 'purple',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    height: WINDOW_HEIGHT / 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowColumn: {
    flex: 1,
  },
  right: {
    marginLeft: 5,
  },
  left: {
    marginRight: 5,
  },
  multiline: {
    height: 120,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    width: WINDOW_WIDTH / 2,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  cause: {
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default connectFeathers(DonateScene);
