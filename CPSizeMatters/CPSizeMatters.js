import {PixelRatio} from 'react-native';
import {moderateScale} from 'react-native-size-matters'
export function scale(value) {
    let size = value/3;
    if(PixelRatio.get() === 3){
         size = value/3.05;

    }
    return round(moderateScale(size,0.5),1)
};

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
  
  
