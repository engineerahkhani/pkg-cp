import React, { Component } from 'react';
import { ScrollView, View, TextInput, Platform } from 'react-native';
import { Icon, Text, Ripple, scale, fontSize } from '../index';

export default class CPListSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.inputValue,
      selected: props.selected,
      data: props.data,
      initData: props.data,
      isFocused: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => {
      return {
        data: nextProps.data,
        initData: nextProps.data,
        selected: nextProps.selected,
        type: nextProps.type,
        inputValue: nextProps.inputValue
      };
    });
  }

  toggleSelected = item => {
    this.setState(
      state => {
        if (this.props.single) {
          return { selected: [item] };
        } else {
          return {
            selected:
              state.selected.find(selected => selected.id === item.id) ===
              undefined
                ? [...state.selected, item]
                : state.selected.filter(filter => filter.id !== item.id)
          };
        }
      },
      () => this.props.onSelectedChange(this.state.selected)
    );
  };

  isSelected = item => {
    return this.state.selected.find(find => find.id === item.id);
  };
  handelFilterInputChange = text => {
    this.props.onInputValueChange(text);
  };
  onFocus = () => this.setState({ isFocused: true });
  onBlur = () => this.setState({ isFocused: false });
  render() {
    const { data, inputValue, isFocused } = this.state;
    const {
      filterAble,
      radioStyle,
      style,
      loading,
      iconPaddinRight,
      disabled,
      borderBottomWidth
    } = this.props;
    return (
      <View style={style}>
        {filterAble && (
          <View
            style={{
              paddingVertical: scale(1),
              backgroundColor: '#fff',
              borderRadius: 4,
              borderColor:'transparent',
              borderBottomColor: '#ccc',
              borderWidth: borderBottomWidth,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <TextInput
              value={inputValue}
              onChangeText={text => this.handelFilterInputChange(text)}
              placeholder="مثلا جردن"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              style={{
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'IRANSansMobile-Light'
                    : 'IRANSansMobile_Light',
                fontSize: fontSize(scale(33)),
                flex: 1,
                flexGrow: 1,
                textAlign: 'right',
                paddingVertical: scale(20),
                marginRight: scale(10)
              }}
              underlineColorAndroid="transparent"
              editable={!disabled}
            />
            <Icon
              name="map-marker"
              type="awsome"
              color="#ccc"
              size={scale(55)}
              style={{ paddingRight: iconPaddinRight || scale(25) }}
            />
          </View>
        )}
        <ScrollView keyboardShouldPersistTaps={'always'}>
          {data.lenght === 0 || !isFocused
            ? null
            : data.map(item => {
                return (
                  <Ripple
                    key={item.id}
                    onPress={() => this.toggleSelected(item)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: radioStyle ? 'flex-end' : 'space-between',
                      padding: scale(15),
                      borderBottomWidth: radioStyle ? 0 : scale(0.5),
                      borderBottomColor: '#d7d7d7'
                    }}
                  >
                    {radioStyle || (
                      <Icon
                        size={scale(20)}
                        name="checked"
                        color={'transparent'}
                      />
                    )}
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text
                        style={{
                          // paddingRight: 10,
                          fontWeight: this.isSelected(item) ? '700' : '100',
                          color: '#373737'
                        }}
                      >
                        {item.name || 'نتیجه ایی یافت نشد.'}
                      </Text>
                      {radioStyle && (
                        <Icon
                          size={scale(20)}
                          name={this.isSelected(item) ? 'circle' : 'circle-o'}
                        />
                      )}
                    </View>
                  </Ripple>
                );
              })}
        </ScrollView>
      </View>
    );
  }
}
