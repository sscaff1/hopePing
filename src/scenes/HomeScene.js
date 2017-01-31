import React, { PropTypes } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { connectFeathers } from 'react-native-feathers-connector';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DonateScene from './DonateScene';
import AboutScene from './AboutScene';
import VolunteerScene from './VolunteerScene';
import SocialScene from './SocialScene';
import { TabBar, Header } from '../components';

function HomeScene({ feathers, navigator }) {
  return (
    <View style={styles.container}>
      <Header
        title="New Orleans Mission"
        icon="exit-to-app"
        iconAction={() => Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', onPress: () => null },
            { text: 'OK', onPress: () => feathers.logout().then(() => navigator.resetTo('LoginScene')) },
          ],
        )}
      />
      <ScrollableTabView
        style={styles.scrollview}
        renderTabBar={props => <TabBar {...props} />}
        tabBarPosition="bottom"
      >
        <SocialScene tabLabel={{ name: 'Devotional', icon: 'ios-book-outline' }} />
        <SocialScene tabLabel={{ name: 'Social', icon: 'logo-facebook' }} fromOrganization />
        <DonateScene tabLabel={{ name: 'Donate', icon: 'ios-heart-outline' }} navigator={navigator} />
        <VolunteerScene tabLabel={{ name: 'Volunteer', icon: 'ios-people-outline' }} />
        <AboutScene tabLabel={{ name: 'About Us', icon: 'md-information' }} />
      </ScrollableTabView>
    </View>
  );
}

HomeScene.propTypes = {
  feathers: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    paddingTop: 5,
  },
});

export default connectFeathers(HomeScene);
