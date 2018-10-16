import {PixelRatio} from 'react-native';
import {moderateScale} from 'react-native-size-matters'
export function scale(value) {
    let size = value/3;
    if(PixelRatio.get() === 3){
         size = value/3.05;

    }
    return moderateScale(size,0.5);
};
