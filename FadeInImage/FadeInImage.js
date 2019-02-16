import React, { Component } from 'react';
import {Image } from 'react-native';
// import FastImage from 'react-native-fast-image';

class FadeInImage extends Component {
    renderImage = () => {
        if (this.props.notFilter) {
            return { uri: this.props.source };
        } else {
            return this.props.source.length > 0
                ? {
                    uri: this.props.source[0],
                    
                }
                : {
                    uri:
                        'https://cdn.motherflower.com:7090/SiteAsset/ImageNotFound.png',
                    
                };
        }
    };
    render() {
        const style = [this.props.style];
        return (
            <Image
                style={style}
                source={this.renderImage()}
                resizeMode={'contain'}
            />
        );
    }
}

export default FadeInImage;
