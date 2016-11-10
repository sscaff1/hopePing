import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WINDOW_WIDTH } from '../constants';

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WINDOW_WIDTH / 5,
  },
  icon: {
    fontSize: 20,
  },
});

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
    activeTextColor: 'navy',
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
        <Icon name={icon} style={styles.icon} />
        <Text style={{ color: textColor, fontWeight }}>{name}</Text>
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
      backgroundColor: 'navy',
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
