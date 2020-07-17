import React, { Component } from 'react'
import { Dimensions, StyleSheet, BackHandler, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import LottieView from 'lottie-react-native'

import { Container, Content, Card, CardItem, Button, Text, Input } from 'native-base'
import Ion from 'react-native-vector-icons/Feather'
import Sound from 'react-native-sound'
import { ConfirmDialog, ProgressDialog  } from 'react-native-simple-dialogs'
import { connect } from 'react-redux'

const buttonBG = require('../Assets/components/yellow_button00.png')
const panel = require('../Assets/components/green_panel.png')

import API from '../API'

const PHONE = Dimensions.get('window')

const choicesMAP = [
    function(){
        return(
            <Ion name="triangle" style={{ fontSize: 30, color: 'blue', marginRight: 20}}/>
        )
    },
    function(){
        return(
            <Ion name="circle" style={{ fontSize: 30, color: 'blue', marginRight: 20}}/>
        )
    },
    function(){
        return(
            <Ion name="square" style={{ fontSize: 30, color: 'blue', marginRight: 20}}/>
        )
    },
    function(){
        return(
            <Ion name="octagon" style={{ fontSize: 30, color: 'blue', marginRight: 20}}/>
        )
    },
]

class Question extends Component{

    constructor(props){
        super(props)
        this.state = {
            correct: false,
            wrong: false,
            summary: false,

            questions: [
                
            ],

            loading: false,
            summaryData: null,
            fill_answer: "",
            finalData: null
        }
        this.correctSound = null
        this.wrongSound = null
        this.backHandler = null
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        this.correctSound = new Sound('correct.wav', Sound.MAIN_BUNDLE, (error)=>{
            if(error){
                console.log(error)
            }
        })

        this.wrongSound = new Sound('wrong.wav', Sound.MAIN_BUNDLE, (error)=>{
            if(error){
                console.log(error)
            }
        })

        let shuffled = this.props.route.params.questions
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)

        //Load the questions here
        this.setState({
            questions: shuffled.map(function(value , index){
                return{
                    assessment_id: value.assessment_id,
                    tanong: value.question,
                    answer: value.answer,
                    type: value.type,
                    choices: value.choices,
                    answered: false
                }
            })
        })
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick=()=>{
        return true
    }

    check(dex, usto, tanong, assessment_id, qtype){
        let self = this

        if(qtype != 'fill'){
            if(dex == usto){
                this.correctSound.play()
                self.setState((prevState)=>({
                    ...prevState,
                    correct: true,
                    questions: prevState.questions.map(function(value, men){
                        if(men == tanong){
                            return{
                                ...value,
                                answered: true
                            }
                        }else{
                            return{
                                ...value
                            }
                        }
                    })
                }), ()=>{
                    setTimeout(()=>{
                        self.setState((prevState)=>({
                            ...prevState,
                            correct: false
                        }), ()=>{
                            self.checker()
                        })
                    },3000)
                })
            }else{
                this.wrongSound.play()
                self.setState((prevState)=>({
                    ...prevState,
                    wrong: true
                }), ()=>{
                    setTimeout(()=>{
                        
                        self.setState((prevState)=>({
                            ...prevState,
                            loading: true
                        }),async ()=>{
    
                            let payload = {
                                student_id: self.props.student_id,
                                story_id: self.props.route.params.story_id,
                                answers: [
                                    {
                                        assessment_id: assessment_id,
                                        correct: false
                                    }
                                ]
                            }
    
                            const { data, status } = await API.addScore(payload)
    
                            if(data.ok == true){
    
                                let payload = {
                                    student_id: self.props.student_id,
                                    story_id: self.props.route.params.story_id
                                }
    
                                const { data, status } = await API.getSummary(payload)
    
                                self.setState((prevState)=>({
                                    ...prevState,
                                    loading: false,
                                    summaryData: data,
                                    summary: true
                                }))
                                
                            }else{
                                alert("Network error!")
                            }
    
                        })
    
                        /*self.setState((prevState)=>({
                            ...prevState,
                            wrong: false,
                            summary: true
                        }))*/
                    },3000)
                })
            }
        }else{
            if(dex.toLowerCase() == usto.toLowerCase()){
                this.correctSound.play()
                self.setState((prevState)=>({
                    ...prevState,
                    correct: true,
                    questions: prevState.questions.map(function(value, men){
                        if(men == tanong){
                            return{
                                ...value,
                                answered: true
                            }
                        }else{
                            return{
                                ...value
                            }
                        }
                    })
                }), ()=>{
                    setTimeout(()=>{
                        self.setState((prevState)=>({
                            ...prevState,
                            correct: false
                        }), ()=>{
                            self.checker()
                        })
                    },3000)
                })
            }else{
                this.wrongSound.play()
                self.setState((prevState)=>({
                    ...prevState,
                    wrong: true
                }), ()=>{
                    setTimeout(()=>{
                        
                        self.setState((prevState)=>({
                            ...prevState,
                            loading: true
                        }),async ()=>{
    
                            let payload = {
                                student_id: self.props.student_id,
                                story_id: self.props.route.params.story_id,
                                answers: [
                                    {
                                        assessment_id: assessment_id,
                                        correct: false
                                    }
                                ]
                            }
    
                            const { data, status } = await API.addScore(payload)
    
                            if(data.ok == true){
    
                                let payload = {
                                    student_id: self.props.student_id,
                                    story_id: self.props.route.params.story_id
                                }
    
                                const { data, status } = await API.getSummary(payload)
    
                                self.setState((prevState)=>({
                                    ...prevState,
                                    loading: false,
                                    summaryData: data,
                                    summary: true
                                }))
                                
                            }else{
                                alert("Network error!")
                            }
    
                        })
    
                        /*self.setState((prevState)=>({
                            ...prevState,
                            wrong: false,
                            summary: true
                        }))*/
                    },3000)
                })
            }
        }
    }

    loadFinish(){
        let self = this

        self.setState((prevState)=>({
            ...prevState,
            loading: true
        }),async ()=>{

            let payload = {
                student_id: self.props.student_id,
                story_id: self.props.route.params.story_id,
                answers: self.props.route.params.questions.map(function(data, dex){
                    return{
                        assessment_id: data.assessment_id,
                        correct: true
                    }
                })
            }

            const { data, status } = await API.addScore(payload)

            if(data.ok == true){

                let payload = {
                    student_id: self.props.student_id,
                    story_id: self.props.route.params.story_id
                }

                const { data, status } = await API.getSummary(payload)

                self.setState((prevState)=>({
                    ...prevState,
                    loading: false,
                    finalData: data,
                }))
                
            }else{
                alert("Network error!")
            }

        })
    }

    checker(){
        let self = this
        let pasen = true
        
        if(self.state.questions.length > 0){
            for(let i=0; i<self.state.questions.length; i++){
                if(self.state.questions[i].answered == false){
                    pasen = false
                    break
                }
            }
        }else{
            pasen = false
        }
        
        if(pasen){
            self.loadFinish()
        }
    }

    render(){

        let question
        let self = this

        for(let i=0; i<this.state.questions.length; i++){
            if(this.state.questions[i].answered == false){
                let usto = this.state.questions[i].answer
                let assessment_id = this.state.questions[i].assessment_id
                let type = this.state.questions[i].type
                let choices = null

                //console.log(usto)

                if(type == 'choice'){
                    
                    let shuffled = choicesMAP
                    .map((a) => ({sort: Math.random(), value: a}))
                    .sort((a, b) => a.sort - b.sort)
                    .map((a) => a.value)

                    choices = this.state.questions[i].choices.map(function(value, index){
                        return(
                            <TouchableOpacity style={{ flex: 1 }} key={index} onPress={()=>{ self.check(index, usto, i, assessment_id, 'choice') }}>
                                <Card transparent>
                                    <CardItem style={{ minHeight: 100 }}>
                                        <Image source={buttonBG} style={{ position: 'absolute', resizeMode: 'stretch', width: PHONE.width - 10, height: 100 }}/>
                                        {
                                            index < shuffled.length ? shuffled[index](): <Text style={{ fontSize: 12, color: 'blue', marginRight: 20}}>Choice #{index+1}</Text>
                                        }
                                        <Text style={{ fontSize: 20, flexShrink: 1}} numberOfLines={4}>{value}</Text>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        )
                    })
                }else if(type == 'boolean'){

                    let shuffled = choicesMAP
                    .map((a) => ({sort: Math.random(), value: a}))
                    .sort((a, b) => a.sort - b.sort)
                    .map((a) => a.value)

                    choices = ['True','False'].map(function(value, index){
                        return(
                            <TouchableOpacity style={{ flex: 1 }} key={index} onPress={()=>{ self.check(value, usto, i, assessment_id, 'boolean') }}>
                                <Card transparent>
                                    <CardItem style={{ minHeight: 100 }}>
                                        <Image source={buttonBG} style={{ position: 'absolute', resizeMode: 'stretch', width: PHONE.width - 10, height: 100 }}/>
                                        {
                                            index < shuffled.length ? shuffled[index](): <Text style={{ fontSize: 30, color: 'blue', marginRight: 20}}>Choice #{index+1}</Text>
                                        }
                                        <Text style={{ fontSize: 20 }} numberOfLines={4}>{value}</Text>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        )
                    })
                }else if(type == 'fill'){
                    choices = (
                        <Card transparent>
                            <CardItem style={{ minHeight: 100 }}>
                                <Image source={buttonBG} style={{ position: 'absolute', resizeMode: 'stretch', width: PHONE.width - 10, height: 100 }}/>
                                <Input placeholder="Type the correct answer" onChangeText={(text)=> { this.setState({ fill_answer: text }) } }/>

                                <Button block style={{marginTop: 20}} onPress={()=>{ self.check(this.state.fill_answer, usto, i, assessment_id, "fill") }}><Text> Submit </Text></Button>
                            </CardItem>
                        </Card>
                    )
                }

                question = (
                    <>
                        <Card  style={{ padding: 10, paddingBottom: 20 }}>
                            <CardItem style={{ flexDirection: 'column',  }}>
                                <Text style={{ fontSize: 15, color: 'grey', marginBottom: 20, textAlign: 'center'}}>
                                    Question # {i+1} out of {this.state.questions.length}
                                </Text>
                                <Text style={{ fontSize: 20, lineHeight: 30 }}>
                                    {this.state.questions[i].tanong}
                                </Text>
                            </CardItem>
                        </Card>
                        <View style={{ display: 'flex', flexDirection: 'column', }}>
                            {choices}
                        </View>
                    </>
                )
                break;
            }
        }

        return(
            <Container>

                {
                    this.state.correct ? 

                    <LottieView source={require('../Assets/check.json')} autoPlay loop style={{ zIndex: 9999, backgroundColor: 'white' }}/>

                    : null
                }

                {
                    this.state.wrong ? 

                    <LottieView source={require('../Assets/wrong.json')} autoPlay loop style={{ zIndex: 9999, backgroundColor: 'white' }}/>

                    : null
                }

                <Content contentContainerStyle={{ paddingHorizontal: 4 }}>

                    <ProgressDialog
                        visible={this.state.loading}
                        message="Please, wait..."
                    />
                    
                    <ConfirmDialog
                        title="Summary"
                        visible={this.state.summary}
                        positiveButton={{
                            title: "Read Again",
                            onPress: () => this.props.navigation.goBack()
                        }} >
                        <ScrollView style={{ height: PHONE.height / 2 }}>
                            <View>
                                <LottieView source={require('../Assets/sad.json')} autoPlay loop style={{ height: PHONE.height / 4, alignSelf: 'center' }}/>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center',  marginTop: 20 }}>-1 Trophy</Text>
                                
                                
                                    
                                {
                                    this.state.summaryData != null ?
                                    <>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <Text>Current Trophy</Text>
                                        <Text> {this.state.summaryData.trophy} </Text>
                                    </View>
                                    
                                    {
                                        (
                                            this.state.summaryData.questions.map(function(data, dex){
                                                return(
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }} key={dex}>
                                                        <Text>Question #{dex+1}:</Text>
                                                        <Text>{data.retries} Retry</Text>
                                                    </View>
                                                )
                                            })
                                        )
                                    }
                                    </>
                                    : null
                                }

                            </View>
                        </ScrollView>
                    </ConfirmDialog>

                    <ConfirmDialog
                        title="Summary"
                        visible={this.state.finalData != null}
                        positiveButton={{
                            title: "Read Again",
                            onPress: () => this.props.navigation.pop(2)
                        }} >
                        <ScrollView style={{ height: PHONE.height / 2 }}>
                            <View>
                                <LottieView source={require('../Assets/trophy.json')} autoPlay loop style={{ height: PHONE.height / 4, alignSelf: 'center' }}/>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center',  marginTop: 20 }}> + {this.props.route.params.questions.length} Trophy</Text>
                                
                                    
                                {
                                    this.state.finalData != null ?
                                    <>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <Text>Current Trophy</Text>
                                        <Text> {this.state.finalData.trophy} </Text>
                                    </View>
                                    
                                    {
                                        (
                                            this.state.finalData.questions.map(function(data, dex){
                                                return(
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }} key={dex}>
                                                        <Text>Question #{dex+1}:</Text>
                                                        <Text>{data.retries} Tries</Text>
                                                    </View>
                                                )
                                            })
                                        )
                                    }
                                    </>
                                    : null
                                }

                            </View>
                        </ScrollView>
                    </ConfirmDialog>

                    {question}
                    
                </Content>        

            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.session.user_id)
    return{
        student_id: state.session.user_id
    }
}

export default connect(mapStateToProps, null)(Question)