import React, { Component } from 'react';
import { ScrollView, View, Platform, StyleSheet } from 'react-native';
import {
  FloatingLabelInput,
  Loading,
  Ripple,
  scale,
  Text,
  Icon
} from '../index';

export default class CPListSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      selected: props.selected,
      data: props.data,
      initData: props.data,
      type: props.type
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.type !== nextProps.type) {
      this.setState(state => {
        return {
          data: nextProps.data,
          initData: nextProps.data,
          selected: nextProps.selected,
          type: nextProps.type,
          inputValue: null
        };
      });
    }
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
    this.setState({ inputValue: text });
    let updated = this.state.initData.filter(
      item => item.title.search(text) !== -1
    );
    this.setState({ data: updated });
  };

  render() {
    const { data, inputValue } = this.state;
    const {
      filterAble,
      radioStyle,
      style,
      loading,
      type,
      iconColor
    } = this.props;

    return loading ? (
      <Loading />
    ) : (
      <View style={[{ flex: 1, marginTop: scale(10) }]}>
        {filterAble && (
          <View style={[style, { marginTop: 0 }]}>
            <FloatingLabelInput
              value={inputValue}
              onChangeText={text => this.handelFilterInputChange(text)}
              label="جستجوی گل"
              tintColor="#000"
              textColor="#000"
              baseColor="#000"
            />
          </View>
        )}
        <ScrollView style={[style, { marginTop: 0 }]}>
          {data.map(item => {
            return (
              <Ripple
                disabled={item.disabled}
                key={item.id}
                onPress={() => this.toggleSelected(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: radioStyle ? 'flex-end' : 'space-between',
                  paddingVertical: scale(33),
                  paddingRight: scale(5),
                  borderBottomWidth:
                    Platform.OS === 'ios' ? StyleSheet.hairlineWidth : scale(2),
                  borderBottomColor: '#ccc'
                }}
              >
                {radioStyle || (
                  <Text
                    size={scale(15)}
                    // color={this.isSelected(item) ? 'green' : 'transparent'}
                    color={type === 'branches' ? '#000' : 'transparent'}
                  >
                    {item.distance}
                  </Text>
                )}
                {type === 'branches' && (
                  <Text
                    style={{ marginRight: scale(30) }}
                    size={30}
                    color="#777"
                  >
                    ({item.distance})
                  </Text>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    size={36}
                    style={{
                      marginRight: scale(5),
                      color: '#373737'
                    }}
                  >
                    {item.title}
                  </Text>
                  {radioStyle ? (
                    <Icon
                      style={{ marginLeft: scale(33) }}
                      size={scale(53)}
                      color={this.isSelected(item) ? iconColor : '#c2c2c2'}
                      name={this.isSelected(item) ? 'circle' : 'circle-o'}
                    />
                  ) : (
                    <Icon
                      style={{ marginLeft: scale(33) }}
                      name={this.isSelected(item) ? 'check-circle' : 'circle'}
                      type
                      color={
                        item.attribute === '#ffffff'
                          ? this.isSelected(item)
                            ? '#f0f0f0'
                            : '#e9e9e9'
                          : item.attribute ||
                            (this.isSelected(item) ? iconColor : '#d7d7d7')
                      }
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
