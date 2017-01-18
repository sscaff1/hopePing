import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DonateScene from './DonateScene';
import AboutScene from './AboutScene';
import VolunteerScene from './VolunteerScene';
import SocialScene from './SocialScene';
import { TabBar } from '../components';

export default function HomeScene() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>The New Orleans Mission</Text>
      </View>
      <ScrollableTabView
        style={styles.scrollview}
        renderTabBar={props => <TabBar {...props} />}
        tabBarPosition="bottom"
      >
        <SocialScene tabLabel={{ name: 'Devotional', icon: 'newspaper-o' }} />
        <SocialScene tabLabel={{ name: 'Social', icon: 'facebook' }} fromOrganization />
        <DonateScene tabLabel={{ name: 'Donate', icon: 'money' }} />
        <VolunteerScene tabLabel={{ name: 'Volunteer', icon: 'hand-o-up' }} />
        <AboutScene tabLabel={{ name: 'About Us', icon: 'info' }} />
      </ScrollableTabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    paddingTop: 10,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
      },
      android: {
        elevation: 1,
      },
    }),
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 20,
    fontFamily: 'IM Fell French Canon SC',
  },
});
