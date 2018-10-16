import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { Metrics } from '../../../App/Themes/index';
import { scale } from '../index';
import _ from 'lodash';

class CPList extends Component {
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 1;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  renderFooter = () => {
    if (!this.props.paginationLoading) return null;

    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: scale(30),
          backgroundColor: 'transparent'
        }}
      >
        <ActivityIndicator animating />
      </View>
    );
  };
  renderEmpty = () => {
    const { emptyText, EmptySearchMessage, isEmpty } = this.props;

    if (!isEmpty) return null;
    return <EmptySearchMessage icon="search" text={emptyText} offset={400} />;
  };
  onListItemPress = item => {
    this.props.onListItemPress(item);
  };
  renderItemContent = (item, index) => {
    const {
      RenderItem,
      priceOption,
      listLayoutType,
      theme,
      ItemKey,
      handleReOrderBtnPress
    } = this.props;
    return (
      <View key={item[ItemKey]}>
        <RenderItem
          item={item}
          index={index}
          priceOption={priceOption}
          onPress={() => this.onListItemPress(item)}
          itemViewType={listLayoutType}
          theme={theme}
          handleReOrderBtnPress={handleReOrderBtnPress}
        />
        {this.renderSeparator()}
      </View>
    );
  };

  keyExtractor = (item, index) => index;
  onEndReached = () => {
    const {
      count,
      pageSize,
      pageIndex,
      paginationHandler,
      isRenderProduct
    } = this.props;
    console.log(
      count,
      pageSize,
      Math.floor(count / pageSize),
      pageIndex,
      isRenderProduct
    );

    if (!isRenderProduct) {
      return true;
    }
    return (
      Math.floor(count / pageSize) > pageIndex &&
      paginationHandler(parseInt(pageIndex) + 1)
    );
  };
  style = () => {
    const { listLayoutType } = this.props;

    return {
      flexWrap: listLayoutType === 'table' ? 'wrap' : 'nowrap',
      flexDirection: listLayoutType === 'table' ? 'row' : 'column',
      justifyContent: 'center',
      paddingTop:
        listLayoutType === 'row' ? scale(4) : Metrics.paddingHorizontal / 2
    };
  };
  renderSeparator = () => {
    const { listLayoutType } = this.props;
    if (listLayoutType !== 'row') {
      return null;
    }
    return (
      <View
        style={{
          borderWidth: scale(1),
          borderColor: '#ccc'
        }}
      />
    );
  };

  render() {
    const { data } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.renderEmpty()}
        <ScrollView
          contentContainerStyle={this.style()}
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              console.log('end');
              this.onEndReached();
            }
          }}
          scrollEventThrottle={400}
        >
          {data.map((item, index) => this.renderItemContent(item, index))}
        </ScrollView>
        {this.renderFooter()}
      </View>
    );
  }
}

export default CPList;
