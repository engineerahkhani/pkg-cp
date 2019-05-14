import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Modal,
    View,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import {
    Icon,
    scale,
    Ripple,
    Text,
    RoundedButton,
    FloatingLabelInput
} from '../index';
import ElevatedView from 'pkg-cp/ElevatedView/ElevatedView';

function handlePlaceholder({ placeholder }) {
    if (isEqual(placeholder, {})) {
        return [];
    }
    return [placeholder];
}

function getSelectedItem({ items, value }) {
    return items.find(item => item.id === value.id) || items[0];
    return (
        items.find(item => {
            return isEqual(item.value, value);
        }) || items[0]
    );
}

export default class RNPickerSelect extends PureComponent {
    componentWillReceiveProps(nextProps) {
        const prevState = this.state;
        // update items if items prop changes
        const itemsChanged = !isEqual(prevState.items, nextProps.items);
        // update selectedItem if value prop is defined and differs from currently selected item
        const newSelectedItem = getSelectedItem({
            items: prevState.items,
            value: nextProps.value
        });

        const selectedItemChanged =
            !isEqual(nextProps.value, undefined) &&
            !isEqual(prevState.selectedItem, newSelectedItem);

        if (itemsChanged || selectedItemChanged) {
            this.setState({
                items: itemsChanged
                    ? handlePlaceholder({
                          placeholder: nextProps.placeholder
                      }).concat(nextProps.items)
                    : prevState.items,
                initData: itemsChanged
                    ? handlePlaceholder({
                          placeholder: nextProps.placeholder
                      }).concat(nextProps.items)
                    : prevState.items,
                selectedItem: selectedItemChanged
                    ? newSelectedItem
                    : prevState.selectedItem
            });
        }

        return null;
    }

    constructor(props) {
        super(props);

        const items = handlePlaceholder({
            placeholder: props.placeholder
        }).concat(props.items);
        this.state = {
            items,
            initData: items,
            selectedItem: getSelectedItem({ items, value: props.value }),
            showPicker: false,
            animationType: undefined,
            visible: false,
            inputValue: ''
        };

        this.onUpArrow = this.onUpArrow.bind(this);
        this.onDownArrow = this.onDownArrow.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.togglePicker = this.togglePicker.bind(this);
    }

    onUpArrow() {
        this.togglePicker();
        setTimeout(() => {
            this.props.onUpArrow();
        });
    }

    onDownArrow() {
        this.togglePicker();
        setTimeout(() => {
            this.props.onDownArrow();
        });
    }

    onValueChange(item, index) {
        if (item.value === null) {
            return true;
        }
        this.props.onValueChange(item.value, index);
        this.setState({
            selectedItem: item
        });
    }

    togglePicker(animate = false) {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            animationType: animate ? this.props.animationType : undefined,
            showPicker: !this.state.showPicker
        });
        if (!this.state.showPicker && this.inputRef) {
            this.inputRef.focus();
            this.inputRef.blur();
        }
    }

    handlePressPickerItem = (item, index) => {
        this.toggleModal();
        this.setState({ inputValue: '' });
        this.onValueChange(item, index);
    };
    handelFilterInputChange = text => {
        this.setState({ inputValue: text });
        let updated = this.state.initData.filter(
            item => item.label.search(text) !== -1
        );
        this.setState({ items: updated });
    };
    renderPickerItems() {
        const { items } = this.state;
        return items.map((item, index) => {
            return (
                <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    key={item.key || item.label}
                    disabled={item.value === null}
                    onPress={() => this.handlePressPickerItem(item, index)}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            paddingVertical: index === 0 ? scale(60) : scale(50)
                        }}
                    >
                        <Text
                            size={index === 0 ? 30 : 33}
                            fontFamily={
                                index === 0
                                    ? 'IRANSansMobile_Medium'
                                    : 'IRANSansMobile'
                            }
                            style={{ textAlign: 'center' }}
                        >
                            {item.label}
                        </Text>
                    </View>
                    {index != items.length - 1 && (
                        <View
                            style={{
                                borderColor: '#c9c9c9',
                                borderWidth: StyleSheet.hairlineWidth
                            }}
                        />
                    )}
                </TouchableOpacity>
            );
        });
    }

    renderPlaceholderStyle() {
        const styleModifiers = {};
        if (
            !isEqual(this.props.placeholder, {}) &&
            this.state.selectedItem.label === this.props.placeholder.label
        ) {
            styleModifiers.color =
                this.props.style.placeholderColor || '#C7C7CD';
        }
        return styleModifiers;
    }

    renderIcon() {
        if (this.props.hideIcon) {
            return null;
        }

        return <View style={[styles.icon, this.props.style.icon]} />;
    }

    onPressPicker = () => {
        this.setState({ visible: true });
    };
    toggleModal = () => this.setState({ visible: false });

    renderPicker() {
        const { visible, inputValue } = this.state;
        const {
            color,
            backgroundColor,
            filterAble,
            textColor,
            disabled,
            filterInputPlaceholder
        } = this.props;
        return (
            <View style={[styles.viewContainer]}>
                <Ripple
                    disabled={disabled}
                    style={{
                        backgroundColor,
                        flex: 1,
                        flexGrow: 1,
                        flexBasis: 0
                    }}
                    onPress={() => this.onPressPicker()}
                >
                    <View
                        style={{
                            flex: 1,
                            flexBasis: 0,
                            flexGrow: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: scale(0),
                            marginTop:
                                Platform.OS === 'ios' ? scale(15) : scale(-10),
                            marginBottom:
                                Platform.OS === 'ios' ? scale(15) : scale(12)
                        }}
                    >
                        {disabled || (
                            <Icon
                                size={scale(25)}
                                color={color}
                                name="down"
                                style={{ flexGrow: 1 }}
                            />
                        )}
                        <Text
                            size={37}
                            color={disabled ? '#999' : textColor || color}
                            fontFamily="IRANSansMobile"
                            style={{
                                flexGrow: 15,
                                textAlign: 'right',
                                marginRight: scale(10)
                            }}
                        >
                            {this.state.selectedItem.label}
                        </Text>
                    </View>
                    <View
                        style={[
                            {
                                borderTopWidth: StyleSheet.hairlineWidth,
                                borderTopColor: this.props.color
                            }
                        ]}
                    />
                </Ripple>
                <Modal
                    visible={visible}
                    onRequestClose={value => this.toggleModal()}
                    animationType="fade"
                    transparent={true}
                >
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: 'transparent' }}
                        activeOpacity={1}
                        onPress={() => this.toggleModal()}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0,0,0,0.5)'
                            }}
                        >
                            <ElevatedView
                                elevation={6}
                                style={{
                                    margin: scale(52),
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    flexDirection: 'row'
                                }}
                            >
                                <ScrollView
                                    contentContainerStyle={{
                                        backgroundColor: '#ffff',
                                        paddingHorizontal: scale(52),
                                        paddingTop: scale(52)
                                    }}
                                >
                                    {filterAble && (
                                        <View>
                                            <FloatingLabelInput
                                                value={inputValue}
                                                onChangeText={text =>
                                                    this.handelFilterInputChange(
                                                        text
                                                    )
                                                }
                                                label="جستجو"
                                                placeholder={
                                                    filterInputPlaceholder
                                                }
                                                tintColor="#000"
                                                textColor="#000"
                                                baseColor="#000"
                                            />
                                        </View>
                                    )}
                                    {this.renderPickerItems()}
                                </ScrollView>
                            </ElevatedView>
                            {/* <RoundedButton
              onPress={() => this.toggleModal()}
              name="close"
              iconType="awsome"
              iconColor='#ff5c77'
              style={{ position: 'absolute', top: scale(30), left: scale(30) }}
            /> */}
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }

    render() {
        return this.renderPicker();
    }
}

RNPickerSelect.propTypes = {
    onValueChange: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ).isRequired,
    placeholder: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any
    }),
    hideDoneBar: PropTypes.bool,
    hideIcon: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    mode: PropTypes.string,
    animationType: PropTypes.string,
    onUpArrow: PropTypes.func,
    onDownArrow: PropTypes.func
};

RNPickerSelect.defaultProps = {
    placeholder: {
        label: 'Select an item...',
        value: null
    },
    hideDoneBar: false,
    hideIcon: false,
    disabled: false,
    value: undefined,
    style: {},
    children: null,
    mode: 'dialog',
    animationType: 'slide',
    onUpArrow: null,
    onDownArrow: null
};

const styles = StyleSheet.create({
    viewContainer: {
        // alignSelf: 'stretch',
        flex: 1,
        flexGrow: 1,
        flexBasis: 0,
        marginBottom: scale(20)
    },
    chevron: {
        width: 15,
        height: 15,
        backgroundColor: 'transparent',
        borderTopWidth: 1.5,
        borderTopColor: 'red',
        borderRightWidth: 1.5,
        borderRightColor: 'red'
    },
    chevronUp: {
        transform: [{ translateY: 17 }, { rotate: '-45deg' }]
    },
    chevronDown: {
        transform: [{ translateY: 8 }, { rotate: '135deg' }]
    },
    chevronActive: {
        borderTopColor: '#007AFE',
        borderRightColor: '#007AFE'
    },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: 'gray',
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        left: 10
    },
    modalViewTop: {
        flex: 1
    },
    modalViewMiddle: {
        height: 44,
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EFF1F2',
        borderTopWidth: 0.5,
        borderTopColor: '#919498'
    },
    modalViewBottom: {
        height: 215,
        justifyContent: 'center',
        backgroundColor: '#D0D4DB'
    },
    done: {
        color: '#007AFE',
        fontWeight: 'bold',
        padding: 10,
        fontSize: 18
    }
});
