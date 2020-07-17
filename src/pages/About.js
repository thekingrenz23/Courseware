import React, { Component } from 'react'
import { Text, View } from 'react-native'

class About extends Component{
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Vesion: 1.0</Text>
                <Text>Developed by: Che Navato</Text>
                <Text>"Icon made by Freepik from www.flaticon.com"</Text>
                <Text></Text>
                <Text></Text>
                <Text>Animations by</Text>
                <Text></Text>
                <Text>@mograph.ix/LottieFiles</Text>
                <Text>@Guilherme Schneider/LottieFiles</Text>
                <Text>@Takaya Deguchi/LottieFiles</Text>
                <Text>@Omar Osama/LottieFiles</Text>
                <Text>@Viktors Romaņuks/LottieFiles</Text>
                <Text>@Taras Chernenko/LottieFiles</Text>
            </View>
        )
    }
}

export default About