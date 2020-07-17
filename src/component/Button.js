import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet,Text, Image, Dimensions } from 'react-native'
import { Icon } from 'native-base'

const buttonBG = require('../Assets/components/yellow_button00.png')
const typeTwo = require('../Assets/components/blue_button00.png')

class Button extends Component{
    render(){
        return(
            <TouchableOpacity style={[this.props.style, styles.btn_container]} onPress={this.props.onPress}>
                <Image source={this.props.type == 2 ? typeTwo : buttonBG} style={styles.btn_bg}/>
                {
                    this.props.icon ? <Icon active name={this.props.icon} style={{ position: 'absolute', left: 40 }}/>: null
                }
                <Text style={this.props.type == 2 ? styles.btn_label_white: styles.btn_label}>
                    {this.props.label}
                </Text>
            </TouchableOpacity>
        )
    }
}

const PHONE = Dimensions.get('window')

const styles = StyleSheet.create({
    btn_container: {    
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btn_bg: {
        position: 'absolute',
        resizeMode: 'stretch',
        width: PHONE.width - 50
    },
    btn_label: {
        fontFamily: 'kenvector_future'
    },
    btn_label_white: {
        fontFamily: 'kenvector_future',
        color: 'white'
    }
})

export default Button