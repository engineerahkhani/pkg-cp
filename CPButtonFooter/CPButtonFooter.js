import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Ripple, Icon, Text, scale, WaveIndicator } from '../index';

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
          backgroundColor: props.backgroundColor || 'green'
        }}
      >
        {props.loading ? (
          <WaveIndicator
            count={3}
            size={30}
            color={props.indicatorColor}
          />
        ) : (
            <Text size={42} style={{ color: '#fff', textAlign: 'center' }}>
              {props.text}
            </Text>
          )}

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
