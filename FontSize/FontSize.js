import { PixelRatio } from 'react-native';
export default (fontSize = size => {
  let rate = 1.333333;
  if (PixelRatio.get() === 3) {
    rate = 1.32222;
  }
  if (size) {
    let sizeDp = parseFloat(size) * rate;
    return sizeDp - 0.1 * sizeDp;
  } else {
    return 38;
  }
});
