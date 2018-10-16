import React, { Component } from 'react';
import { View } from 'react-native';
import { FloatingLabelInput, Icon, scale, Ripple } from '../index';

export default class PasswordInput extends Component {
  state = {
    hidePassword: true
  };
  onPress = () =>
    this.setState(
      state => ({ hidePassword: !state.hidePassword }),
      () => console.log(this.state)
    );
  render() {
    const { hidePassword } = this.state;
    const { tintColor } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <FloatingLabelInput
          {...this.props}
          secureTextEntry={hidePassword}
          containerStyle={{ flex: 1, flexGrow: 1, flexBasis: 0 }}
        />
        {/* <Ripple
          style={{ position: 'absolute', overflow: 'hidden' }}
          onPress={this.onPress}
        >
          <Icon
            size={scale(70)}
            type="awsome"
            name={hidePassword ? 'eye-slash' : 'eye'}
            style={{
              color: tintColor,
              transform: [{ rotateY: '180deg' }],
              backgroundColor: 'transparent'
            }}
          />
        </Ripple> */}
      </View>
    );
  }
}
