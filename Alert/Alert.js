import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { Ripple, Icon, Text, scale, Modal,WaveIndicator } from '../index';

export default (CPAlert = props => {
  return (
    <Modal
      visible={props.visible}
      toggleModal={value => props.toggleModal(value)}
      disableSwipe
      disableBackDropPress={!props.enableBackDropPress}
    >
      <View
        style={{
          backgroundColor: '#fff',
          padding: scale(52),
          borderRadius: 4,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
        <Icon type size={scale(50)} name={props.icon} color={props.color}/>
          <View>
            <Text color={'#000'} style={{ textAlign: 'right' }}>{props.title}</Text>
            {props.subTitle && (
              <Text style={{ textAlign: 'right' }}>{props.subTitle}</Text>
            )}
          </View>
          
        </View>
          {props.childComponent && { ...props.childComponent }}
        {props.hideButtons ||<View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scale(52)
          }}
        >
          <Ripple
            disabled={props.loaidng}
            onPress={() => props.onCancelPress()}
            style={{
              borderRadius: 4,
              backgroundColor: '#fafafa',
              paddingVertical: scale(15),
              paddingHorizontal: scale(75),
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text color={'#333'}>خیر</Text>
          </Ripple>
          <Ripple
            onPress={() => props.onOkPress()}
            disabled={props.disabled}
            style={{
              borderRadius: 4,
              backgroundColor: '#00a651',
              paddingVertical: scale(15),
              paddingHorizontal: scale(75),
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: scale(52)
            }}
          >
           {
             props.loading?<WaveIndicator count={3} size={30} color={'#fff'} />:
             <Text color={'#fff'}>بله</Text>
           }
            
          </Ripple>
        </View>}
      </View>
    </Modal>
  );
});
CPAlert.defaultProps={
  icon:'exclamation-triangle',
  color:'#ff5c77'
}