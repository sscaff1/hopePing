import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    color: 'green',
    fontFamily: 'Open Sans',
  },
  subheader: {
    fontSize: 16,
    color: 'purple',
    fontFamily: 'Open Sans',
  },
  text: {
    marginVertical: 10,
    fontFamily: 'Open Sans',
  },
  center: {
    textAlign: 'center',
  },
});

export default function VolunteerScene() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.header}>Volunteer Today</Text>
      <Text style={styles.text}>
        Volunteers are vital to the heartbeat of the New Orleans Mission. Our Bridge ministry is an opportunity for groups or individuals to offer help and love to hurting people.

        Outreach is great for groups, families and individuals to bring food to impoverished areas.

        Feeding is also good for families, small groups or individuals to serve breakfast, lunch or dinner.

        There are so many other opportunities to connect talented individuals with skilled labor. Please submit this form so we can better assess how you can help or call our volunteer coordinator today for details.
      </Text>
      <Text style={[styles.subheader, styles.center]}>Contact Us</Text>
      <Text style={[styles.text, styles.center]}>
        1134 Baronne St., New Orleans, LA 70113{'\n'}
        P.O. Box 56565, New Orleans, LA 70156{'\n'}
        Phone: 504-523-2116{'\n'}
        Fax: 504-529-3094{'\n'}
        Email: volunteer@neworleansmission.org{'\n'}
      </Text>
    </ScrollView>
  );
}
