import React from 'react';
// import ElevatedView from 'react-native-elevated-view'
import {View,Platform, } from 'react-native';
 import Elevated from 'react-native-elevated-view'

export default ElevatedView = (props) => {


    return (
        Platform.OS === 'ios'?
            <Elevated elevation={props.elevation || 3} style={props.style}>
                {props.children}
            </Elevated>:
            <View style={[{elevation:props.elevation || 3},props.style]}>
                {props.children}
            </View>
    );
}

