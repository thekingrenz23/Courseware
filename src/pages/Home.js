import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, TouchableOpacity} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Card, CardItem, Body, Icon, Right, List, ListItem } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Ion from 'react-native-vector-icons/Ionicons'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/trophy.png')
const LOGO2 = require('../Assets/home_cover.png')

class Home extends Component{
    render(){
        return(
            <ParallaxScrollView
                parallaxHeaderHeight={300}
                renderForeground={() => (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginBottom: 14 }}>Current</Text>
                        <Image source={LOGO} style={{ height: 90, width: 90 }}/>
                        <Text style={{ fontSize: 17, color: 'gainsboro' }}>12 Trophy</Text>
                    </View>
                )}
                renderBackground={()=>(
                    <Image source={LOGO2} style={{ height: 500, width: PHONE.width,  }}/>
                )}
                outputScaleValue={10}
                >
                <View style={{ minHeight: 500, padding: 14 }}>
                    <List>
                        <ListItem itemDivider>
                            <Text>Quarter List</Text>
                        </ListItem>             
                        <ListItem style={{ borderBottomWidth: 0 }}>
                            <Card transparent style={{ width: PHONE.width - 14 }}>
                                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('StoryList') }}>
                                    <CardItem>
                                        <Icon active name="book" />
                                        <Text>First Quarter</Text>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <CardItem>
                                        <Icon active name="book" />
                                        <Text>Second Quarter</Text>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <CardItem>
                                        <Icon active name="book" />
                                        <Text>Third Quarter</Text>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                                <TouchableOpacity>
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
                        <ListItem itemDivider style={{ marginTop: 13 }}>
                            <Text>Recent</Text>
                        </ListItem>
                        <ListItem style={{ borderBottomWidth: 0 }}>
                            <Card transparent style={{ width: PHONE.width - 14 }}>
                                <TouchableOpacity>
                                    <CardItem>
                                        <Icon active name="time" />
                                        <Text>Akarus and Duldug</Text>
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

export default Home
