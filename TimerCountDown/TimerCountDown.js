import React from "react";
import {View, ImageBackground} from 'react-native';
import destructMS from './destructMS';
import {scale, Icon, Text, PersianNumber,} from '../index';

const timer = require('react-native-timer');

const Seprator = () => <View style={{alignSelf: 'center', height: scale(100)}}>
    <Icon color='#fff' name='circle' size={scale(10)} style={{paddingHorizontal: scale(5)}}/>
    <Icon color='#fff' name='circle' size={scale(10)} style={{paddingHorizontal: scale(5), marginTop: scale(4)}}/>
</View>
const Digit = ({digit}) => <Text size={53} fontFamily='IRANSansMobile(FaNum)_Light' style={{
    padding: scale(2), borderColor: '#fff', borderWidth: 1, borderRadius: 2, margin: scale(10), color: '#fff',
    textAlign: 'center',
    width: scale(75),
    height: scale(100),
    backgroundColor:'#00a651'
}}><PersianNumber noCama number={digit}/></Text>
const Item = ({value, title}) => <View style={{alignItems: 'center', justifyContent: 'center'}}>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        {value[0] != 0 ? <Digit digit={value[0]}/> : null}
        <Digit digit={value[1]}/>
        <Digit digit={value[2]}/>
    </View>
    <Text size={25} style={{color: '#fff'}}>{title}</Text>
</View>

export default class TimerCountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMsg: true,
            counter: props.value / 1000,
        };
    }

    componentDidMount() {
        this.showMsg();
    }

    showMsg() {
        this.setState({showMsg: true}, () => timer.setInterval(
            this, 'hideMsg', () => this.setState(state => ({counter: state.counter - 1})), 1000));
    }

    displayDestructMS = (counter) => {
        const {d, h, m, s} = destructMS(counter);
        return <ImageBackground
            source={{uri: this.props.backgroundImage}}
            style={{
                width: '100%',
                backgroundColor: this.props.backgroundColor || '#00a651',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: scale(70),
                paddingBottom: scale(20)

            }}>

            <Item value={h} title='ساعت'/>
            <Seprator/>
            <Item value={m} title='دقیقه'/>
            <Seprator/>
            <Item value={s} title='ثانیه'/>

        </ImageBackground>
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {
                    this.displayDestructMS(this.state.counter)
                }
            </View>
        )
    }
}
