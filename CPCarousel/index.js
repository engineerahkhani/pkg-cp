import React, { Component } from 'react';
import { Platform, View, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.style';
import { ENTRIES1, ENTRIES2 } from './static/entries';
import { scrollInterpolators, animatedStyles } from './utils/animations';
import { scale } from 'pkg-cp';


export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
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
          padding: 0,
         /*  paddingRight: 0,
          paddingLeft: 0,
          paddingBottom: this.props.paddingHorizontal / 2 */
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
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          // loopClonesPerSide={8}
          // layoutCardOffset={18}
        />
        <Pagination
              dotsLength={this.props.items.length}
              activeDotIndex={this.state.activeSlide}
              containerStyle={{ paddingVertical:scale(10) }}
              dotStyle={{
                  width: scale(80),
                  height: scale(20),
                  //borderRadius: 5,
                  backgroundColor: this.props.activeDotColor,
                  marginHorizontal:scale(5)
              }}
              inactiveDotStyle={{
                  backgroundColor:'#c9c9c9'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
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
