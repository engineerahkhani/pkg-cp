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
    {props.angleDown && (
        <Icon
          name={'angle-down'}
          size={props.iconSize}
          type
          color={props.iconColor}
          style={[{marginRight:scale(30)}]}
        />
      )}
      {props.text && (
        <Text
          fontFamily={props.fontFamily}
          color={props.fontColor}
          size={props.fontSize}
          style={props.textStyle}
          numberOfLines={1}
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
