import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, TouchableOpacity} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Card, CardItem, Body, Icon, Right, List, ListItem } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Ion from 'react-native-vector-icons/Ionicons'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/trophy.png')
const LOGO2 = require('../Assets/home_cover.png')

import API from '../API'
import { connect } from 'react-redux'

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            trophy: 'Loading..'
        }
    }

    async load(){
        let self = this

        let payload = {
            student_id: this.props.student_id
        }

        const { data, status } = await API.getUserTrophy(payload)

        self.setState({
            trophy: data.trophy
        })
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.load()
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render(){
        return(
            <ParallaxScrollView
                parallaxHeaderHeight={300}
                renderForeground={() => (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginBottom: 14 }}>Current</Text>
                        <Image source={LOGO} style={{ height: 90, width: 90 }}/>
                        <Text style={{ fontSize: 17, color: 'gainsboro' }}>{this.state.trophy} Trophy</Text>
                    </View>
                )}
                renderBackground={()=>(
                    <Image source={LOGO2} style={{ height: 500, width: PHONE.width,  }}/>
                )}
                outputScaleValue={10}
                >
                <View style={{ minHeight: 200, padding: 14 }}>
                    <List>

                        <ListItem itemDivider>
                            <Text>Quarter List</Text>
                        </ListItem>  

                        <ListItem style={{ borderBottomWidth: 0 }}>
                            <Card transparent style={{ width: PHONE.width - 14 }}>
                                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('StoryList', { quarter: 1 }) }}>
                                    <CardItem>
                                        <Icon active name="book" />
                                        <Text>First Quarter</Text>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('StoryList', { quarter: 2 }) }}>
                                    <CardItem>
                                        <Icon active name="book" />
                                        <Text>Second Quarter</Text>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('StoryList', { quarter: 3 }) }}>
                                    <CardItem>
                                        <Icon active name="book" />
                                        <Text>Third Quarter</Text>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('StoryList', { quarter: 4 }) }}>
                                    <CardItem>
                                        <Icon active name="book" />
                                        <Text>Fourth Quarter</Text>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                            </Card>
                        </ListItem>

                    </List>
                </View>
            </ParallaxScrollView>
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

export default connect(mapStateToProps, null)(Home)
