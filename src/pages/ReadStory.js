import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, TouchableOpacity} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Card, CardItem, Body, Icon, Right, List, ListItem, Thumbnail, Left } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Ion from 'react-native-vector-icons/Ionicons'
import StyledText from 'react-native-styled-text'
import HTML from 'react-native-render-html'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/Book.png')
const LOGO2 = require('../Assets/home_cover.png')
const LOGO3 = require('../Assets/user.png')

import CustomButton from '../component/Button'

class ReadStory extends Component{
    render(){
        return(
            <ParallaxScrollView
                parallaxHeaderHeight={300}
                renderForeground={() => (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginBottom: 14 }}>{this.props.route.params.title}</Text>
                        <Image source={LOGO} style={{ height: 120, width: 120 }}/>
                    </View>
                )}
                renderBackground={()=>(
                    <Image source={LOGO2} style={{ height: 500, width: PHONE.width,  }}/>
                )}
                outputScaleValue={10}
                >
                <View style={{ minHeight: 500, padding: 14 }}>
                    <HTML html={this.props.route.params.story} baseFontStyle={{ fontSize: 18, lineHeight: 40 }}/>
                    <CustomButton label="Answer Questions" block style={styles.submit} onPress={()=>{ this.props.navigation.navigate('Ready', { ...this.props.route.params }) }}/>
                </View>
            </ParallaxScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    header: {
        fontSize: 20,
        lineHeight: 40,
        textAlign: 'left'
    },
    submit:{
        marginVertical: 20
    },
    br:{

    }
})

export default ReadStory
