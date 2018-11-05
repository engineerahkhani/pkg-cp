import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale } from 'pkg-cp';

const { width } = Dimensions.get('window');

const SCREEN_WIDTH = width;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  },
  buttonView: {
    width: SCREEN_WIDTH,
    padding: scale(24),
    borderTopWidth: scale(1.5),
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  bottomPicker: {
    width: SCREEN_WIDTH
  },
  flag: {
    height: scale(80),
    width: scale(80),
    marginTop: scale(-5),
    marginRight: scale(10),
    borderWidth: scale(1.5),
    borderColor: '#cecece',
    backgroundColor: 'transparent'
  },
  text: {
    height: scale(60),
    padding: 0,
    justifyContent: 'center'
  }
});
