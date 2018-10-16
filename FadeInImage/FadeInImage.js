import React, {Component} from 'react';
import {
    Animated,
    View,
    ImageBackground,
} from 'react-native';
import flower1 from './flower1.png'
import Bg from './thumb.png'
import FastImage from 'react-native-fast-image'

class FadeInImage extends Component {

    renderImage = () => {
        if(this.props.notFilter){
            return {uri: this.props.source,priority: FastImage.priority.normal,}
        }else {
          return  this.props.source.length > 0 ? {
              uri: this.props.source[0],
              priority: FastImage.priority.normal,
          } : {
              uri: 'https://unsplash.it/400/400?image=1',
              priority: FastImage.priority.normal,
          };
        }
    }
    static defaultProps = {
        backgroundColor: '#ccc',
        resizeMode: 'cover',
        style: {},
    };

    constructor() {
        super();

       /* this.onLoad = this.onLoad.bind(this);

        this.state = {
            opacity: new Animated.Value(0),
        };*/
    }

    onLoad() {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
        }).start();
    }

    render() {
        const style = [this.props.style];

        return (

                <FastImage
                    style={style}
                    source={this.renderImage()}
                    resizeMode={FastImage.resizeMode.contain}
                />

            /*<ImageBackground
                style={this.props.style}
                source={Bg}
            >
                <Animated.Image
                    style={style}
                    resizeMode={this.props.resizeMode}
                    source={this.renderImage()}
                    onLoad={this.onLoad}
                />
            </ImageBackground>*/
        );
    }
}

export default FadeInImage;