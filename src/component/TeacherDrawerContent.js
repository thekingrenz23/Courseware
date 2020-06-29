import React, { Component } from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Text } from 'native-base'
import {
    View,
    Image,
} from 'react-native'
import { connect } from 'react-redux'
import { teacherSession } from '../actions/Session'

const LOGO = require('../Assets/Book.png')

class TeacherDrawerContent extends Component{

    logout(){
        let userData = {
            type: null,
            username: "",
            teacher_id: "",
            name: ""
        }

        this.props.save(userData)
    }

    render(){
        return(
            <DrawerContentScrollView {...this.props}>
                <View style={{ height: 170, backgroundColor: '#3F51B5', marginTop: -4, justifyContent:'center', alignItems: 'flex-start' }}>
                    <Image source={LOGO} style={{ height: 80, width: 80, marginLeft: 13}}/>
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: 13, marginTop: 13 }}>{this.props.name}</Text>
                    <Text style={{ color: 'gainsboro', fontSize: 15, marginLeft: 13, marginTop: 5 }}>username: {this.props.username}</Text>
                </View>
                <DrawerItemList {...this.props} />
                <DrawerItem label="Logout" onPress={()=>{ this.logout() }}/>
            </DrawerContentScrollView>
        )
    }
}

const MapStateToProps = (state) =>  {
    return{
        name: state.session.name,
        username: state.session.username
    }
}

const MapDispatchToProps = (dispatch) => {
    return{
        save: (userdata)=> dispatch(teacherSession(userdata))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(TeacherDrawerContent)