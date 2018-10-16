import React from 'react'
import {Text, View} from 'react-native';


export default CPErrorMessage = (props) => {

    return <View style={{
        backgroundColor: 'red',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        elevation: 10,
        paddingVertical: 15,
        paddingHorizontal: 5
    }}>
        {
            props.errors.map((error,index)=> <Text key={index} style={{color: "#fff", fontSize: 15}}>
                {error.errorMessage}
            </Text>)
        }
    </View>
}