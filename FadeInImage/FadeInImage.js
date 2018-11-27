import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';

class FadeInImage extends Component {
    renderImage = () => {
        if (this.props.notFilter) {
            return { uri: this.props.source, priority: FastImage.priority.normal };
        } else {
            return this.props.source.length > 0
                ? {
                    uri: this.props.source[0],
                    priority: FastImage.priority.normal
                }
                : {
                    uri:
                        'https://cdn.motherflower.com:7090/SiteAsset/ImageNotFound.png',
                    priority: FastImage.priority.normal
                };
        }
    };
    render() {
        const style = [this.props.style];
        return (
            <FastImage
                style={style}
                source={this.renderImage()}
                resizeMode={FastImage.resizeMode.contain}
            />
        );
    }
}

export default FadeInImage;
