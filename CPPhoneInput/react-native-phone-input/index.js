import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { scale } from '../../index';
import Country from './country';
import Flags from './resources/flags';
import PhoneNumber from './phoneNumber';
import styles from './styles';
import CountryPicker from './countryPicker';
import { TextField } from 'react-native-material-textfield';
import { Text, Ripple } from '../../index';

export default class PhoneInput extends Component {
  static setCustomCountriesData(json) {
    Country.setCustomCountriesData(json);
  }

  constructor(props, context) {
    super(props, context);

    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.getFlag = this.getFlag.bind(this);
    this.getISOCode = this.getISOCode.bind(this);

    const { countriesList, disabled, initialCountry } = this.props;

    if (countriesList) {
      Country.setCustomCountriesData(countriesList);
    }
    const countryData = PhoneNumber.getCountryDataByCode(initialCountry);

    this.state = {
      iso2: initialCountry,
      disabled,
      formattedNumber: '',
      value: null,
      countryData
    };
  }

  componentWillMount() {
    if (this.props.value) {
      this.updateFlagAndFormatNumber(this.props.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, disabled } = nextProps;
    this.setState({ disabled });

    if (value && value !== this.state.value) {
      this.setState({ value });
      this.updateFlagAndFormatNumber(value);
    }
  }

  onChangePhoneNumber(number) {
    // if (this.props.disablePressFlag && number.length < 4) {
    //   return this.setState({ formattedNumber: '' });
    // }

    const actionAfterSetState = this.props.onChangePhoneNumber
      ? () => {
          this.props.onChangePhoneNumber(number);
        }
      : null;
    this.updateFlagAndFormatNumber(number, actionAfterSetState);
  }

  onPressFlag() {
    if (this.props.onPressFlag) {
      this.props.onPressFlag();
    } else {
      if (this.state.iso2) this.picker.selectCountry(this.state.iso2);
      this.picker.show();
    }
  }

  getPickerData() {
    return PhoneNumber.getAllCountries().map((country, index) => ({
      key: index,
      image: Flags.get(country.iso2),
      label: country.name,
      dialCode: `+${country.dialCode}`,
      iso2: country.iso2
    }));
  }

  getCountryCode() {
    const countryData = PhoneNumber.getCountryDataByCode(this.state.iso2);
    return countryData.dialCode;
  }

  getAllCountries() {
    return PhoneNumber.getAllCountries();
  }

  getFlag(iso2) {
    if (this.props.disablePressFlag) {
      return Flags.get('ir');
    }
    return Flags.get(iso2);
  }

  getDialCode() {
    return PhoneNumber.getDialCode(this.state.formattedNumber);
  }

  getValue() {
    return this.state.formattedNumber;
  }

  getNumberType() {
    return PhoneNumber.getNumberType(
      this.state.formattedNumber,
      this.state.iso2
    );
  }

  getISOCode() {
    return this.state.iso2;
  }

  selectCountry(iso2) {
    if (this.state.iso2 !== iso2) {
      const countryData = PhoneNumber.getCountryDataByCode(iso2);
      if (countryData) {
        this.setState(
          {
            iso2,
            countryData,
            // formattedNumber: `+${countryData.dialCode}`
            formattedNumber: ''
          },
          () => {
            if (this.props.onSelectCountry) this.props.onSelectCountry(iso2);
          }
        );
      }
    }
  }

  isValidNumber() {
    return PhoneNumber.isValidNumber(
      this.state.formattedNumber,
      this.state.iso2
    );
  }

  updateFlagAndFormatNumber(number, actionAfterSetState = null) {
    const { allowZeroAfterCountryCode, initialCountry } = this.props;
    let phoneNumber = number;
    if (number) {
      phoneNumber = number.replace(`+${this.state.countryData.dialCode}`, '');
      phoneNumber = this.possiblyEliminateZeroAfterCountryCode(phoneNumber);
      iso2 = PhoneNumber.getCountryCodeOfNumber(phoneNumber);
    }
    this.setState({ formattedNumber: phoneNumber }, actionAfterSetState);
  }

  possiblyEliminateZeroAfterCountryCode(number) {
    return number;
    const dialCode = PhoneNumber.getDialCode(number);
    return number.startsWith(`${dialCode}0`)
      ? dialCode + number.substr(dialCode.length + 1)
      : number;
  }

  focus() {
    this.inputPhone.focus();
  }

  render() {
    const { iso2, formattedNumber, disabled, countryData } = this.state;
    return (
      <View
        style={[
          styles.container,
          this.props.style,
          {
            marginHorizontal: 0,
            borderBottomColor: this.props.textFiledProps.tintColor,
            borderBottomWidth:
              Platform.OS === 'ios' ? StyleSheet.hairlineWidth : scale(1),
          }
        ]}
      >
        <Ripple
          onPress={this.onPressFlag}
          disabled={disabled}
          style={{
            paddingTop: scale(12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden'
          }}
        >
          <Image
            borderRadius={Platform.OS === 'ios' ? 4 : 100}
            resizeMode="cover"
            source={this.getFlag(iso2)}
            style={[styles.flag, this.props.flagStyle]}
            onPress={this.onPressFlag}
          />
          <Text
            style={{
              color: this.props.textFiledProps.textColor,
              fontFamily: 'IRANSansMobile',
              fontSize: scale(43),
            }}
          >
            +{countryData.dialCode}
          </Text>
          
          <Text
            style={{
              color: this.props.textFiledProps.textColor,
              fontSize: scale(60),
              marginHorizontal:scale(10)
            }}
          >
            |
          </Text>
        </Ripple>
        <View
          style={{
            flex: 1,
            marginLeft: scale(this.props.offset || -1),
          }}
        >
          <TextField
            value={formattedNumber}
            {...this.props.textFiledProps}
            onChangeText={text => this.onChangePhoneNumber(text)}
            ref={ref => {
              this.inputPhone = ref;
            }}
            lineWidth={0}
            disabledLineWidth={0}
            activeLineWidth={0}
            underlineColorAndroid="transparent"
            fontSize={scale(43)}
            fontFamily="IRANSansMobile"
            labelFontSize={scale(38)}
            labelTextStyle={{ fontFamily: 'IRANSansMobile' }}
            fontSize={scale(43)}
            labelFontSize={scale(38)}
            labelHeight={scale(48)}
            labelPadding={scale(18)}
            inputContainerPadding={scale(15)}
            // placeholder="9121231234"
            // placeholderTextColor={this.props.textFiledProps.tintColor}
            style={{marginTop:Platform.OS==='ios'?0:scale(5)}}
          />
        </View>
        <CountryPicker
          ref={ref => {
            this.picker = ref;
          }}
          selectedCountry={iso2}
          onSubmit={this.selectCountry}
          buttonColor={this.props.pickerButtonColor}
          buttonTextStyle={this.props.pickerButtonTextStyle}
          cancelText={this.props.cancelText}
          cancelTextStyle={this.props.cancelTextStyle}
          confirmText={this.props.confirmText}
          confirmTextStyle={this.props.confirmTextStyle}
          pickerBackgroundColor={this.props.pickerBackgroundColor}
          itemStyle={this.props.pickerItemStyle}
        />
      </View>
    );
  }
}

PhoneInput.propTypes = {
  textComponent: PropTypes.func,
  initialCountry: PropTypes.string,
  onChangePhoneNumber: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object,
  flagStyle: PropTypes.object,
  textStyle: PropTypes.object,
  offset: PropTypes.number,
  textProps: PropTypes.object,
  onSelectCountry: PropTypes.func,
  pickerButtonColor: PropTypes.string,
  pickerBackgroundColor: PropTypes.string,
  pickerItemStyle: PropTypes.object,
  countriesList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      iso2: PropTypes.string,
      dialCode: PropTypes.string,
      priority: PropTypes.number,
      areaCodes: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  cancelText: PropTypes.string,
  cancelTextStyle: PropTypes.object,
  confirmText: PropTypes.string,
  confirmTextTextStyle: PropTypes.object,
  disabled: PropTypes.bool,
  allowZeroAfterCountryCode: PropTypes.bool
};

PhoneInput.defaultProps = {
  initialCountry: 'us',
  disabled: false,
  allowZeroAfterCountryCode: true
};
