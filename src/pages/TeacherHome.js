import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, TouchableOpacity} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Card, CardItem, Body, Icon, Right, List, ListItem, Thumbnail, Left } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Ion from 'react-native-vector-icons/Ionicons'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/trophy.png')
const LOGO2 = require('../Assets/home_cover.png')
const LOGO3 = require('../Assets/user.png')

class TeacherHome extends Component{
    render(){
        return(
            <ParallaxScrollView
                parallaxHeaderHeight={300}
                renderForeground={() => (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginBottom: 14 }}>Top #1</Text>
                        <Image source={LOGO} style={{ height: 90, width: 90 }}/>
                        <Text style={{ fontSize: 17, color: 'gainsboro' }}>Renz Carlo Salanga</Text>
                        <Text style={{ fontSize: 12, color: 'gainsboro' }}>Congratulations</Text>
                    </View>
                )}
                renderBackground={()=>(
                    <Image source={LOGO2} style={{ height: 500, width: PHONE.width,  }}/>
                )}
                outputScaleValue={10}
                >
                <View style={{ minHeight: 500, padding: 14 }}>
                    <List>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={LOGO3} />
                            </Left>
                            <Body>
                                <Text>Sankhadeep</Text>
                                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Text>Preview</Text>
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={LOGO3} />
                            </Left>
                            <Body>
                                <Text>Sankhadeep</Text>
                                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Text>Preview</Text>
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={LOGO3} />
                            </Left>
                            <Body>
                                <Text>Sankhadeep</Text>
                                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Text>Preview</Text>
                                </Button>
                            </Right>
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

export default TeacherHome
