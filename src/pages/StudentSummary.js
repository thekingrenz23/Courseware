import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, TouchableOpacity, ScrollView} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Card, CardItem, Body, Icon, Right, List, ListItem, Thumbnail, Left } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Ion from 'react-native-vector-icons/Ionicons'
import { ConfirmDialog, ProgressDialog } from 'react-native-simple-dialogs'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/Book.png')
const LOGO2 = require('../Assets/home_cover.png')
const LOGO3 = require('../Assets/user.png')

import API from '../API'

class StudentSummary extends Component{

    constructor(props){
        super(props)
        this.state = {
            dialogVisible: false,
            loading: false,
            list: [],
            summarData: null,
            dtitle: ""
        }
    }

    load(){
        let self = this

        self.setState({ loading: true },async ()=>{
            let payload = {
                student_id: self.props.route.params.student_id
            }

            const { data, status } = await API.getStudentRecord(payload)

            self.setState({ loading: false }, ()=>{
                if(data.ok == true){
                    //console.log(data.data)
                    self.setState({
                        list: data.data
                    })
                }else{
                    self.setState({
                        list: []
                    })
                }
            })


        })
    }

    componentDidMount(){
        this.load()
    }

    async loadSummary(story_id, title){
        let self = this

        let payload = {
            story_id: story_id,
            student_id: self.props.route.params.student_id
        }

        const { data, status } = await API.getSummary(payload)
    
        self.setState({ loading : false, summarData: data.questions, dialogVisible: true, dtitle: title })
        
    }

    render(){
        return(
            <>
            <ProgressDialog
                visible={this.state.loading}
                message={"Please wait.."}
            />
            <ConfirmDialog
                title={this.state.dtitle}
                visible={this.state.dialogVisible}
                onTouchOutside={() => this.setState({dialogVisible: false})}
                positiveButton={{
                    title: "OK",
                    onPress: () => this.setState({dialogVisible: false})
                }} >
                <ScrollView style={{ maxHeight: PHONE.height / 2 }}>
                    {
                        this.state.summarData != null ?
                            this.state.summarData.map(function(val, dex){
                                return(
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <Text>Question #{dex+1}</Text>
                                        <Text>{val.retries} Retries</Text>
                                    </View>
                                )
                            })
                        : null
                    }
                </ScrollView>
            </ConfirmDialog>

            <ParallaxScrollView
                parallaxHeaderHeight={300}
                renderForeground={() => (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={LOGO3} style={{ height: 90, width: 90 }}/>
                        <Text style={{ fontSize: 17, color: 'gainsboro' }}>{this.props.route.params.name}</Text>
                        <Text style={{ fontSize: 17, color: 'gainsboro' }}>{this.props.route.params.trophy} Trophy</Text>
                    </View>
                )}
                renderBackground={()=>(
                    <Image source={LOGO2} style={{ height: 500, width: PHONE.width,  }}/>
                )}
                outputScaleValue={10}
                >
                <View style={{ minHeight: 500, padding: 14 }}>
                    {
                        this.state.list.length == 0 ?

                        (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Ion name="md-sad" size={100} style={{ color: 'gainsboro' }}/>
                                <Text>This student havent read yet</Text>
                                <Button rounded bordered style={{ marginTop: 20 }} onPress={this.load.bind(this)}>
                                    <Text>Refresh</Text>
                                </Button>
                            </View>
                        )
                        :
                        (
                            <List
                                dataArray={this.state.list}
                                renderRow={ (row)=>(
                                    <ListItem thumbnail onPress={ () => { this.setState({ loading: true }, ()=>{ this.loadSummary(row.story_id, row.title) }) } }>
                                        <Left>
                                            <Thumbnail square source={LOGO} />
                                        </Left>
                                        <Body>
                                            <Text>Title: {row.title}</Text>
                                        </Body>
                                        <Right/>
                                    </ListItem>
                                ) }
                            >
                                
                            </List>
                        )
                    }
                </View>
            </ParallaxScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
})

export default StudentSummary
