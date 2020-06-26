import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content } from 'native-base'
import Ion from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import { teacherSession } from '../actions/Session'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/teacher_cover.png')

class TeacherLogin extends Component{

    login(){
        let self = this

        let userData = {
            type: 'teacher',
            username: 'kingrenz23'
        }

        this.props.saveTeacherSession(userData)
    }

    render(){
        return(
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <StatusBar
                        backgroundColor="white"
                        barStyle="dark-content"
                    />

                    <Image source={LOGO} style={styles.logo}/>
                    
                    <View style={styles.form}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Welcome Teacher</Text>
                        <Form>

                            <Item inlineLabel style={styles.formItem}>
                                <Ion active name='ios-person' style={styles.formLogo}/>
                                <Label>Username</Label>
                                <Input />
                            </Item>

                            <Item inlineLabel>
                                <Ion active name='ios-lock' style={styles.formLogo}/>
                                <Label>Password</Label>
                                <Input />
                            </Item>

                            
                        </Form>

                        <Button block style={styles.submit} onPress={()=>{ this.login() }}><Text> Login as teacher </Text></Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: PHONE.width,
        backgroundColor: 'white'
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
        saveTeacherSession: (userData) => dispatch(teacherSession(userData))
    }
}

export default connect(null, mapDispatchToProp)(TeacherLogin)