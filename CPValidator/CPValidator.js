import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text,scale} from "../index";

class CPValidator extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        value: PropTypes.string,
        minLength: PropTypes.number,
        errorMarginTop: PropTypes.number,
        validationEmail: PropTypes.bool,
        isRequired: PropTypes.bool,
        showMessage: PropTypes.bool,
        checkValidation: PropTypes.func,
    };

    static defaultProps = {
        children: '',
        value: '',
        showMessage: false,
        minLength: 0,
        validationEmail: false,
        isRequired: false,
        errorMarginTop: 25,
        checkValidation: () => {
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
        };
        this.childrenWithClassName = '';
        this.errorMessage = '';
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.value !== nextProps.value ||
            nextProps.value.length > 0 ||
            nextProps.showMessage
        ) {
            if (
                nextProps.validationEmail &&
                !/^([a-zA-Z0-9])([a-zA-Z0-9\._])*@(([a-zA-Z0-9])+(\.))+([a-zA-Z]{2,4})+$/.test(nextProps.value)
            ) {
                this.validation(
                    nextProps,
                    'bar_noValid',
                    'لطفا ایمیل را صحیح وارد کنید',
                    'false',
                );
            } else if (nextProps.notValidPhone ) {
                this.validation(
                    nextProps,
                    'bar_noValid',
                    `شماره تلفن نامعتبر است`,
                    'false',
                );
            }else if (nextProps.minLength > nextProps.value.length) {
                this.validation(
                    nextProps,
                    'bar_noValid',
                    `${nextProps.name} حداقل باید ${nextProps.minLength} کاراکتر باشد.`,
                    'false',
                );
            } else if (nextProps.isRequired && nextProps.value.replace(/\s/g, "").length === 0) {
                this.validation(
                    nextProps,
                    'bar_noValid',
                    `${nextProps.name} اجباری است.`,
                    'false',
                );
            } else {
                this.validation(nextProps, 'bar_isValid', ``, 'true');
            }
        } else this.validation(nextProps, 'bar', ``, 'false');
    }

    validation = (props, className, message, isValid) => {
        const child = React.cloneElement(props.children, {
            isValidClass: className,
            isValid:  isValid,
        });
        if (props.showMessage) this.errorMessage = message;
        this.childrenWithClassName = child;
        props.checkValidation(props.name, isValid);
    };

    render() {
        const {error} = this.state;
        const {errorMarginTop} = this.props;
        return this.childrenWithClassName ? (
            <View style={this.props.style}>
                {this.childrenWithClassName}
                {this.errorMessage !== '' &&  <Text  style={{color:'red',marginTop:-scale(errorMarginTop),textAlign:'right'}}>{this.errorMessage}</Text>}
            </View>
        ) : (
            <View style={this.props.style}>{this.props.children}</View>
        );
    }
}

export default CPValidator;
