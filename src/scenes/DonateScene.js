import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Navbar } from '../components/Navbar';
import { connectFeathers } from '../connect/connectFeathers';

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
    navigator: PropTypes.object.isRequired,
    feathers: PropTypes.object.isRequired,
    cause: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      email: '',
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
    const { navigator, cause } = this.props;
    const { name, email, cc, expiration, cvc, amount, comment } = this.state;
    return (
      <View style={styles.container}>
        <Navbar
          title="Donate"
          routeBack={navigator.pop}
          routeForward={() => console.log('on donate')}
          rightLabel=""
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.form}>
          <Text style={styles.cause}>
            Cause: {cause}
          </Text>
          <InputLabel>Name</InputLabel>
          <TextInput
            onChangeText={text => this.changeText('name', text)}
            value={name}
            style={styles.input}
            placeholder="Name on your Credit Card"
          />
          <InputLabel>Email</InputLabel>
          <TextInput
            onChangeText={text => this.changeText('email', text)}
            value={email}
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
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
                secureTextEntry={true}
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
            multiline={true}
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
      </View>
    );
  }
}

export default connectFeathers(DonateScene);
