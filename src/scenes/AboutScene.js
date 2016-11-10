import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    color: 'green',
  },
  subheader: {
    fontSize: 16,
    color: 'purple',
  },
  text: {
    marginVertical: 10,
  },
});

export default function AboutScene() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.subheader}>Our Origins</Text>
      <Text style={styles.text}>
        In 1989, The New Orleans Mission, Inc. was established to address the needs of those living on the streets. The Mission focused primarily on men during the first ten years by providing overnight shelter, daily meals, and spiritual guidance for up to 80 guests daily. Prior to Hurricane Katrina, the New Orleans community rallied to help and the Mission had 28,000 supporters. However, after Hurricane Katrina, the number plummeted to around 2000 supporters. For approximately a decade, the Mission worked hard to simply provide minimum services and make ends meet.
      </Text>
      <Text style={styles.text}>
        But in 2012, the Board of the New Orleans Mission appointed fresh, new leadership to the Mission. Going far beyond providing food and shelter, an expanded vision was formed to significantly extend the reach and impact of those being served.
      </Text>
    </ScrollView>
  );
}
