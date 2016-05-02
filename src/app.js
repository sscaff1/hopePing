import React, { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SingleCause from './components/singleCause';
const { height, width } = Dimensions.get('window');

export const App = ({ navigator }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Donate to Your Cause</Text>
    <View style={styles.buttonContainer}>
      {buttons.map((button, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => { navigator.push({ component: SingleCause, name: button.name }); }}>
          <View style={{ alignItems: 'center' }}>
            <Icon name={button.icon} size={36} color="white" />
            <Text style={styles.buttonText}>{button.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const buttons = [
  { name: 'Homeless', icon: 'people' },
  { name: 'Medical', icon: 'healing' },
  { name: 'Enviromental', icon: 'landscape' },
  { name: 'Arts', icon: 'color-lens' },
  { name: 'Pets', icon: 'pets' },
  { name: 'Education', icon: 'school' },
  { name: 'Disaster', icon: 'people' },
  { name: 'Human Rights', icon: 'people' },
];

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    height: height / 5 - 30,
    width: width / 2 - 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#64B5F6',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
  },
});
