import React, { Component } from 'react';
import {
  View,
  Animated,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  findNodeHandle,
} from 'react-native';
import TextInputState from 'react-native/lib/TextInputState';
import { WINDOW_WIDTH } from '../constants';


const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const donateAmounts = [
  { amount: '$1' },
  { amount: '$2' },
  { amount: '$5' },
  { amount: '$10' },
  { amount: 'Other' },
];

const lastBox = donateAmounts.length;

export default class DonateAmount extends Component {
  state = {
    activeBox: 0,
    inputHeight: new Animated.Value(0),
    inputWidth: new Animated.Value(0),
    inputPadding: new Animated.Value(0),
  };

  getAmount = () => {
    switch (this.state.activeBox) {
      case 0:
        return 100;
      case 1:
        return 200;
      case 2:
        return 500;
      case 3:
        return 1000;
      case 4:
      default:
        return this.input.value;
    }
  };

  updateActiveBox = (activeBox) => {
    if (activeBox === lastBox - 1) {
      Animated.parallel([
        Animated.spring(
          this.state.inputHeight, {
            toValue: 50,
          },
        ),
        Animated.spring(
          this.state.inputWidth, {
            toValue: WINDOW_WIDTH * 0.95,
          },
        ),
        Animated.spring(
          this.state.inputPadding, {
            toValue: 10,
          },
        ),
      ]).start();
    } else if (this.state.activeBox === lastBox - 1 && activeBox !== lastBox - 1) {
      Animated.parallel([
        Animated.spring(
          this.state.inputHeight, {
            toValue: 0,
          },
        ),
        Animated.spring(
          this.state.inputWidth, {
            toValue: 0,
          },
        ),
        Animated.spring(
          this.state.inputPadding, {
            toValue: 0,
          },
        ),
      ]).start();
    }
    this.setState({ activeBox }, () => {
      if (activeBox === lastBox - 1) {
        TextInputState.focusTextInput(findNodeHandle(this.input));
      }
    });
  }

  render() {
    const { activeBox, inputHeight, inputWidth, inputPadding } = this.state;
    return (
      <View>
        <View style={styles.container}>
          {donateAmounts.map(({ amount }, i) => (
            <TouchableWithoutFeedback
              key={`amountbox-${i}`}
              onPress={() => this.updateActiveBox(i)}
            >
              <View
                style={[
                  styles.amountBox,
                  activeBox === i && styles.active,
                  i === lastBox - 1 && styles.noBorder,
                ]}
              >
                <Text style={styles.amountText}>{amount}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <AnimatedTextInput
          ref={ref => (this.input = ref)}
          style={[styles.input, { height: inputHeight, padding: inputPadding, width: inputWidth }]}
          keyboardType="numeric"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH * 0.95,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  amountBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: 'black',
    height: 40,
    backgroundColor: 'gray',
  },
  active: {
    backgroundColor: 'lightgray',
  },
  noBorder: {
    borderRightWidth: 0,
    flex: 1.5,
  },
  amountText: {
    fontSize: 15,
  },
  otherBox: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'lightgray',
  },
});
