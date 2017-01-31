import React from 'react';
import { ScrollView, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { ContactUs } from '../components';
import { SecondaryFont, MainFont } from '../fonts';
import { WINDOW_WIDTH, PURPLE, GREEN } from '../constants';

export default function VolunteerScene() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <MainFont>
        <Text style={styles.header}>Volunteer</Text>
      </MainFont>
      <SecondaryFont>
        <Text style={styles.text}>
          Volunteers are vital to the heartbeat of the New Orleans Mission. Our Bridge ministry is an opportunity for groups or individuals to offer help and love to hurting people.{'\n\n'}

          Outreach is great for groups, families and individuals to bring food to impoverished areas.  Feeding is also good for families, small groups or individuals to serve breakfast, lunch or dinner.{'\n\n'}

          There are so many other opportunities to connect talented individuals with skilled labor. Please submit this form so we can better assess how you can help or call our volunteer coordinator today for details.
        </Text>
      </SecondaryFont>
      <TouchableOpacity
        onPress={() => Linking.openURL('http://www.neworleansmission.org/volunteer/volunteer-today')}
        style={styles.button}
      >
        <SecondaryFont>
          <Text style={styles.buttonText}>VOLUNTEER NOW</Text>
        </SecondaryFont>
      </TouchableOpacity>
      <ContactUs textStyle={styles.text} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    color: GREEN,
  },
  text: {
    fontSize: WINDOW_WIDTH / 28,
    lineHeight: 20,
    marginVertical: 10,
  },
  button: {
    width: WINDOW_WIDTH * 0.8,
    height: 50,
    borderRadius: 10,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
