import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from './react-native-picker-select';
import { scale, Text,WaveIndicator } from 'pkg-cp';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: { value: null, label: props.placeholder, id: -1 }
    };
  }

  render() {
    const {
      options,
      title,
      selected,
      onChange,
      containerStyle,
      backgroundColor,
      color,
      textColor,
      headerAlign,
      width,
      filterAble,
      loading,
      disabled,
      filterInputPlaceholder,
      titleColor
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <Text
          size={32}
          style={{
            textAlign: headerAlign || 'right',
            paddingBottom: scale(0),
            color:titleColor||'#999',
          }}
        >
          {title}
        </Text>
        {
          loading ? (
          <WaveIndicator
            count={3}
            size={30}
            color={color}
          />
        ) : (
            <RNPickerSelect
              items={options}
              placeholder={this.state.placeholder}
              value={selected}
              onValueChange={value => onChange(value)}
              color={color}
              width={width}
              backgroundColor={backgroundColor}
              filterAble={filterAble}
              textColor={textColor}
              disabled={disabled}
              filterInputPlaceholder={filterInputPlaceholder}
            />
          )}
      </View>
    );
  }
}
App.defaultProps = {
  placeholder: 'یک مورد را انتخاب کنید'
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  }
});
