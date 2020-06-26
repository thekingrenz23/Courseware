import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Header, Icon } from 'native-base'
import Ion from 'react-native-vector-icons/Ionicons'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/register_cover.png')

class Register extends Component{

    constructor(props){
        super(props)
        this.state = {
            idNumber: "",
            password: "",
            cpassword: "",
            fname: "",
            lname: "",

            idNumber_success: false,
            idNumber_error: false,

            password_success: false,
            password_error: false,

            cpassword_success: false,
            cpassword_error: false,

            fname_success: false,
            fname_error: false,

            lname_success: false,
            lname_error: false
        }
    }

    handleChange(text, inputEL){
        let self = this

        if(inputEL == 'id'){
            if(text.length > 3){
                self.setState((prevState)=>({
                    ...prevState,
                    idNumber: text,
                    idNumber_success: true,
                    idNumber_error: false
                }))
            }else{
                self.setState((prevState)=>({
                    ...prevState,
                    idNumber: text,
                    idNumber_success: false,
                    idNumber_error: true
                }))
            }
        }else if(inputEL == 'password'){
            if(text.length > 3){
                self.setState((prevState)=>({
                    ...prevState,
                    password: text,
                    password_success: true,
                    password_error: false,
                    cpassword_success: false,
                    cpassword_error: false
                }))
            }else{
                self.setState((prevState)=>({
                    ...prevState,
                    password: text,
                    password_success: false,
                    password_error: true,
                    cpassword_success: false,
                    cpassword_error: false
                }))
            }
        }else if(inputEL == 'cpassword'){
            if(text == self.state.password){
                self.setState((prevState)=>({
                    ...prevState,
                    cpassword: text,
                    cpassword_success: true,
                    cpassword_error: false
                }))
            }else{
                self.setState((prevState)=>({
                    ...prevState,
                    cpassword: text,
                    cpassword_success: false,
                    cpassword_error: true
                }))
            }
        }else if(inputEL == 'fname'){
            if(text.length > 3){
                self.setState((prevState)=>({
                    ...prevState,
                    fname: text,
                    fname_success: true,
                    fname_error: false
                }))
            }else{
                self.setState((prevState)=>({
                    ...prevState,
                    fname: text,
                    fname_success: false,
                    fname_error: true
                }))
            }
        }else if(inputEL == 'lname'){
            if(text.length > 3){
                self.setState((prevState)=>({
                    ...prevState,
                    lname: text,
                    lname_success: true,
                    lname_error: false
                }))
            }else{
                self.setState((prevState)=>({
                    ...prevState,
                    lname: text,
                    lname_success: false,
                    lname_error: true
                }))
            }
        }
    }

    render(){
        return(
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Image source={LOGO} style={styles.logo}/>

                    <Form style={styles.form}>

                        <Item inlineLabel style={styles.formItem} error={this.state.idNumber_error} success={this.state.idNumber_success}>
                            <Ion active name='ios-person' style={styles.formLogo}/>
                            <Label>ID# :</Label>
                            <Input keyboardType="number-pad"
                                onChangeText={(text)=>{ this.handleChange(text, 'id') }}
                            />

                            {this.state.idNumber_success ? <Icon name='checkmark-circle' />: null}
                            {this.state.idNumber_error ? <Icon name='close-circle' />: null}
                        </Item>

                        <Item inlineLabel style={styles.formItem} error={this.state.fname_error} success={this.state.fname_success}>
                            <Ion active name='ios-person' style={styles.formLogo}/>
                            <Label>Firstname :</Label>
                            <Input
                                onChangeText={(text)=>{ this.handleChange(text, 'fname') }}
                            />

                            {this.state.fname_success ? <Icon name='checkmark-circle' />: null}
                            {this.state.fname_error ? <Icon name='close-circle' />: null}
                        </Item>

                        <Item inlineLabel style={styles.formItem} error={this.state.lname_error} success={this.state.lname_success}>
                            <Ion active name='ios-person' style={styles.formLogo}/>
                            <Label>Lastname :</Label>
                            <Input
                                onChangeText={(text)=>{ this.handleChange(text, 'lname') }}
                            />

                            {this.state.lname_success ? <Icon name='checkmark-circle' />: null}
                            {this.state.lname_error ? <Icon name='close-circle' />: null}
                        </Item>

                        <Item inlineLabel style={styles.formItem} error={this.state.password_error} success={this.state.password_success}>
                            <Ion active name='ios-lock' style={styles.formLogo}/>
                            <Label>Password :</Label>
                            <Input secureTextEntry={true}
                                onChangeText={(text)=>{ this.handleChange(text, 'password') }}
                            />

                            {this.state.password_success ? <Icon name='checkmark-circle' />: null}
                            {this.state.password_error ? <Icon name='close-circle' />: null}
                        </Item>

                        <Item inlineLabel style={styles.formItem} error={this.state.cpassword_error} success={this.state.cpassword_success}>
                            <Ion active name='ios-lock' style={styles.formLogo}/>
                            <Label>Confirm :</Label>
                            <Input secureTextEntry={true}
                                onChangeText={(text)=>{ this.handleChange(text, 'cpassword') }}
                            />

                            {this.state.cpassword_success ? <Icon name='checkmark-circle' />: null}
                            {this.state.cpassword_error ? <Icon name='close-circle' />: null}
                        </Item>

                        <Button block style={styles.submit}><Text> Register </Text></Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    logo: {
        width: PHONE.width,
        height: PHONE.height/2,
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
        marginVertical: 20
    }
})

export default Register
