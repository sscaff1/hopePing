import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { PURPLE, GREEN } from '../constants';

export default function AboutScene() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.text}>
        Founded in 1989, the New Orleans Mission provided Shelter, Food and Spiritual guidance to a growing number of homeless men who were living on the streets of our city.{'\n\n'}

        Today, the Mission is the largest faith-based private service provider to the homeless population of the greater New Orleans area and the economically disadvantaged residents of Central City.{'\n\n'}

        Our core value is about changing lives and leading people to a loving relationship with Jesus Christ. We do this through a variety of programs and services that are designed to holistically meet the mental, physical, social, and spiritual needs of the individuals we serve.{'\n\n'}

        Our strategy is to RESCUE people from homelessness, strengthen the RECOVERY efforts of the people seeking our support, and fostering their successful RE-ENGAGEMENT into society as healthy, disciplined skilled people ready to lead a sustainable productive purpose-driven life.
      </Text>
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
  },
  subheader: {
    fontSize: 16,
    color: PURPLE,
  },
  text: {
    marginVertical: 10,
  },
  center: {
    textAlign: 'center',
  },
});
