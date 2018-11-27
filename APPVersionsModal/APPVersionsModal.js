import React, { Component } from 'react';
import { View,Linking } from 'react-native';
import {connect } from 'react-redux';
import { Ripple, Icon, Text, scale, Modal } from '../index';

class APPVersionsModal extends Component {
  
  toggleModal = ()=>{
    const newAppVersion =  { ...this.props.appVersions, optionalUpdate:false  }
    this.props.hideOptionalUpdate(newAppVersion)
  }
  onOkPress = () =>{
    const { link } = this.props.appVersions;

    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log('not supportd');
      }
    });
  }
  render() {
    const { forceUpdate, optionalUpdate } = this.props.appVersions;
    return (
      <Modal
        visible={forceUpdate || optionalUpdate}
        toggleModal={() => this.toggleModal()}
        disableSwipe
        disableBackDropPress={false}
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
              justifyContent: 'flex-end',
              // backgroundColor:'red'
            }}
          >
            <View>
              <Text color={'#000'} fontFamily='IRANSansMobile_Medium' style={{ textAlign: 'right' }}>
                بروز رسانی اپلیکیشن
              </Text>
              <Text  style={{ textAlign: 'right',marginTop:scale(30) }}>
                لطفا نسخه جدید برنامه را دانلود کنید.
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: scale(52)
            }}
          >
            {optionalUpdate && <Ripple
              onPress={() => this.toggleModal()}
              style={{
                borderRadius: 4,
                backgroundColor: '#f3f3f3',
                paddingVertical: scale(15),
                paddingHorizontal: scale(35),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text color={'#333'}>بعدا</Text>
            </Ripple>}
            <Ripple
              onPress={() => this.onOkPress()}
              style={{
                borderRadius: 4,
                backgroundColor: '#00a651',
                paddingVertical: scale(15),
                paddingHorizontal: scale(75),
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft:optionalUpdate? scale(52):0
              }}
            >
              <Text color={'#fff'}>به روز رسانی</Text>
            </Ripple>
          </View>
        </View>
      </Modal>
    );
  }
}


const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = dispatch => ({
  hideOptionalUpdate: newAppVersion => dispatch({ type: 'SET_KEY_VALUE', key:'appVersions',value:newAppVersion }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(APPVersionsModal);
