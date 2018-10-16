import React from 'react';
import { Text, Platform } from 'react-native';
import { scale } from 'pkg-cp';
import { fontSize } from '../index';

export const CPText = props => {
  const fontFamily = () => {
    if (props.fontFamily) {
      return Platform.OS === 'ios'
        ? props.fontFamily
            .replace('_', '-')
            .replace('(', '')
            .replace(')', '')
        : props.fontFamily;
    } else {
      return 'IRANSansMobile';
    }
  };
  const style = {
    fontFamily: fontFamily(),
    fontSize: scale(fontSize(props.size)),
    color: props.color || '#464646',
    backgroundColor:'transparent',
    ...props.style
  };
  return <Text style={style}>{props.children}</Text>;
};
