import React, {Component} from 'react';
import {
    StyleSheet,         // CSS-like styles
    TouchableOpacity,   // Pressable container
    View                // Container component
} from 'react-native';
import {scale, Text} from 'pkg-cp';
import {Metrics} from "../../../App/Themes/index";

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: props.activeTab || this.props.items.length - 1
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeTab !== this.state.activeTab) {
            this.setState({activeTab: nextProps.activeTab})
        }
    }

    textAlign = (index) => {
        if (index === this.props.items.length - 1)
            return 'right';
        switch (index) {
            case 0:
                return 'left';
            default:
                return 'center'
        }

    }

    // Pull children out of props passed from App component
    render({children, borderColor,fontSize} = this.props) {

        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    {children.map(({props: {title}}, index) =>
                        <TouchableOpacity
                            style={[
                                {flex: 1, paddingVertical: scale(25), paddingHorizontal: Metrics.paddingHorizontal},
                                index === this.state.activeTab ? {
                                    borderBottomColor: borderColor,
                                    borderBottomWidth: scale(5.5),
                                } : {
                                    borderBottomWidth: scale(1.2),
                                    borderBottomColor: '#ccc',
                                }
                            ]}
                            // Change active tab
                            onPress={() => this.setState({activeTab: index}, () => this.props.onPressTab(index))}
                            // Required key prop for components generated returned by map iterator
                            key={index}
                        >
                            <Text
                                size={fontSize ||35.8}
                                style={{
                                    color: index === this.state.activeTab ? '#252525' : '#b7b7b7',
                                    textAlign: this.textAlign(index),
                                }}>
                                {title}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                {/* Content */}
                <View style={{flex: 1}}>
                    {children[this.state.activeTab]}
                </View>
            </View>
        );
    }
}
