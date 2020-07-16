import React, { Component } from 'react'
import { Dimensions, StyleSheet, RefreshControl } from 'react-native'
import { Container, Header, Item, Input, Icon, Button, Text, Content, List, ListItem } from 'native-base'
import { SELECT_TEACHER } from '../actions/Types'
import { connect } from 'react-redux'
import { selectTeacher } from '../actions/Selection'
import API from '../API'

const PHONE = Dimensions.get('window')

class SearchTeacher extends Component{

    constructor(props){
        super(props)
        this.state = {
            teacherList: [
                
            ],
            loading: false,
            errorLoading: false,
            searchQuery: ""
        }
    }

    componentDidMount(){
        this.loadList()
    }

    loadList(){
        let self = this

        self.setState((prevState)=>({
            ...prevState,
            loading: true
        }),async ()=>{

            const { data, status } = await API.getTeacherAssignments()

            if(data.ok == true){
                self.setState((prevState)=>({
                    ...prevState,
                    loading: false,
                    teacherList: data.data
                }))
            }else{
                self.setState((prevState)=>({
                    ...prevState,
                    loading: false,
                    teacherList: []
                }))
            }
        })
    }

    filterList(text){
        let self = this

        self.setState((prevState)=>({
            ...prevState,
            searchQuery: text
        }))
    }

    saveSelect(data){
        let self = this

        self.props.selectTeacher(data)
        self.props.navigation.goBack()
    }

    render(){
        return(
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                            <Input placeholder="Search teacher name" onChangeText={(text)=>{ this.filterList(text) }}/>
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                
                <List style={{ height: PHONE.height, width: PHONE.width }} 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this.loadList.bind(this)}
                            colors={["#3F51B5"]}
                        />
                    }
                    dataArray={this.state.teacherList}
                    renderRow={data => 
                        {
                            if((data.fname+' '+data.lname).toLowerCase().includes(this.state.searchQuery.toLowerCase())){
                                return(
                                    <ListItem onPress={()=>{ this.saveSelect(data) }}>
                                        <Text>{data.fname+' '+data.lname}</Text>
                                    </ListItem>
                                )
                            }else{
                                return null
                            }
                        }
                    }
                    keyExtractor={(item, index) => index.toString()}
                >
                   
                </List>
                
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        selectTeacher: (teacherData) => dispatch(selectTeacher(teacherData))
    }
}

export default connect(null, mapDispatchToProps)(SearchTeacher)