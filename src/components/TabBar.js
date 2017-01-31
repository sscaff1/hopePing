import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Animated, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SecondaryFont } from '../fonts';
import { WINDOW_WIDTH, PURPLE } from '../constants';

export default class TabBar extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    renderTab: PropTypes.func,
    underlineStyle: View.propTypes.style,
    containerWidth: PropTypes.number.isRequired,
    scrollValue: PropTypes.object.isRequired,
    style: View.propTypes.style,
  };

  static defaultProps = {
    activeTextColor: PURPLE,
    inactiveTextColor: 'black',
    backgroundColor: null,
    containerWidth: WINDOW_WIDTH,
  };

  constructor(props, context) {
    super(props, context);
    this.renderTab = this.renderTab.bind(this);
  }

  renderTab(name, icon, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    return (
      <TouchableOpacity key={name} style={styles.button} onPress={() => onPressHandler(page)}>
        <Icon name={icon} style={[styles.icon, { color: textColor, fontWeight }]} />
        <SecondaryFont>
          <Text style={[styles.tabText, { color: textColor, fontWeight }]}>{name}</Text>
        </SecondaryFont>
      </TouchableOpacity>
    );
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: PURPLE,
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View
        style={[
          styles.tabs,
          { backgroundColor: this.props.backgroundColor },
          this.props.style,
        ]}
      >
        {this.props.tabs.map((tab, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(tab.name, tab.icon, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View style={[tabUnderlineStyle, { left }, this.props.underlineStyle]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ccc',
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WINDOW_WIDTH / 5,
  },
  icon: {
    fontSize: 26,
  },
  tabText: {
    fontSize: WINDOW_WIDTH / 36,
  },
});
