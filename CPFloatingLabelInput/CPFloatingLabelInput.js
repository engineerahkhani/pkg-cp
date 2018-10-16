import React, {Component} from 'react';
import {TextField} from 'react-native-material-textfield';
import { scale} from '../index';

export default FloatingLabelInput = (props) => {
    return (
        <TextField
            {...props}
            fontSize={scale(43)}
            fontFamily='IRANSansMobile'
            textColor={props.textColor}
            baseColor={props.baseColor}
            containerStyle={[{marginTop:scale(15)},props.containerStyle]}
            inputContainerStyle={{alignItems: 'flex-end'}}
            tintColor={props.tintColor }
            style={[{textAlign: 'right'},props.style]}
            label={props.label}
            labelFontSize={ scale(38)}
            labelTextStyle={ {fontFamily:'IRANSansMobile'}}
            value={props.value}
            labelHeight={scale(48)}
            labelPadding={scale(18)}
            inputContainerPadding={scale(40)}
            lineWidth={scale(props.lineWidth||1.5)}
            activeLineWidth={scale(props.activeLineWidth||3)}
            disabledLineWidth={scale(props.lineWidth||1)}
            onChangeText={text => props.onChangeText(text)}
        />
    )
}