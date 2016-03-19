import React, {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('window');

const buttons = [
  {name:'Homeless'},
  {name:'Medical'},
  {name:'Enviromental'},
  {name:'Arts'},
  {name:'Pets'},
  {name:'Education'},
  {name:'Disaster'},
  {name:'Human Rights'},
]

export const App = ({navigator}) => (
  <View style={styles.container}>
    <View style={styles.buttonContainer}>
      {buttons.map((button,index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => {navigator.push({name: button.name})}}>
          <Text style={styles.buttonText}>{button.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export const NavBar = ({navigator}) => (
  <View style={styles.navbar}>
    {navigator.getCurrentRoutes().length > 1 ? (
      <Text style={styles.backButton}>Back</Text>
    ) : (
      <Text></Text>
    )}
    <Text style={styles.title}>{navigator.getCurrentRoutes()[navigator.getCurrentRoutes().length-1].name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 75,
    top: 0,
    left: 0,
    paddingTop: 25,
    backgroundColor: '#FF9800',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: '900',
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    height: 100,
    width: 150,
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
    fontSize: 18,
  }
});
