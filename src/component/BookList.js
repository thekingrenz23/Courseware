import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet,Text, Image, Dimensions } from 'react-native'
import { Icon } from 'native-base'

const buttonBG = require('../Assets/components/yellow_button00.png')
const typeTwo = require('../Assets/components/blue_button00.png')

const LOGO = require('../Assets/Book.png')

class BookList extends Component{
    render(){
        return(
            <TouchableOpacity style={[this.props.style, styles.btn_container]} onPress={this.props.onPress}>
                <Image source={this.props.type == 2 ? typeTwo : buttonBG} style={styles.btn_bg}/>
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
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btn_bg: {
        position: 'absolute',
        resizeMode: 'stretch',
        width: PHONE.width - 50,
        height: 100
    },
    btn_label: {
        fontFamily: 'kenvector_future',
        flexShrink: 1,
        paddingHorizontal: 20
    },
    btn_label_white: {
        fontFamily: 'kenvector_future',
        color: 'white'
    }
})

export default BookList