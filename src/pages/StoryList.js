import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, TouchableOpacity} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Card, CardItem, Body, Icon, Right, List, ListItem, Thumbnail, Left } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Ion from 'react-native-vector-icons/Ionicons'
import { ProgressDialog } from 'react-native-simple-dialogs'
import { connect } from 'react-redux'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/Book.png')
const LOGO2 = require('../Assets/home_cover.png')
const LOGO3 = require('../Assets/user.png')

import API from '../API'

class StoryList extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading: false,
            dataList: []
        }
        this._unsubscribe = null
    }
    
    loadList(){
        let self = this

        self.setState({loading: true}, async ()=>{
            let payload = {
                quarter: self.props.route.params.quarter,
                student_id: this.props.student_id
            }

            const { data, status } = await API.getUnlockedStory(payload)

            self.setState({ loading: false }, ()=>{
                console.log(data)
                if(data.ok == true){
                    self.setState({dataList: data.data})
                }else{
                    self.setState({ dataList: [] })
                }
            })
        })
    }

    componentDidMount(){
        //this.loadList()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadList()
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render(){
        return(
            <>
            <ProgressDialog
                visible={this.state.loading}
                message="Please, wait..."
            />
            <ParallaxScrollView
                parallaxHeaderHeight={300}
                renderForeground={() => (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginBottom: 14 }}>{this.props.route.params.quarter == 1 ? 'First':this.props.route.params.quarter == 2 ? 'Second': this.props.route.params.quarter == 3 ? 'Third': this.props.route.params.quarter == 4 ? 'Fourth': ''} Quarter</Text>
                        <Image source={LOGO} style={{ height: 120, width: 120 }}/>
                    </View>
                )}
                renderBackground={()=>(
                    <Image source={LOGO2} style={{ height: 500, width: PHONE.width,  }}/>
                )}
                outputScaleValue={10}
                >
                <View style={{ minHeight: 200 }}>
                    
                    {
                        this.state.dataList.length == 0 ? 
                            (
                                <View style={{ width: PHONE.width, justifyContent: 'center', alignItems: 'center', marginTop: 13 }}>
                                    <Ion name="md-sad" size={100} style={{ color: 'gainsboro' }}/>
                                    <Text>No Story Svailable</Text>
                                    <Button rounded bordered style={{ marginTop: 20 }} onPress={this.loadList.bind(this)}>
                                        <Text>Refresh</Text>
                                    </Button>
                                </View>
                            )
                        :
                            (
                                <List
                                    dataArray={this.state.dataList}
                                    renderRow={(data, sectionID, rowId) => (
                                        <ListItem thumbnail>
                                            <Left>
                                                <Thumbnail square source={LOGO} />
                                            </Left>
                                            <Body>
                                                <Text>{data.title}</Text>
                                                <Text note numberOfLines={1}>Story #{rowId+1}</Text>
                                            </Body>
                                            <Right>
                                                <Button transparent onPress={()=>{ 
                                                    if(data.unlock){
                                                        if(data.completed == false){
                                                            this.props.navigation.navigate('ReadStory', {...data})
                                                        }else{
                                                            alert("You have already taken the activity of this story")
                                                        }
                                                    }else{
                                                        alert("Story is lock")
                                                    }
                                                 }}>
                                                    <Text>Read</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{ padding: 14 }}
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

const mapStateToProps = (state) => {
    return{
        student_id: state.session.user_id
    }
}

export default connect(mapStateToProps, null)(StoryList)
