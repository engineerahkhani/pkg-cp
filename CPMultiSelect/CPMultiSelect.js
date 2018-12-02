import React from 'react';
import { View } from 'react-native';
import MultiSelect from './react-native-multiple-select';

export default (CPMultiSelect = props => {
  return (
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
        submitButtonColor="#00a651"
        textColor="#000"
        submitButtonText="انتخاب"
        fontSize={34}
      />
      
  );
});
