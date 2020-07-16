import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Toast } from 'native-base'
import Ion from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import { studentSession } from '../actions/Session'
import { ProgressDialog } from 'react-native-simple-dialogs'
import API from '../API'
import AsyncStorage from '@react-native-community/async-storage'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/login_cover.png')

class Login extends Component{


    constructor(props){
        super(props)

        this.state = {
            loading: false,
            idNumber: "",
            password: ""
        }
    }

    login(){
        let self = this

        let payload = {
            student_idno: self.state.idNumber,
            password: self.state.password
        }

        self.setState({loading: true}, async ()=>{
            const { data, status } = await API.loginStudent(payload)

            self.setState({ loading: false }, ()=>{
                if(data.ok == true){
                    if(data.status == 1){
                        
                        let userData = {
                            type: 'student',
                            user_id: data.user_id,
                            name: data.name,
                            enroll_id: data.enroll_id
                        }
                        
                        self.storeData(userData)
                        //self.props.saveStudentSession(userData)
                    }else{
                        Toast.show({
                            text: "Enrollment is denied please approach your teacher!",
                            buttonText: 'Okay',
                            duration: 5000
                        })
                    }
                }else{
                    Toast.show({
                        text: data.message,
                        buttonText: 'Okay',
                        duration: 5000
                    })
                }
            })
        })    
        /*let userData = {
            type: 'student',
            username: 'kingrenz23'
        }

        this.props.saveStudentSession(userData)*/
    }

    async storeData(payload){
        let self = this

        try{
            await AsyncStorage.setItem('logindata', JSON.stringify(payload))

            self.setState({
                loading: false
            },()=>{
                self.props.saveStudentSession(payload)    
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
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Welcome Student</Text>
                        <Form>

                            <Item inlineLabel style={styles.formItem}>
                                <Ion active name='md-card' style={styles.formLogo}/>
                                <Label>ID #</Label>
                                <Input onChangeText={(text)=> { this.setState({ idNumber: text }) } }/>
                            </Item>

                            <Item inlineLabel>
                                <Ion active name='ios-lock' style={styles.formLogo}/>
                                <Label>Password</Label>
                                <Input onChangeText={(text)=> { this.setState({ password: text }) } } secureTextEntry={true}/>
                            </Item>

                            
                        </Form>

                        <Button block style={styles.submit} onPress={()=>{ this.login() }}><Text> Login as student </Text></Button>
                        <Button block style={styles.submit} transparent onPress={()=>{ this.props.navigation.navigate('Register') }}><Text> Register </Text></Button>
                        <Button block style={styles.submit} transparent onPress={()=>{ this.props.navigation.navigate('TeacherLogin') }}><Text> Teacher </Text><Ion name="md-arrow-dropright" style={{ fontSize: 20, color: 'gainsboro' }}/></Button>
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
        saveStudentSession: (userData) => dispatch(studentSession(userData))
    }
}

export default connect(null, mapDispatchToProp)(Login)
