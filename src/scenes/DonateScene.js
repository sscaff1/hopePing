import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connectFeathers } from '../connect';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'JosefinSlab',
  },
  input: {
    padding: 5,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgray',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#E2F0F0',
    fontFamily: 'JosefinSlab',
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
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'JosefinSlab',
  },
  cause: {
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'JosefinSlab',
  },
});

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
      name: '',
      cc: '',
      cvc: '',
      expiration: '',
      amount: '',
      comment: '',
    };
    this.changeText = this.changeText.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  changeText(field, text) {
    this.setState({
      [field]: text,
    });
  }

  submitForm() {
    // call to stripe service
    console.log(this.props.feathers);
  }

  render() {
    const { name, cc, expiration, cvc, amount, comment } = this.state;
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps
        keyboardDismissMode="none"
        contentContainerStyle={styles.form}
      >
        <InputLabel>Name</InputLabel>
        <TextInput
          onChangeText={text => this.changeText('name', text)}
          value={name}
          style={styles.input}
          placeholder="Name on your Credit Card"
        />
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
              onChangeText={text => this.changeText('expiration', text)}
              keyboardType="numeric"
              value={expiration}
              style={styles.input}
              placeholder="MM/YY"
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
      </KeyboardAwareScrollView>
    );
  }
}

export default connectFeathers(DonateScene);
