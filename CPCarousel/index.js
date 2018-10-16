import React, { Component } from 'react';
import { Platform, View, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.style';
import { ENTRIES1, ENTRIES2 } from './static/entries';
import { scrollInterpolators, animatedStyles } from './utils/animations';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItem({ item, index }) {
    const { onPress } = this.props;
    return (
      <SliderEntry onPress={() => onPress(item)} data={item} even={false} />
    );
  }

  layoutExample() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          padding: this.props.paddingHorizontal,
          paddingRight: this.props.paddingHorizontal / 2,
          paddingLeft: Platform.OS === 'ios' ? 0 : this.props.paddingHorizontal,
          paddingBottom: this.props.paddingHorizontal / 2
        }}
      >
        <Carousel
          data={this.props.items}
          renderItem={(item, index) => this._renderItem(item, index)}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={this.props.type}
          loop={true}
          loopClonesPerSide={8}
          layoutCardOffset={18}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollview}
          scrollEventThrottle={200}
          directionalLockEnabled={true}
        >
          {this.layoutExample()}
        </ScrollView>
      </View>
    );
  }
}
