import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { Ripple, Icon, Text, scale, Modal } from '../index';
import Img from './img.png';

export default (CPAlert = props => {
  return (
    <Modal
      visible={props.visible}
      toggleModal={value => this.toggleModal()}
      disableSwipe
      disableBackDropPress
    >
      <View
        style={{
          backgroundColor: '#fff',
          padding: scale(52),
          borderRadius: 4
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <View>
          <Text style={{textAlign:'right'}}>{props.title}</Text>
          {
            props.subTitle && <Text style={{textAlign:'right'}}>{props.subTitle}</Text>
          }
          </View>
          <Image
            source={Img}
            style={{
              width: scale(80),
              height: scale(90),
              marginLeft: scale(52)
            }}
            resizeMode={'contain'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scale(52)
          }}
        >
          <Ripple
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
            <Text color={'#fff'}>بله</Text>
          </Ripple>
        </View>
      </View>
    </Modal>
  );
});
