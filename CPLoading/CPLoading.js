import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Platform
} from 'react-native';

export default (CPLoading = ({ loading, ...props }) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            color={'#10ac54'}
            animating={loading}
            size="large"
          />
        </View>
      </View>
    </Modal>
  );
});
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#FFFFFF',
    height: 75,
    width: 75,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
