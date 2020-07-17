import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, TouchableOpacity} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Card, CardItem, Body, Icon, Right, List, ListItem, Thumbnail, Left } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Ion from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { ProgressDialog } from 'react-native-simple-dialogs'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/trophy.png')
const LOGO2 = require('../Assets/home_cover.png')
const LOGO3 = require('../Assets/user.png')

import API from '../API'

class Leaderboard extends Component{


    constructor(props){
        super(props)
        this.state = {
            list: []
        }
    }

    load(){
        let self = this

        self.setState({ loading: true }, async ()=>{
            let payload = {
                student_id: this.props.student_id
            }
    
            const { data, status } = await API.getLeaderBoardStudent(payload)

            self.setState({ loading: false },()=>{
                if(data.ok == true){
                    console.log(data.data)
                    self.setState({ list: data.data })
                }else{
                    self.setState({ list: [] })
                }
            })

        })
    }

    componentDidMount(){
        this.load()
    }

    render(){
        return(
            <>
            <ProgressDialog
                visible={this.state.loading}
                message={"Please wait.."}
            />
            <ParallaxScrollView
                parallaxHeaderHeight={300}
                renderForeground={() => this.state.list.length > 0 ? (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white',  marginBottom: 14, fontFamily: 'kenvector_future' }}>Top #1</Text>
                        <Image source={LOGO} style={{ height: 90, width: 90 }}/>
                        <Text style={{ fontSize: 17, color: 'gainsboro', fontFamily: 'kenvector_future' }}>{this.state.list[0].fname+' '+this.state.list[0].lname}</Text>
                        <Text style={{ fontSize: 12, color: 'gainsboro', fontFamily: 'kenvector_future' }}>{this.state.list[0].trophy}</Text>
                    </View>
                ): (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginBottom: 14 }}>Top #1</Text>
                        <Image source={LOGO} style={{ height: 90, width: 90 }}/>
                        <Text style={{ fontSize: 17, color: 'gainsboro' }}>--</Text>
                        <Text style={{ fontSize: 12, color: 'gainsboro' }}>--</Text>
                    </View>
                )}
                renderBackground={()=>(
                    <Image source={LOGO2} style={{ height: 500, width: PHONE.width,  }}/>
                )}
                outputScaleValue={10}
                >
                <View style={{ minHeight: 500, padding: 14 }}>
                    <List
                        dataArray={this.state.list}
                        renderRow={
                            (row)=>(
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail square source={LOGO3} />
                                    </Left>
                                    <Body>
                                        <Text>{row.fname+' '+row.lname}</Text>
                                        <Text note numberOfLines={1}>ID: {row.student_idno}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent>
                                            <Icon name="trophy"/>
                                            <Text>{row.trophy}</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            )
                        }
                    >
                        
                    </List>
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


const mapStateToProps = (state) => {
    return{
        student_id: state.session.user_id
    }
}

export default connect(mapStateToProps, null)(Leaderboard)
