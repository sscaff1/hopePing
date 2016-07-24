import React, { PropTypes } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connectFeathers } from '../connect/connectFeathers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WINDOW_WIDTH } from '../constants';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  wrap: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 100,
    backgroundColor: '#008080',
    width: WINDOW_WIDTH / 2 - 40,
    margin: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  header: {
    fontSize: 30,
    fontFamily: 'JosefinSlab',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  icon: {
    color: 'white',
  },
  label: {
    color: 'white',
  },
});

const causes = [
  { name: 'Homeless', icon: 'home' },
  { name: 'Animals', icon: 'pets' },
  { name: 'Medical', icon: 'healing' },
  { name: 'Enviromental', icon: 'landscape' },
  { name: 'Arts', icon: 'color-lens' },
  { name: 'Education', icon: 'school' },
  { name: 'Disaster', icon: 'local-hospital' },
  { name: 'Human Rights', icon: 'people' },
];

function HomeScene({ navigator, feathers }) {
  const title = 'Pick Your Cause'.toUpperCase();
  const logout = () => {
    feathers.logout()
    .then(() => navigator.resetTo('LoginScene'))
    .catch(error => console.log(error));
  };

  return (
    <Image source={require('../img/home-background.png')} style={styles.image}>
      <ScrollView contentContainerStyle={styles.wrap} bounces={false}>
        <View style={[styles.container, styles.center]}>
          <Text style={styles.header}>{title}</Text>
          {causes.map((cause, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.button, styles.center]}
              onPress={
                () => navigator.push({ name: 'NewsScene', passProps: { topic: cause.name } })
              }
            >
              <View style={styles.center}>
                <Icon name={cause.icon} size={40} style={styles.icon} />
                <Text style={styles.label}>{cause.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={logout} style={[styles.button, styles.center]}>
            <Text style={styles.label}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Image>
  );
}

HomeScene.propTypes = {
  navigator: PropTypes.object.isRequired,
  feathers: PropTypes.object.isRequired,
};

export default connectFeathers(HomeScene);
