import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SecondaryFont, MainFont } from '../fonts';
import { ContactUs } from '../components';
import { GREEN, WINDOW_WIDTH } from '../constants';

export default function AboutScene() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <MainFont>
        <Text style={styles.header}>About Us</Text>
      </MainFont>
      <SecondaryFont>
        <Text style={styles.text}>
          Founded in 1989, the New Orleans Mission provided Shelter, Food and Spiritual guidance to a growing number of homeless men who were living on the streets of our city.{'\n\n'}

          Today, the Mission is the largest faith-based private service provider to the homeless population of the greater New Orleans area and the economically disadvantaged residents of Central City.{'\n\n'}

          Our core value is about changing lives and leading people to a loving relationship with Jesus Christ. We do this through a variety of programs and services that are designed to holistically meet the mental, physical, social, and spiritual needs of the individuals we serve.{'\n\n'}

          Our strategy is to RESCUE people from homelessness, strengthen the RECOVERY efforts of the people seeking our support, and fostering their successful RE-ENGAGEMENT into society as healthy, disciplined skilled people ready to lead a sustainable productive purpose-driven life.{'\n'}
        </Text>
      </SecondaryFont>
      <ContactUs textStyle={styles.text} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 30,
    color: GREEN,
  },
  text: {
    fontSize: WINDOW_WIDTH / 25,
    lineHeight: 20,
    marginVertical: 10,
  },
});
