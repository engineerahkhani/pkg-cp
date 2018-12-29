import React from 'react'
import {ImageBackground, Platform} from 'react-native';

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
                    elevation:10,
                //    backgroundColor:'red',
                   ...props.style
                }}>
                <Text
                    style={{
                        position: 'absolute',
                        top: props.discountTextTop|| scale(22),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    fontFamily='IRANSansMobile(FaNum)_Medium'
                    size={props.discountFontSize||28}
                    color='#fff'
                >{props.value}%</Text>
            </ImageBackground>
    )
}