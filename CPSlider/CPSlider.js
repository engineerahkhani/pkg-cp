import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import MultiSlider from './MultiSlider';
import { Number } from '../Number';
import { Icon, Text, PersianNumber, scale, ElevatedView } from '../index';
import { Metrics } from '../../../App/Themes/index';

const { height, width } = Dimensions.get('window');
const CustomMarker = () => (
  <ElevatedView elevation={5} style={{ margin: 3, padding: scale(25) }}>
    <Icon name="circle" color="#ff5c77" size={scale(65)} />
  </ElevatedView>
);

export default class CPSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: props.minValue,
      maxValue: props.maxValue
    };
  }

  handelChangeValue = value => {
    const [minValue, maxValue] = value;
    this.setState(
      state => {
        return { minValue, maxValue };
      },
      () => this.props.onChange(this.state)
    );
  };
  convertPrice = price => {
    return new Number(price)
      .addCommas()
      .toPersian()
      .show();
  };
  render() {
    const { minValue, maxValue} = this.state;
    const {color} = this.props;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: scale(60)
          }}
        >
          <Text size={40}>
            <PersianNumber number={minValue} /> تومان
          </Text>
          <Text size={40}>
            <PersianNumber number={maxValue} /> تومان
          </Text>
        </View>
        <MultiSlider
          values={[minValue, maxValue]}
          sliderLength={width - Metrics.paddingHorizontal * 2}
          onValuesChange={value => this.handelChangeValue(value)}
          min={10000}
          max={5000000}
          step={10000}
          customMarker={CustomMarker}
          color={color}
        />
      </View>
    );
  }
}
