import React, { Component } from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Text } from 'native-base'
import {
    View,
    Image,
} from 'react-native'
import { connect } from 'react-redux'
import { studentSession } from '../actions/Session'
import AsyncStorage from '@react-native-community/async-storage'

const LOGO = require('../Assets/Book.png')

class StudentDrawerContent extends Component{

    async logout(){

        let userData = {
            type: null,
            name: "",
            user_id: "",
            enroll_id: ""
        }

        try{
            await AsyncStorage.removeItem('logindata')

            this.props.save(userData)
        }catch(err){
            alert("Errro logging out!")
        }
    }

    render(){
        return(
            <DrawerContentScrollView {...this.props}>
                <View style={{ height: 170, backgroundColor: '#3F51B5', marginTop: -4, justifyContent:'center', alignItems: 'flex-start' }}>
                    <Image source={LOGO} style={{ height: 80, width: 80, marginLeft: 13}}/>
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: 13, marginTop: 13 }}>{this.props.name}</Text>
                    <Text style={{ color: 'gainsboro', fontSize: 15, marginLeft: 13, marginTop: 5 }}>Student</Text>
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
    }
}

const MapDispatchToProps = (dispatch) => {
    return{
        save: (userdata)=> dispatch(studentSession(userdata))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(StudentDrawerContent)