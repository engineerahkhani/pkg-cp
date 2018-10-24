import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import config from './selection.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MoonIcon = createIconSetFromIcoMoon(config);

export const Icon  = (props) => (
    props.type ?
        <FontAwesome
            name={props.name}
            size={props.size || 24}
            color={props.color}
            style={[{backgroundColor:'transparent'},props.style]}
        /> :
        <MoonIcon
            name={props.name}
            size={props.size || 24}
            color={props.color}
            style={props.style}
        />
);
