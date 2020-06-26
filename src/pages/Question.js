import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, BackHandler, View, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

import { Container, Content, Card, CardItem } from 'native-base'
import Ion from 'react-native-vector-icons/Feather'

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

            questions: [
                {
                    tanong: "What is the best thing to do when its raining ?",
                    answer: 0,
                    type: 'choice',
                    choices: [
                        "Eating",
                        "Walking",
                        "Drinking",
                        "Shower"
                    ],
                    answered: false
                },
                {
                    tanong: "What are the best place to drain energy ?",
                    answer: 0,
                    type: 'choice',
                    choices: [
                        "Eating",
                        "Walking",
                        "Drinking",
                        "Shower"
                    ],
                    answered: false
                }
            ]
        }
    }

    componentDidMount(){
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    handleBackButtonClick=()=>{
        return true
    }

    check(dex, usto, tanong){
        let self = this

        if(dex == usto){
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
                    }))
                },3000)
            })
        }else{
            self.setState((prevState)=>({
                ...prevState,
                wrong: true
            }), ()=>{
                setTimeout(()=>{
                    self.setState((prevState)=>({
                        ...prevState,
                        wrong: false
                    }))
                },3000)
            })
        }
    }

    render(){

        let question
        let self = this

        

        for(let i=0; i<this.state.questions.length; i++){
            if(this.state.questions[i].answered == false){
                let usto = this.state.questions[i].answer

                const choices = this.state.questions[i].choices.map(function(value, index){
                    return(
                        <TouchableOpacity style={{ flexBasis: '50%' }} key={index} onPress={()=>{ self.check(index, usto, i) }}>
                            <Card>
                                <CardItem style={{ minHeight: 100 }}>
                                    {
                                        index < choicesMAP.length ? choicesMAP[index](): <Text style={{ fontSize: 30, color: 'blue', marginRight: 20}}>Choice #{index+1}</Text>
                                    }
                                    <Text style={{ fontSize: 20 }}>{value}</Text>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    )
                })
                question = (
                    <>
                        <Card style={{ padding: 10, paddingBottom: 20 }}>
                            <CardItem style={{ flexDirection: 'column',  }}>
                                <Text style={{ fontSize: 15, color: 'grey', marginBottom: 20, textAlign: 'center'}}>
                                    Question # {i+1}
                                </Text>
                                <Text style={{ fontSize: 20, lineHeight: 30 }}>
                                    {this.state.questions[i].tanong}
                                </Text>
                            </CardItem>
                        </Card>
                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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
                    
                    {question}
                    
                </Content>        

            </Container>
        )
    }
}

export default Question