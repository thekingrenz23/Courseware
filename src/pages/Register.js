import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, ScrollView} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Header, Icon,List, ListItem, Left, Thumbnail, Body, Right, Picker, Card, CardItem, H1 } from 'native-base'
import Ion from 'react-native-vector-icons/Ionicons'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { connect } from 'react-redux'
import { ProgressDialog } from 'react-native-simple-dialogs'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/user.png')

import CustomButton from '../component/Button'

import API from '../API'

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
            lname_error: false,
            
            inValidAccountInfoForm: false,

            section: "",
            invalidEnrollForm: false,
            sectionLabel: "",
            loading: false
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

    async submit(){
        let self = this

        await self.checkForm()

        if(
            self.state.idNumber_error
            || self.state.fname_error
            || self.state.lname_error
            || self.state.password_error
            || self.state.cpassword_error
        ){
            self.setState((prevState)=>({
                ...prevState,
                inValidAccountInfoForm: true
            }))
        }else{
            self.setState((prevState)=>({
                ...prevState,
                inValidAccountInfoForm: false
            }))
        }
    }

    async checkForm(){
        let self = this

        if(self.state.idNumber.length > 3){
            self.setState((prevState)=>({
                ...prevState,
                idNumber_success: true,
                idNumber_error: false
            }))
        }else{
            self.setState((prevState)=>({
                ...prevState,
                idNumber_success: false,
                idNumber_error: true
            }))
        }

        if(self.state.password.length > 3){
            self.setState((prevState)=>({
                ...prevState,
                password_success: true,
                password_error: false,
                cpassword_success: false,
                cpassword_error: false
            }))
        }else{
            self.setState((prevState)=>({
                ...prevState,
                password_success: false,
                password_error: true,
                cpassword_success: false,
                cpassword_error: false
            }))
        }

        if(self.state.cpassword.length > 3 && self.state.cpassword == self.state.password){
            self.setState((prevState)=>({
                ...prevState,
                cpassword_success: true,
                cpassword_error: false
            }))
        }else{
            self.setState((prevState)=>({
                ...prevState,
                cpassword_success: false,
                cpassword_error: true
            }))
        }

        if(self.state.fname.length > 3){
            self.setState((prevState)=>({
                ...prevState,
                fname_success: true,
                fname_error: false
            }))
        }else{
            self.setState((prevState)=>({
                ...prevState,
                fname_success: false,
                fname_error: true
            }))
        }

        if(self.state.lname.length > 3){
            self.setState((prevState)=>({
                ...prevState,
                lname_success: true,
                lname_error: false
            }))
        }else{
            self.setState((prevState)=>({
                ...prevState,
                lname_success: false,
                lname_error: true
            }))
        }
    }

    verifyEnrollForm(){
        let self = this

        if(self.props.teacher_id == null || self.state.section.length == 0){
            self.setState((prevState)=>({
                ...prevState,
                invalidEnrollForm: true
            }))
        }else{
            self.setState((prevState)=>({
                ...prevState,
                invalidEnrollForm: false
            }))
        }
    }

    register(){
        let self = this

        self.setState((prevState)=>({
            ...prevState,
            loading: true
        }),async ()=>{
            let self = this

            let payload = {
                student_idno: self.state.idNumber,
                password: self.state.password,
                lname: self.state.lname,
                fname: self.state.fname,
                teacher_id: self.props.teacher_id,
                assign_id: self.state.section
            }

            const { data, status } = await API.register(payload)

            if(data.ok == true){
                self.setState({loading: false}, ()=>{
                    this.props.navigation.navigate('Login')
                    alert("You successfully created your account and enrolled to a class! Please wait for your teacher to approve your account")
                })
            }else{
                self.setState({loading: false}, ()=>{
                    alert("Failed!")
                })
            }

        })
    }

    render(){
    
        return(
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <ProgressDialog
                        visible={this.state.loading}
                        title="Registering"
                        message="Please, wait..."
                    />
                    <ProgressSteps>

                        <ProgressStep label="Accont Information" onNext={this.submit.bind(this)} errors={this.state.inValidAccountInfoForm}>
                            <View>
                                <Form style={styles.form}>

                                    <Item inlineLabel style={styles.formItem} error={this.state.idNumber_error} success={this.state.idNumber_success}>
                                        <Ion active name='md-card' style={styles.formLogo}/>
                                        <Label>ID# :</Label>
                                        <Input keyboardType="number-pad"
                                            onChangeText={(text)=>{ this.handleChange(text, 'id') }}
                                            value={this.state.idNumber}
                                        />

                                        {this.state.idNumber_success ? <Icon name='checkmark-circle' />: null}
                                        {this.state.idNumber_error ? <Icon name='close-circle' />: null}
                                    </Item>

                                    <Item inlineLabel style={styles.formItem} error={this.state.fname_error} success={this.state.fname_success}>
                                        <Ion active name='ios-person' style={styles.formLogo}/>
                                        <Label>Firstname :</Label>
                                        <Input
                                            onChangeText={(text)=>{ this.handleChange(text, 'fname') }}
                                            value={this.state.fname}
                                        />

                                        {this.state.fname_success ? <Icon name='checkmark-circle' />: null}
                                        {this.state.fname_error ? <Icon name='close-circle' />: null}
                                    </Item>

                                    <Item inlineLabel style={styles.formItem} error={this.state.lname_error} success={this.state.lname_success}>
                                        <Ion active name='ios-person' style={styles.formLogo}/>
                                        <Label>Lastname :</Label>
                                        <Input
                                            onChangeText={(text)=>{ this.handleChange(text, 'lname') }}
                                            value={this.state.lname}
                                        />

                                        {this.state.lname_success ? <Icon name='checkmark-circle' />: null}
                                        {this.state.lname_error ? <Icon name='close-circle' />: null}
                                    </Item>

                                    <Item inlineLabel style={styles.formItem} error={this.state.password_error} success={this.state.password_success}>
                                        <Ion active name='ios-lock' style={styles.formLogo}/>
                                        <Label>Password :</Label>
                                        <Input secureTextEntry={true}
                                            onChangeText={(text)=>{ this.handleChange(text, 'password') }}
                                            value={this.state.password}
                                        />

                                        {this.state.password_success ? <Icon name='checkmark-circle' />: null}
                                        {this.state.password_error ? <Icon name='close-circle' />: null}
                                    </Item>

                                    <Item inlineLabel style={styles.formItem} error={this.state.cpassword_error} success={this.state.cpassword_success}>
                                        <Ion active name='ios-lock' style={styles.formLogo}/>
                                        <Label>Confirm :</Label>
                                        <Input secureTextEntry={true}
                                            onChangeText={(text)=>{ this.handleChange(text, 'cpassword') }}
                                            value={this.state.cpassword}
                                        />

                                        {this.state.cpassword_success ? <Icon name='checkmark-circle' />: null}
                                        {this.state.cpassword_error ? <Icon name='close-circle' />: null}
                                    </Item>
                                </Form>
                            </View>
                        </ProgressStep>

                        <ProgressStep label="Enroll Class" onNext={this.verifyEnrollForm.bind(this)} errors={this.state.invalidEnrollForm}>
                            <Form style={styles.form}>
                                {
                                    this.props.teacher_id != null ?
                                        (
                                            <>
                                                <List style={{ marginBottom: 30 }} bo>
                                                    <ListItem avatar>
                                                        <Left>
                                                            <Thumbnail source={LOGO}/>
                                                        </Left>
                                                        <Body>
                                                            <Text>{this.props.fname +" " + this.props.lname}</Text>
                                                        </Body>
                                                    </ListItem>
                                                </List>
                                                <Item picker>

                                                <Picker
                                                    mode="dropdown"
                                                    selectedValue={this.state.section}
                                                    onValueChange={(itemValue, itemIndex) => { this.setState({ section: itemValue }) }}
                                                >

                                                    <Picker.Item label="Please select your section" value="" color="red"/>
                                                    
                                                    {
                                                        this.props.classes.map(function(value, index){
                                                            return(
                                                                <Picker.Item label={value.section_name+" "+value.sy} value={value.assign_id} key={index}/>
                                                            )
                                                        })
                                                    }

                                                </Picker>

                                                </Item>
                                                <CustomButton block style={styles.submit} onPress={()=>{ this.props.navigation.navigate('SearchTeacher') }} label="Change Teacher"/>
                                            </>
                                        )
                                        :
                                        (
                                            <CustomButton block style={styles.submit} onPress={()=>{ this.props.navigation.navigate('SearchTeacher') }} label="Find you Teacher"/>
                                        )
                                }
                            </Form>
                        </ProgressStep>

                        <ProgressStep label="Verify" onSubmit={this.register.bind(this)}>
                            <View style={{ alignItems: 'center' }}>
                                <Card style={{ width: PHONE.width - 20 }} transparent>
                                    <CardItem>
                                        <Body>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                                <Ion name="md-card" size={25}/>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}> ID#: </Text>
                                                <Text style={{ fontSize: 25, color: 'gray' }}> {this.state.idNumber}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                                <Ion name="ios-person" size={25}/>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Firstname: </Text>
                                                <Text style={{ fontSize: 25, color: 'gray' }}> {this.state.fname}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                                <Ion name="ios-person" size={25}/>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Lastname: </Text>
                                                <Text style={{ fontSize: 25, color: 'gray' }}> {this.state.lname}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                                <Ion name="ios-person" size={25}/>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Teacher: </Text>
                                                <Text style={{ fontSize: 25, color: 'gray' }}> {this.props.fname+" "+this.props.lname }</Text>
                                            </View>

                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                        </ProgressStep>

                    </ProgressSteps>
                    
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

const mapStateToProps = (state) => {
    
    return{
        teacher_id: state.selection.teacher_id,
        lname: state.selection.lname,
        fname: state.selection.fname,
        classes: state.selection.classes
    }
}

export default connect(mapStateToProps, null)(Register)
