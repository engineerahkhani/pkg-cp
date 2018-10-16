import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Ripple, Icon, Text, scale } from '../index';

export const ButtonFooter = props => {
  return (
    <Ripple disabled={props.disabled} onPress={() => props.onPress()}>
      <ImageBackground
        source={props.source}
        style={{
          width: '100%',
          maxHeight: props.height,
          height: props.height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: props.disabled
            ? '#989898'
            : props.backgroundColor || 'green'
        }}
      >
        <Text size={42} style={{ color: '#fff', textAlign: 'center' }}>
          {props.text}
        </Text>
        {props.icon && (
          <Icon
            size={scale(43)}
            style={{ marginLeft: scale(10), backgroundColor: 'transparent' }}
            name={props.icon}
            color="#fff"
          />
        )}
      </ImageBackground>
    </Ripple>
  );
};
