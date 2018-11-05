import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from './react-native-picker-select';
import { scale, Text } from 'pkg-cp';

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
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <Text
          size={32}
          style={{
            textAlign: headerAlign || 'right',
            paddingBottom: scale(5),
            color
          }}
        >
          {title}
        </Text>
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
        />
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
