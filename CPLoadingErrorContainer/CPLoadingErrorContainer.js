import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Loading,  } from '../index';
import { connect } from 'react-redux';
import {CPAlert} from '../../../App/Components';

class LoadingErrorContainer extends Component {
    render() {
        const { loading, send, message } = this.props;
        return (
            <View
                style={{
                    // marginTop: (Platform.OS === 'ios') ? 18 : 0,
                    flex: 1,
                    backgroundColor: '#fff'
                }}
            >
                {loading ? (
                    <Loading color={'#ff5c77'} send={!!send} />
                ) : (
                    this.props.children
                )}
                {
                    message.message && <CPAlert message={message.message} type={message.messageType} />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = dispatch => ({
    disPatch: action =>
        dispatch({ type: 'Navigation/NAVIGATE', routeName: action }),
    disPatchClose: action =>
        dispatch({ type: 'DROP_DOWN_CLOSED', data: action })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingErrorContainer);
LoadingErrorContainer.defaultProps = {
    loading: false,
    message: {},
    errors: []
};
