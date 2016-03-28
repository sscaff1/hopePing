import React, {Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');

export const NavBar = ({navigator}) => (
  <View style={styles.navbar}>
    {navigator.getCurrentRoutes().length > 1 ? (
      <TouchableOpacity onPress={() => navigator.pop()}>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 3.5}}>
          <Icon name="keyboard-arrow-left" size={32} color="white"/>
          <Text style={styles.backButton}>Back</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <Text></Text>
    )}
    <Text style={styles.title}>{navigator.getCurrentRoutes()[navigator.getCurrentRoutes().length-1].name}</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    height: 75,
    top: 0,
    left: 0,
    paddingTop: 25,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#FF9800',
  },
  title: {
    fontSize: 26,
    color: 'white',
    fontWeight: '900',
    textAlign:'center',
  },
  backButton: {
    fontSize: 22,
    color: 'white',
    fontWeight: '700',
    textAlign:'center',
    position: 'absolute',
  }
})
