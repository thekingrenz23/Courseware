import React, { Component } from 'react'
import {
    View,
    Image,
} from 'react-native'

import { Root, Header, Left, Button, Icon, Body, Title, Right, Text } from 'native-base'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import { Login, Register, Home, Leaderboard, StoryList, ReadStory, Question, TeacherLogin, TeacherHome, Auth, SearchTeacher, Ready, StudentSummary, TeacherLeaderboard, About } from './src/pages'

import TeacherDrawerContent from './src/component/TeacherDrawerContent'
import StudentDrawerContent from './src/component/StudentDrawerContent'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

import { connect } from 'react-redux'

const AppbarList = {
	login: function(navigation){
		return null
    },
    auth: function(navigation){
		return null
    },
    teacherlogin: function(navigation){
		return null
	},
	register: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.goBack() }}>
                    	<Icon name='arrow-back'/>
                	</Button>
            	</Left>
				<Body>
					<Title>Register</Title>
				</Body>
				<Right />
			</Header>
		)
	},
	home: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.openDrawer() }}>
                    	<Icon name='menu'/>
                	</Button>
            	</Left>
				<Body>
					<Title>Home</Title>
				</Body>
				<Right>
                    <Button transparent rounded onPress={()=>{ navigation.navigate('Leaderboard') }}>
                    	<Icon name='trophy'/>
                	</Button>
                </Right>
			</Header>
		)
    },
    leaderboard: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.goBack() }}>
                    	<Icon name='arrow-back'/>
                	</Button>
            	</Left>
				<Body>
					<Title>Leaderboard</Title>
				</Body>
				<Right />
			</Header>
		)
    },
    storylist: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.goBack() }}>
                    	<Icon name='arrow-back'/>
                	</Button>
            	</Left>
				<Body>
					<Title>Story List</Title>
				</Body>
				<Right />
			</Header>
		)
    },
    readstory: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.goBack() }}>
                    	<Icon name='arrow-back'/>
                	</Button>
            	</Left>
				<Body>
					<Title>Reading story</Title>
				</Body>
				<Right />
			</Header>
		)
    },
    question: function(navigation){
		return (
			<Header>
				
				<Body style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Title>ACTIVITY</Title>
				</Body>
				
			</Header>
		)
    },
    searchteacher: function(){
        return null
    },
    ready: function(navigation){
		return null
    },
    about: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.goBack() }}>
                    	<Icon name='arrow-back'/>
                	</Button>
            	</Left>
				<Body>
					<Title>About</Title>
				</Body>
				<Right />
			</Header>
		)
    }
}

const TeacherAppbarList = {
	home: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.openDrawer() }}>
                    	<Icon name='menu'/>
                	</Button>
            	</Left>
				<Body>
					<Title>Home</Title>
				</Body>
				<Right>
                    <Button transparent rounded onPress={()=>{ navigation.navigate('Leaderboard') }}>
                    	<Icon name='trophy'/>
                	</Button>
                </Right>
			</Header>
		)
    },
    leaderboard: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.goBack() }}>
                    	<Icon name='arrow-back'/>
                	</Button>
            	</Left>
				<Body>
					<Title>Leaderboard</Title>
				</Body>
				<Right />
			</Header>
		)
    },
    studentsummary: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.goBack() }}>
                    	<Icon name='arrow-back'/>
                	</Button>
            	</Left>
				<Body>
					<Title>Student Answers Summary</Title>
				</Body>
				<Right />
			</Header>
		)
    },
    about: function(navigation){
		return (
			<Header>
				<Left>	
					<Button transparent rounded onPress={()=>{ navigation.goBack() }}>
                    	<Icon name='arrow-back'/>
                	</Button>
            	</Left>
				<Body>
					<Title>About</Title>
				</Body>
				<Right />
			</Header>
		)
    }
}

const Appbar = ( scene, navigation )=> {
	const { options } = scene.descriptor;
	const title = scene.route.name;

	return AppbarList[title.toLowerCase()](navigation)
}

const TeacherAppbar = ( scene, navigation )=> {
	const { options } = scene.descriptor;
	const title = scene.route.name;

	return TeacherAppbarList[title.toLowerCase()](navigation)
}

function HomeStack(){
    return(
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                header: ({ navigation, scene, previous }) => Appbar( scene, navigation )
            }}
        >

                <Stack.Screen 
                    name="Home" component={Home} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

                <Stack.Screen 
                    name="Leaderboard" component={Leaderboard} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

                <Stack.Screen 
                    name="StoryList" component={StoryList} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

                <Stack.Screen 
                    name="ReadStory" component={ReadStory} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

                <Stack.Screen 
                    name="Ready" component={Ready} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

                <Stack.Screen 
                    name="Question" component={Question} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

                <Stack.Screen 
                    name="About" component={About} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

        </Stack.Navigator>
    )
}

function TeacherStack(){
    return(
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                header: ({ navigation, scene, previous }) => TeacherAppbar( scene, navigation )
            }}
        >

                <Stack.Screen 
                    name="Home" component={TeacherHome} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

                <Stack.Screen 
                    name="Leaderboard" component={TeacherLeaderboard} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

                <Stack.Screen 
                    name="StudentSummary" component={StudentSummary} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

                <Stack.Screen 
                    name="About" component={About} 
                    options={{
                        ...TransitionPresets.FadeFromBottomAndroid
                    }}
                />

        </Stack.Navigator>
    )
}

class App extends Component{

    constructor(props){
        super(props)
        this.state = {
            isAuth: true
        }
    }
    
    componentDidMount(){
        console.log(this.props.type)
    }

    render(){
        return(
            <Root>
                <NavigationContainer>

                    {
                        this.props.type == null ? 

                            (
                                <Stack.Navigator
                                    headerMode="screen"
                                    screenOptions={{
                                        header: ({ navigation, scene, previous }) => Appbar( scene, navigation )
                                    }}
                                >

                                    <Stack.Screen 
                                        name="Auth" component={Auth} 
                                        options={{
                                            ...TransitionPresets.FadeFromBottomAndroid
                                        }}
                                    />

                                    <Stack.Screen 
                                        name="Login" component={Login} 
                                        options={{
                                            ...TransitionPresets.FadeFromBottomAndroid
                                        }}
                                    />

                                    <Stack.Screen 
                                        name="Register" component={Register} 
                                        options={{
                                            ...TransitionPresets.FadeFromBottomAndroid
                                        }}
                                    />

                                    <Stack.Screen 
                                        name="TeacherLogin" component={TeacherLogin} 
                                        options={{
                                            ...TransitionPresets.FadeFromBottomAndroid
                                        }}
                                    />

                                    <Stack.Screen
                                        headerMode="none" 
                                        name="SearchTeacher" component={SearchTeacher} 
                                        options={{
                                            ...TransitionPresets.FadeFromBottomAndroid
                                        }}
                                    />

                                    <Stack.Screen
                                        name="About" component={About} 
                                        options={{
                                            ...TransitionPresets.FadeFromBottomAndroid
                                        }}
                                    />
                                </Stack.Navigator>
                            )

                            :

                            
                            this.props.type == 'student' ?
                                (
                                    <Drawer.Navigator drawerContent={(props)=> <StudentDrawerContent {...props}/> } initialRouteName="Home">
                                        <Drawer.Screen name="Home" component={HomeStack} />
                                    </Drawer.Navigator>
                                )
                            :
                                (
                                    <Drawer.Navigator drawerContent={(props) => <TeacherDrawerContent {...props}/>} initialRouteName="Home">
                                        <Drawer.Screen name="Home" component={TeacherStack} />
                                    </Drawer.Navigator>
                                )
                            
                    }
                    
                </NavigationContainer>
            </Root>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        type: state.session.type
    }
}

export default connect(mapStateToProps, null)(App)
