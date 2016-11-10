import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Title } from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import NewsScene from './NewsScene';
import DonateScene from './DonateScene';
import AboutScene from './AboutScene';
import VolunteerScene from './VolunteerScene';
import SocialScene from './SocialScene';
import { TabBar } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    paddingTop: 10,
  },
});

export default function HomeScene() {
  return (
    <View style={styles.container}>
      <Header>
        <Title>The New Orleans Mission</Title>
      </Header>
      <ScrollableTabView
        style={styles.scrollview}
        renderTabBar={props => <TabBar {...props} />}
        tabBarPosition="bottom"
      >
        <NewsScene tabLabel={{ name: 'News', icon: 'newspaper-o' }} />
        <SocialScene tabLabel={{ name: 'Social', icon: 'facebook' }} />
        <DonateScene tabLabel={{ name: 'Donate', icon: 'hotel' }} />
        <VolunteerScene tabLabel={{ name: 'Volunteer', icon: 'plus-square' }} />
        <AboutScene tabLabel={{ name: 'About Us', icon: 'info' }} />
      </ScrollableTabView>
    </View>
  );
}
