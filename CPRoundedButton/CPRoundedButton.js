import React from 'react';
import { View, Platform } from 'react-native';
import { ElevatedView, Ripple, Icon, scale ,WaveIndicator} from '../index';

export default (CPRoundedButton = props => {
  return (
    <ElevatedView
      elevation={props.elevation||8}
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 100,
          margin: 4,
          overflow: Platform.OS === 'ios' ? 'visible' : 'hidden'
        },
        props.style
      ]}
    >
      <Ripple disabled={props.disabled} onPress={() => props.onPress()}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            minHeight: scale(60),
            minWidth: scale(60),
            margin: scale(25)
          }}
        >
          {props.loading ? (
            <WaveIndicator count={4} size={20} color={props.indicatorColor} />
          ) : (
            <Icon
              name={props.name}
              color={props.iconColor}
              size={scale(50)}
              onPress={() => alert()}
              type={props.iconType}
            />
          )}
        </View>
      </Ripple>
    </ElevatedView>
  );
});
