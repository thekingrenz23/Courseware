import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, TouchableOpacity, RefreshControl} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Card, CardItem, Body, Icon, Right, List, ListItem, Thumbnail, Left, Toast } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Ion from 'react-native-vector-icons/Ionicons'
import { ConfirmDialog } from 'react-native-simple-dialogs'
import { ProgressDialog } from 'react-native-simple-dialogs'
import { connect } from 'react-redux'
import API from '../API'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/trophy.png')
const LOGO2 = require('../Assets/home_cover.png')
const LOGO3 = require('../Assets/user.png')

class TeacherHome extends Component{

    constructor(props){
        super(props)
        this.state ={
            applications: [
                
            ],
            loading: false,
            confirm: false,
            enroll_id: ""
        }
    }

    loadList(){
        let self = this

        self.setState({ loading: true }, async ()=>{
            let payload = {
                teacher_id: self.props.teacher_id
            }

            const {data , status} = await API.getStudentApplication(payload)
            
            console.log(data)

            self.setState({
                loading: false
            },()=>{
                if(data.ok == true){
                    self.setState({
                        applications: data.data
                    })
                }else{
                    self.setState({
                        applications: []
                    },()=>{
                        Toast.show({
                            text: data.message,
                            buttonText: 'Okay',
                            duration: 5000
                        })
                    })
                }
            })
        })
    }

    componentDidMount(){
        this.loadList()
    }

    accept(){
        let self = this

        self.setState(
            {
                loading: true,
                confirm: false
            },
            async ()=> {
                let payload = {
                    status: 1,
                    enroll_id: self.state.enroll_id
                }

                const { data, status } = await API.updateStatus(payload)

                self.setState({loading: false},()=>{
                    if(data.ok == true){
                        Toast.show({
                            text: data.message,
                            buttonText: 'Okay',
                            duration: 5000
                        })
                        alert("Student is now enrolled")
                        self.loadList()
                    }else{
                        Toast.show({
                            text: data.message,
                            buttonText: 'Okay',
                            duration: 5000
                        })
                    }
                })
            }
        )
    }

    render(){
        return(
            <>
            <ConfirmDialog
                title="Confirm"
                message="Are you sure you want to accept this student enrollment?"
                visible={this.state.confirm}
                onTouchOutside={() => this.setState({confirm: false})}
                positiveButton={{
                    title: "accept",
                    onPress: () => this.accept()
                }}
                negativeButton={{
                    title: "deny",
                    onPress: () => alert("No touched!")
                }}
            />
            <ProgressDialog
                visible={this.state.loading}
                title="Loading"
                message="Please, wait..."
            />
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
                    
                    {
                        this.state.applications.length == 0 ?

                            (
                                <View style={{ width: PHONE.width, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ion name="md-happy" size={100} style={{ color: 'gainsboro' }}/>
                                    <Text>No Application</Text>
                                    <Button rounded bordered style={{ marginTop: 20 }} onPress={this.loadList.bind(this)}>
                                        <Text>Refresh</Text>
                                    </Button>
                                </View>
                            )
                            :
                            (
                                <List
                                    dataArray={this.state.applications}
                                    renderRow={(data, index) => (
                                        <ListItem thumbnail>
                                            <Left>
                                                <Thumbnail square source={LOGO3} />
                                            </Left>
                                            <Body>
                                                <Text>{data.fname} {data.lname}</Text>
                                                <Text note numberOfLines={1}>ID#: {data.student_idno}</Text>
                                            </Body>
                                            <Right>
                                                <Button transparent onPress={()=>{ this.setState({ confirm: true, enroll_id: data.enroll_id }) }}>
                                                    <Text>Preview</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>    
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
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
        teacher_id: state.session.teacher_id
    }
}

export default connect(mapStateToProps, null)(TeacherHome)
