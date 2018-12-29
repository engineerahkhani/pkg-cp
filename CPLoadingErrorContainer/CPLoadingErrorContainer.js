import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ImageBackground,
  Image
} from 'react-native';
// import DropdownAlert from 'react-native-dropdownalert';
import {
  Loading,
  ElevatedView,
  DropdownAlert,
  fontSize,
  scale
} from '../index';
import { connect } from 'react-redux';
import metrics from '../../../App/Themes/Metrics';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    maxHeight: STATUSBAR_HEIGHT
  },
  appBar: {
    width: '100%'
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B'
  }
});
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class Container extends Component {
  render() {
    const {
      loading,
      errors,
      send,
      disPatchClose,
      message,
      onRefresh,
      theme
    } = this.props;
    const errorItems = errors.filter(item => item.errorMessage !== undefined);
    return (
      <View style={styles.container}>
        <StatusBar  />
        {errorItems.length > 0 &&
          this.dropdown &&
          this.dropdown.alertWithType(
            'error',
            'خطا',
            errorItems[0].errorMessage
          )}
        {this.dropdown &&
          message &&
          message.type === 'success' &&
          this.dropdown.alertWithType('success', 'ok', message.message)}
        {this.dropdown &&
          message &&
          message.type === 'error' &&
          this.dropdown.alertWithType('error', 'خطا', message.message)}
        {loading ? (
          <Loading color={theme.header_bg_color} send={!!send} />
        ) : (
          this.props.children
        )}
        <DropdownAlert
          errorColor="#ffc1c1"
          successColor="#ace2c7"
          titleStyle={{ textAlign: 'right', display: 'none' }}
          imageStyle={{ display: 'none' }}
          messageStyle={{
            textAlign: 'center',
            color: '#000',
            fontFamily: 'IRANSansMobile',
            fontSize: fontSize(scale(33))
          }}
          defaultContainer={{justifyContent:'center',alignItems:'center',minHeight:metrics.headerHeight}}
          defaultTextContainer={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
          closeInterval={7500}
          ref={ref => (this.dropdown = ref)}
          updateStatusBar={false}
          tapToCloseEnabled={true}
          panResponderEnabled={false}
          replaceEnabled={false}
          endDelta={scale(15)}
          onClose={data => disPatchClose(data)}
          onRefresh={onRefresh}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme:state.theme.data
  };
};
const mapDispatchToProps = dispatch => ({
  disPatch: action =>
    dispatch({ type: 'Navigation/NAVIGATE', routeName: action }),
  disPatchClose: action => dispatch({ type: 'DROP_DOWN_CLOSED', data: action })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
