import React from 'react';
import { Container, Header, Content, View, Button } from 'native-base';
import { Ripple, scale, Text, Icon } from 'pkg-cp';

export default (CPButtonIcon = props => {
  return (
    <Ripple
      disabled={props.disabled}
      onPress={() => props.onPress()}
      style={[{ flexDirection: 'row', alignItems: 'center' }, props.style]}
    >
      {props.text && (
        <Text
          fontFamily={props.fontFamily}
          color={props.fontColor}
          size={props.fontSize}
          style={props.textStyle}
        >
          {props.text}
        </Text>
      )}
      {props.icon && (
        <Icon
          name={props.icon}
          size={props.iconSize}
          type={props.type}
          color={props.iconColor}
          style={props.iconStyle}
        />
      )}
    </Ripple>
  );
});
