import React, {Component} from 'react';
import {TextField} from 'react-native-material-textfield';
import { scale} from '../index';

export default FloatingLabelInput = (props) => {
    return (
        <TextField
            {...props}
            fontSize={scale(43)}
            fontFamily='IRANSansMobile'
            textColor={props.textColor||'#000'}
            baseColor={props.baseColor||'#999'}
            containerStyle={[{marginTop:scale(15)},props.containerStyle,]}
            inputContainerStyle={{alignItems: 'flex-end',}}
            tintColor={props.tintColor ||'#999' }
            style={[{textAlign: 'right'},props.style]}
            label={props.label}
            labelFontSize={ scale(38)}
            labelTextStyle={ {fontFamily:'IRANSansMobile'}}
            value={props.value}
            labelHeight={scale(58)}
            labelPadding={scale(28)}
            inputContainerPadding={scale(20)}
            lineWidth={scale(props.lineWidth||1.5)}
            activeLineWidth={scale(props.activeLineWidth||3)}
            disabledLineWidth={scale(props.lineWidth||3)}
            onChangeText={text => props.onChangeText(text)}
            autoCorrect={false}
            multiline={props.multiline}
        />
    )
}