/*!
 * react-native-multi-select
 * Copyright(c) 2017 Mustapha Babatunde Oluwaleke
 * MIT Licensed
 */
import { scale } from '../index';

export const colorPack = {
  primary: '#00A5FF',
  primaryDark: '#215191',
  light: '#FFF',
  textPrimary: '#525966',
  placeholderTextColor: '#A9A9A9',
  danger: '#C62828',
  borderColor: '#000',
  backgroundColor: '#b1b1b1'
};

export default {
  footerWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  footerWrapperNC: {
    width: 320,
    flexDirection: 'column'
  },
  subSection: {
    borderBottomWidth: scale(2),
    borderColor: colorPack.borderColor,
    paddingBottom: 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  greyButton: {
    height: 40,
    borderRadius: 5,
    elevation: 0,
    backgroundColor: colorPack.backgroundColor
  },
  indicator: {
    fontSize: 30
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 3,
    paddingRight: 10,
    paddingBottom: 3,
    margin: 3,
    borderRadius: 20,
    borderWidth: 1
  },
  button: {
    paddingVertical:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colorPack.light,
    fontSize: 14,
  },
  selectorView: fixedHeight => {
    const style = {
      flexDirection: 'column',
      // marginBottom: 10,
      elevation: 2
    };
    if (fixedHeight) {
      style.height = 250;
    }
    return style;
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: colorPack.light
    // marginTop:15
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center'
    // height: 55,
    // marginVertical: 10,
  }
};
