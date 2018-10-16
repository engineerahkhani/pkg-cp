import React , {Component} from 'react';
import {View, Text, Dimensions} from 'react-native'
import Tree from './Tree';
const ScreenHeight = Dimensions.get('window').height;
import {scale} from '../index';

export default class TestTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedKeys: props.selectedKeys,
            expandedKeys: [],
        }
    }

    render() {
        const {treeData,onSelect} = this.props;
        return (
            <Tree
                treeStyle={{
                    height: ScreenHeight - 120,
                    flex:1
                }}
                checkable
                showLine
                selectedKeys={this.props.selectedKeys}
                onSelect={value => this.setState({selectedKeys: value},()=>onSelect(this.state.selectedKeys))}
                treeData={treeData}
                defaultExpandAll
                iconSize={scale(60)}
                setScrollToEnd={this.props.setScrollToEnd}
            />
        )
    }
}

const styles = {
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexRow: {
        marginTop: 10,
        flexDirection: 'row'
    },
}
