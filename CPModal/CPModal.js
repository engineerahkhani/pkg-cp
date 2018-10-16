import React, {Component} from 'react';
import Modal from "react-native-modal";
import {scale,ElevatedView} from '../index'
class ModalInput extends Component {

    render() {
        const {
            toggleModal,
            visible,
            disableSwipe,
            disableBackDropPress,
        } = this.props;
        return (
            <Modal
                style={{
                    marginHorizontal:scale(0)
                }}
                backdropOpacity={0.5}
                swipeDirection={disableSwipe ?null:"left"}
                onBackButtonPress={() =>disableBackDropPress?{}: toggleModal()}
                onSwipe={() =>disableSwipe || toggleModal()}
                isVisible={visible}
                onBackdropPress={() =>disableBackDropPress|| toggleModal()}
            >
                <ElevatedView elevation={6} style={{margin:scale(52)}}>
                    {this.props.children}
                </ElevatedView>
            </Modal>
        );
    }
}

export default ModalInput
