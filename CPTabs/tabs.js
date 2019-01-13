import React, { Component } from 'react';
import {
  StyleSheet, // CSS-like styles
  TouchableOpacity, // Pressable container
  View // Container component
} from 'react-native';
import { scale, Text, ElevatedView } from 'pkg-cp';
import { Metrics } from '../../../App/Themes/index';

export default class Tabs extends Component {


  textAlign = index => {
    return 'center'
    if (index === this.props.items.length - 1) return 'right';
    switch (index) {
      case 0:
        return 'left';
      default:
        return 'center';
    }
  };
  getStyle = index => [
    {
      flex: 1,
      paddingVertical: scale(25),
      paddingHorizontal: Metrics.paddingHorizontal
    },
    index === this.props.activeTab
      ? {
          borderBottomColor: this.props.borderColor,
          borderBottomWidth: scale(5.5)
        }
      : {
          borderBottomWidth: scale(1.2),
          borderBottomColor: '#ccc'
        }
  ];
  // Pull children out of props passed from App component
  render({ children, borderColor, fontSize,disabled } = this.props) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          {children.map(({ props: { title, badgeCount } }, index) => (
            <TouchableOpacity
              disabled={disabled}
              style={this.getStyle(index)}
              // Change active tab
              onPress={() =>this.props.onPressTab(index)}
              // Required key prop for components generated returned by map iterator
              key={index}
            >
              <Text
                size={fontSize || 35.8}
                style={{
                  color: index === this.props.activeTab ? '#252525' : '#b7b7b7',
                  textAlign: this.textAlign(index)
                }}
              >
                {title}
              </Text>
              {badgeCount && (
                <ElevatedView
                  elevation={6}
                  style={{
                    position: 'absolute',
                    top: scale(10),
                    left: scale(30),
                    backgroundColor:
                      index === this.props.activeTab ? borderColor : '#ccc',
                    borderRadius: 100,
                    height: scale(60),
                    width: scale(60),
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text
                    fontFamily="IRANSansMobile(FaNum)_Light"
                    size={35}
                    style={{ color: '#fff' }}
                  >
                    {badgeCount}
                  </Text>
                </ElevatedView>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {/* Content */}
        <View style={{ flex: 1 }}>{children[this.props.activeTab]}</View>
      </View>
    );
  }
}
