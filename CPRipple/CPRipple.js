import React from 'react'
import CpRipple from 'react-native-material-ripple';

export const Ripple =(props)=>{
    return(
        <CpRipple
            {...props}
        >
            {props.children}
        </CpRipple>
    )
}
