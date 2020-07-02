import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Toast } from 'native-base'
import Ion from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import { teacherSession } from '../actions/Session'
import { ProgressDialog } from 'react-native-simple-dialogs'
import AsyncStorage from '@react-native-community/async-storage'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/teacher_cover.png')

import API from '../API'

class TeacherLogin extends Component{


    constructor(props){
        super(props)
        this.state = {
            loading: false,
            username: "",
            password: ""
        }
    }

    login(){
        let self = this

        /*let userData = {
            type: 'teacher',
            username: 'kingrenz23'
        }

        this.props.saveTeacherSession(userData)*/

        let payload = {
            username: self.state.username,
            password: self.state.password
        }

        self.setState({ loading: true }, async ()=>{
            const { data, status } = await API.loginTeacher(payload)

            if(data.ok == true){
                let userData = {
                    type: 'teacher',
                    username: self.state.username,
                    teacher_id: data.teacher_id,
                    name: data.name
                }

                self.storeData(userData)
            }else{
                Toast.show({
                    text: data.message,
                    buttonText: 'Okay',
                    duration: 5000
                })
            }

            
        })
    }

    async storeData(payload){
        let self = this

        try{
            await AsyncStorage.setItem('logindata', JSON.stringify(payload))

            self.setState({ loading: false },()=>{
                self.props.saveTeacherSession(payload)    
            })
            
        }catch(err){
            alert("Error saving session");
        }
    }

    render(){
        return(
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <StatusBar
                        backgroundColor="white"
                        barStyle="dark-content"
                    />

                    <ProgressDialog     
                        visible={this.state.loading}
                        message="Please, wait..."
                    />

                    <Image source={LOGO} style={styles.logo}/>
                    
                    <View style={styles.form}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Welcome Teacher</Text>
                        <Form>

                            <Item inlineLabel style={styles.formItem}>
                                <Ion active name='ios-person' style={styles.formLogo}/>
                                <Label>Username</Label>
                                <Input onChangeText={(text)=>{ this.setState({ username: text }) }}/>
                            </Item>

                            <Item inlineLabel>
                                <Ion active name='ios-lock' style={styles.formLogo}/>
                                <Label>Password</Label>
                                <Input onChangeText={(text)=>{ this.setState({ password: text }) }} secureTextEntry={true}/>
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