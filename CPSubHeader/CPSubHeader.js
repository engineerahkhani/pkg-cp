import React from 'react'
import {ImageBackground, StatusBar} from 'react-native';
import {Ripple, Text, Icon, scale, RoundedButton} from "../index";

export default SubHeader = (props) => {
    return (
        <ImageBackground
            style={{
                height: props.headerHight + scale(70),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
                backgroundColor: props.backgroundColor
            }}
            source={props.source}>
            <Text size={41.7} style={{color: '#fff', paddingRight: props.paddingRight}}>{props.title}</Text>

        </ImageBackground>
    )
}