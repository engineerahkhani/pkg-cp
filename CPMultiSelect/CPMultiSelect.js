import React from 'react';
import { View } from 'react-native';
import MultiSelect from './react-native-multiple-select';
import { scale, Text } from '../index';

export default (CPMultiSelect = props => {
  return (
    <View>
      <MultiSelect
        // hideTags
        items={props.items}
        uniqueKey={props.uniqueKey}
        //ref={(component) => { this.multiSelect = component }}
        onSelectedItemsChange={props.onSelectedItemsChange}
        selectedItems={props.selectedItems}
        selectText={props.selectText}
        searchInputPlaceholderText="جستجو"
        onChangeInput={text => console.log(text)}
        // altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey={props.displayKey}
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        textColor="#000"
        submitButtonText="انتخاب"
        fontSize={34}
      />
      {props.showMessage && props.selectedItems.length === 0 && (
        <Text style={{ color: 'red', textAlign: 'right' }}>{props.name} الزامی است.</Text>
      )}
    </View>
  );
});
