import React from 'react';
import { ScrollView, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { WINDOW_WIDTH, PURPLE, GREEN } from '../constants';

export default function VolunteerScene() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.header}>Volunteer</Text>
      <Text style={styles.text}>
        Volunteers are vital to the heartbeat of the New Orleans Mission. Our Bridge ministry is an opportunity for groups or individuals to offer help and love to hurting people.{'\n\n'}

        Outreach is great for groups, families and individuals to bring food to impoverished areas.  Feeding is also good for families, small groups or individuals to serve breakfast, lunch or dinner.{'\n\n'}

        There are so many other opportunities to connect talented individuals with skilled labor. Please submit this form so we can better assess how you can help or call our volunteer coordinator today for details.
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL('http://www.neworleansmission.org/volunteer/volunteer-today')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Volunteer Now</Text>
      </TouchableOpacity>
      <Text style={[styles.text, styles.center]}>
        1134 Baronne St., New Orleans, LA 70113{'\n'}
        P.O. Box 56565, New Orleans, LA 70156{'\n'}
        Phone: 504-523-2116{'\n'}
        Email: volunteer@neworleansmission.org{'\n'}
        Website: http://www.neworleansmission.org/
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    color: GREEN,
    fontFamily: 'Open Sans',
  },
  subheader: {
    fontSize: 16,
    color: PURPLE,
    fontFamily: 'Open Sans',
  },
  text: {
    marginVertical: 10,
    fontFamily: 'Open Sans',
  },
  center: {
    textAlign: 'center',
  },
  button: {
    width: WINDOW_WIDTH * 0.8,
    height: 50,
    borderRadius: 10,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
