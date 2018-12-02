import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Tabs from './tabs';
import {scale,Text} from 'pkg-cp';

export default class App extends Component {

    render() {
        const {tabs,onPressTab,activeTab,backgroundColor,borderColor,fontSize,loading,loadingComponent} = this.props;

        return (
            <View style={{
                flex: 1,                            // Take up all screen
                backgroundColor
            }}>
                <Tabs
                    fontSize={fontSize}
                    borderColor={borderColor}
                    activeTab={activeTab}
                    onPressTab={(index=>onPressTab(index))}
                    items={tabs}
                    disabled={loading}
                >
                    {tabs.map((tab,index) => {
                        return (
                            <View
                                key={index}
                                title={tab.title}
                                badgeCount={tab.badgeCount}
                                style={{
                                    flex: 1,                            // Take up all available space
                                    justifyContent: 'center',           // Center vertically
                                    alignItems: 'center',               // Center horizontally
                                    backgroundColor,
                                }}
                            >
                                {loading?loadingComponent: tab.content}
                            </View>
                        )
                    })}
                </Tabs>
            </View>
        );
    }
}
