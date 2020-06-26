import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content } from 'native-base'
import Ion from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import { studentSession } from '../actions/Session'

import LottieView from 'lottie-react-native'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/login_cover.png')

class Auth extends Component{

    componentDidMount(){
        //this.props.saveStudentSession(userData)
        setTimeout(()=>{
            if(this.props.type == null){
                this.props.navigation.navigate('Login')
            }else{
                if(this.props.type == 'student'){
                    this.props.navigation.navigate('TeacherLogin')
                }
            }
        }, 5000)
    }

    render(){
        return(
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <StatusBar
                        backgroundColor="white"
                        barStyle="dark-content"
                    />

                        <LottieView source={require('../Assets/book.json')} autoPlay loop 
                            style={{ width: PHONE.width,}}
                        />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: PHONE.width,
        height: PHONE.height,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: PHONE.width,
        height: PHONE.height/2,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    form: {
        paddingHorizontal: 20
    },
    formLogo: {
        fontSize: 30,
        marginRight: 8
    },
    formItem: {
        marginVertical: 14
    },
    submit:{
        marginTop: 20
    }
})

const mapDispatchToProp = (dispatch) => {
    return{
        saveStudentSession: (userData) => dispatch(studentSession(userData))
    }
}

const mapStateToProp = (state) => {
    return{
        type: state.session.type
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Auth)