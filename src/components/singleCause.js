import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Picker,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 5,
  },
  textBox: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

class SingleCause extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      card: '',
      cardNumber: '',
    };
    this._scrollToInput = this._scrollToInput.bind(this);
    this.cardNumber = null;
    this.singleCause = null;
  }
  onSumbit() {
    console.log('submitted');
  }

  _scrollToInput() {
    const scrollView = this.singleCause.getScrollResponder();
    throw scrollView;
    scrollView.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(this.cardNumber),
      110,
      true
    );
  }

  render() {
    return (
      <ScrollView style={styles.container} ref={singleCause => this.singleCause = singleCause}>
        <Text style={styles.title}>Donate Below</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            autoFocus
            autoCorrect={false}
          />
          <Text style={styles.label}>Card Type</Text>
          <Picker
            selectedValue={this.state.card}
            onValueChange={(card) => this.setState({ card })}
          >
            <Picker.Item label="Visa" value="visa" />
            <Picker.Item label="Mastercard" value="mc" />
            <Picker.Item label="American Express" value="amex" />
            <Picker.Item label="Discover" value="discover" />
          </Picker>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            ref={cardNumber => this.cardNumber = cardNumber}
            style={styles.textBox}
            onChangeText={(cardNumber) => this.setState({ cardNumber })}
            value={this.state.cardNumber}
            keyboardType="number-pad"
            onFocus={this._scrollToInput}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onPress} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Send a Ping of Hope</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


export default SingleCause;
