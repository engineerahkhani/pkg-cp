import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { scale } from 'pkg-cp';
import PhoneInput from './react-native-phone-input'
import ModalPickerImage from './ModalPickerImage'

const PhoneNumber = require('awesome-phonenumber');
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal'
var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};
class CPPhoneInput extends Component {

    constructor() {
        super()
        this.onPressFlag = this.onPressFlag.bind(this)
        this.selectCountry = this.selectCountry.bind(this)
        this.state = {
            pickerData: null,
            cca2: 'IR'
        }

    }


    /* onPressFlag(){
         this.props.disablePressFlag || this.refs.myCountryPicker.open()
     }
 */
    // selectCountry(country){
    //     this.refs.phone.selectCountry(country.iso2)
    //     this.props.onChangeCountry(country.dialCode)
    // }
    validatePhone = (text) => {
        let phone = fixNumbers(text);
        var pn = new PhoneNumber(phone, this.state.cca2.toLowerCase());
        let countryCode = PhoneNumber.getCountryCodeForRegionCode(this.state.cca2.toLowerCase());
        if(phone.charAt(0)==0 && countryCode==98 ){
            phone = phone.substr(1)
        }
        
        this.props.onChangePhoneNumber({
            phone,
            isValid: pn.isMobile(),
            countryCode,
            formatedPhone: `+${countryCode}${phone}`
        })
    }

    onPressFlag() {
        this.props.disablePressFlag || this.countryPicker.openModal()
    }

    selectCountry(country) {
        this.phone.selectCountry(country.cca2.toLowerCase())
        this.setState({ cca2: country.cca2 })
        // this.props.onChangeCountry(country.dialCode)
    }

    render() {
        return (
            <View style={styles.container}>
                <PhoneInput
                    initialCountry='ir'
                    ref={(ref) => {
                        this.phone = ref;
                    }}
                    onPressFlag={this.onPressFlag}
                    onChangePhoneNumber={
                        (phone) => this.validatePhone(phone)
                    }
                    textFiledProps={{
                        ...this.props.textFiledProps,

                    }}
                    textComponent={this.props.textComponent}
                    value={this.props.value}
                    disablePressFlag={this.props.disablePressFlag}
                />
                <CountryPicker
                    countryList={COUNTERIS}
                    ref={(ref) => {
                        this.countryPicker = ref;
                    }}
                    onChange={(value) => this.selectCountry(value)}
                    translation='eng'
                    cca2={this.state.cca2}
                    filterable={true}
                    filterPlaceholder={null}
                    excludeCountries={['IL']}
                >
                    <View></View>
                </CountryPicker>

                {/*<ModalPickerImage
                    ref='myCountryPicker'
                    data={this.state.pickerData}
                    onChange={(country)=>{ this.selectCountry(country) }}
                    cancelText='Cancel'
                />*/}
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})

export default CPPhoneInput;
const COUNTERIS = ["IR", "US", "CA", "AU", "GB", "DE",
    "AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AT", "AZ", "BS", "BH", "BD", "BB", "BY",
    "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "VG", "BN", "BG", "BF", "BI", "KH", "CM", "CV",
    "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CK", "CR", "HR", "CU", "CW", "CY", "CZ", "CD", "DK", "DJ", "DM",
    "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE",
    "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "HN", "HK", "HU", "IS", "IN", "ID",
    "IQ", "IE", "IM", "IT", "CI", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "XK", "KW", "KG", "LA", "LV", "LB",
    "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX",
    "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF",
    "KP", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "CG", "RO", "RU",
    "RW", "RE", "BL", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB",
    "SO", "ZA", "GS", "KR", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "ST", "TW", "TJ", "TZ", "TH", "TL",
    "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "UM", "VI", "UY", "UZ", "VU", "VA",
    "VE", "VN", "WF", "EH", "YE", "ZM", "ZW", "AX"]
