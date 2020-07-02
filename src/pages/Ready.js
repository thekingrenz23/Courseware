import React, { Component } from 'react'
import { Dimensions, StyleSheet, BackHandler, View, TouchableOpacity, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native'

import { Container, Content, Card, CardItem, Button, Text } from 'native-base'
import Ion from 'react-native-vector-icons/Feather'
import Sound from 'react-native-sound'

const PHONE = Dimensions.get('window')

class Ready extends Component{

    constructor(props){
        super(props)
        this.state = {
            ready: false
        }
        this.bgSound = null
    }

    componentDidMount(){
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        this.bgSound = new Sound('ready.mp3', Sound.MAIN_BUNDLE, (error)=>{
            if(error){
                console.log(error)
            }

            this.bgSound.play()
        })
    }

    componentWillUnmount(){
        this.bgSound.stop()
    }

    componentDidUpdate(){
        this.bgSound.stop()
        this.bgSound.play()
    }

    render(){
        return(
            <Container>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                {
                    this.state.ready == false ?
                        (
                            <>
                                <LottieView source={require('../Assets/ready.json')} autoPlay loop/>

                                <Content contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center', flex: 1, paddingHorizontal: 20 }}>
                                    
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Are you ready to take the activity ?</Text>
                                    <Button block style={{ marginTop: 30 }} onPress={()=>{ this.setState({ ready: true }) }}><Text> Let's Go </Text></Button>
                                </Content>  
                            </>
                        )

                    :

                        (
                            <LottieView source={require('../Assets/countdown.json')} autoPlay loop={false} style={{ width: PHONE.width }} onAnimationFinish={ ()=>{ this.bgSound.stop(); this.bgSound.release();  this.props.navigation.replace('Question', { ...this.props.route.params }) } }/>
                        )
                }     

            </Container>
        )
    }
}

export default Ready