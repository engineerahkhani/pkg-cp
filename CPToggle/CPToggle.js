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
        onTintColor={'#ccc'}
        thumbTintColor={
          props.color
        }
        tintColor={'#ccc'}
        onValueChange={value => props.onValueChange(value)}
        value={props.value}
      />
      {
        props.offText &&(
          <Text
          fontFamily="IRANSansMobile"
          size={props.fontSize}
          style={{ marginLeft: scale(10) }}
          color={props.value ? props.fontColor : '#d3d4cd'}
        >
          {props.offText}
        </Text>
        )
      }
    </View>
  );
});
