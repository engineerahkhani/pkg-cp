import React from 'react'
import {ImageBackground, View} from 'react-native';

import {scale, Text} from '../index';

export default CPPercentLabel = (props) => {
    return (
        props.value !== 0 &&
            <ImageBackground
                source={props.source}
                style={{
                    position: 'absolute',
                    top: scale(10),
                    left: scale(26),
                    width: scale(132),
                    height: scale(158),
                    alignItems: 'center',
                    justifyContent: 'center',
                //    backgroundColor:'red',
                   ...props.style
                }}>
                <Text
                    style={{
                        position: 'absolute',
                        top: scale(32),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    fontFamily='IRANSansMobile(FaNum)_Medium'
                    size={28}
                    color='#fff'
                >{props.value}%</Text>
            </ImageBackground>
    )
}