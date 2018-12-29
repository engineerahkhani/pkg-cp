import React, {Component} from 'react';
import {View} from 'react-native';
import StarRating from 'react-native-star-rating';
import {scale,Text,PersianNumber} from 'pkg-cp';

export default class CPRating extends Component {
    state = {
        starCount: this.props.starCount
    };
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        }, this.props.onChange(rating));
    }
    componentWillReceiveProps(nexProps){
        if(this.state.starCount!==nexProps.starCount){
            this.setState({starCount:nexProps.starCount});
        }
    }
    render() {
        const {disabled,hidShow,starColor} = this.props;
        const {starCount} = this.state;

        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                minHeight:hidShow? 0 :this.props.starSize/2,
            }}>
                {
                   ( starCount !== 0 && !hidShow) && <Text style={{marginRight:scale(10)}} size={this.props.starSize/1.5}  color={'#000'}>(<PersianNumber number={starCount}/>)</Text>
                }
                <StarRating
                    disabled={disabled}
                    maxStars={5}
                    rating={starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    fullStarColor={starColor||'green'}
                    emptyStarColor={starColor||'green'}
                    reversed={true}
                    starSize={scale(this.props.starSize || 20)}
                    starStyle={{paddingHorizontal: scale(3)}}
                />
            </View>
        );
    }
}
CPRating.defaultProps = {
    onChange: () => {
    }
}
