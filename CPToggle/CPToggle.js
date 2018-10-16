import React from 'react';
import { View, Switch, Platform } from 'react-native';
import { Text, scale } from 'pkg-cp';

export default (CPToggle = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: scale(-10)
      }}
    >
      <Text
        fontFamily="IRANSansMobile"
        size={props.fontSize}
        style={{ marginRight: scale(10) }}
        color={props.value ? props.fontColor : '#d3d4cd'}
      >
        {props.text}
      </Text>
      <Switch
        onTintColor={props.color}
        thumbTintColor={
          props.value
            ? Platform.OS === 'ios'
              ? '#fff'
              : props.color
            : Platform.OS === 'ios'
              ? '#ccc'
              : '#d3d4cd'
        }
        tintColor={'#d3d4cd'}
        onValueChange={value => props.onValueChange(value)}
        value={props.value}
      />
    </View>
  );
});
