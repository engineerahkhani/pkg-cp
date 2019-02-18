import React from 'react';
import { View,Platform } from 'react-native';
import {
  Rating,
  PersianNumber,
  Ripple,
  scale,
  Text,
  FadeInImage,
  ElevatedView,
  PercentLabel
} from '../index';
export default (CPProductDetail = ({ ratingStarColor,baseDiscountBgImg,productPriceColor, ...props }) => {
  
  const renderDiscountPrice = () => {
    if (props.priceOption === 1) {
      return props.product.deliveryPriceDiscount !== 0 ? (
        <Text
          size={25}
          style={{ textDecorationLine: 'line-through', marginRight: scale(5) }}
          color="#cccccc"
        >
          <PersianNumber number={props.product.deliveryBasePrice} />
        </Text>
      ) : null;
    } else {
      return props.product.pickupPriceDiscount !== 0 ? (
        <Text
          size={25}
          style={{ textDecorationLine: 'line-through', marginRight: scale(5) }}
          color="#cccccc"
        >
          <PersianNumber number={props.product.pickupBasePrice} />
        </Text>
      ) : null;
    }
  };
  return (
    <Ripple
      onPress={() => props.onClick()}
      style={props.style}
    >
      <ElevatedView elevation={0} >
        <View
          style={{
            borderRadius: 4,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            overflow: 'hidden'
          }}
        >
          <FadeInImage
            resizeMode="contain"
            source={props.imageUrls}
            style={{
              height: props.height,
              minWidth: props.width,
              width: props.width,
              backgroundColor: '#fff',
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: scale(15),
            paddingHorizontal: scale(45),
            alignItems: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {renderDiscountPrice()}
            <Text size={25} color={productPriceColor}>
              <PersianNumber
                number={
                  props.priceOption === 1
                    ? props.product.deliveryPriceAfterDiscount
                    : props.product.pickupPriceAfterDiscount
                }
              /> تومان
            </Text>
          </View>
          <Rating
            starColor={ratingStarColor}
            starSize={40}
            disabled
            starCount={props.product.rateAverage}
          />
          
        </View>
        <PercentLabel
            source={{ uri:baseDiscountBgImg }}
            style={{
              top: Platform.OS === 'ios' ? scale(0) : scale(0),
              left: scale(30),
              width: scale(94),
              height: scale(142)
            }}
            discountTextTop={props.discountTextTop}
            value={
              props.priceOption === 1
                ? props.product.deliveryPriceDiscount
                : props.product.pickupPriceDiscount
            }
          />
      </ElevatedView>
      
    </Ripple>
  );
});
