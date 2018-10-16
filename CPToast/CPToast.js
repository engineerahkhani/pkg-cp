import React from 'react'
import SimpleToast from 'react-native-simple-toast';


export default Toast = (message, duration = SimpleToast.SHORT) => {
    return SimpleToast.show(message, duration);
}