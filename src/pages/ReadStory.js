import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, StatusBar, TouchableOpacity} from 'react-native'

import { Form, Item, Label, Input, Button, Text, Container, Content, Card, CardItem, Body, Icon, Right, List, ListItem, Thumbnail, Left } from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Ion from 'react-native-vector-icons/Ionicons'
import StyledText from 'react-native-styled-text'

const PHONE = Dimensions.get('window')
const LOGO = require('../Assets/Book.png')
const LOGO2 = require('../Assets/home_cover.png')
const LOGO3 = require('../Assets/user.png')

class ReadStory extends Component{
    render(){
        return(
            <ParallaxScrollView
                parallaxHeaderHeight={300}
                renderForeground={() => (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginBottom: 14 }}>Ikarus & DalDalus</Text>
                        <Image source={LOGO} style={{ height: 120, width: 120 }}/>
                    </View>
                )}
                renderBackground={()=>(
                    <Image source={LOGO2} style={{ height: 500, width: PHONE.width,  }}/>
                )}
                outputScaleValue={10}
                >
                <View style={{ minHeight: 500, padding: 14 }}>
                    <StyledText
                        style={styles.header}
                    >
                        {"Increasing impression interested expression he my at. <b>Respect</b> invited request charmed me warrant to. Expect no pretty as do though so genius afraid cousin. Girl when of ye snug poor draw. Mistake totally of in chiefly. Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in. Known not end fully being style house. An whom down kept lain name so at easy. He unaffected sympathize discovered at no am conviction principles. Girl ham very how yet hill four show. Meet lain on he only size. Branched learning so subjects mistress do appetite jennings be in. Esteems up lasting no village morning do offices. Settled wishing ability musical may another set age. Diminution my apartments he attachment is entreaties announcing estimating. And total least her two whose great has which. Neat pain form eat sent sex good week. Led instrument sentiments she simplicity. Use securing confined his shutters. Delightful as he it acceptance an solicitude discretion reasonably. Carriage we husbands advanced an perceive greatest. Totally dearest expense on demesne ye he. Curiosity excellent commanded in me. Unpleasing impression themselves to at assistance acceptance my or. On consider laughter civility offended oh. On no twenty spring of in esteem spirit likely estate. Continue new you declared differed learning bringing honoured. At mean mind so upon they rent am walk. Shortly am waiting inhabit smiling he chiefly of in. Lain tore time gone him his dear sure. Fat decisively estimating affronting assistance not. Resolve pursuit regular so calling me. West he plan girl been my then up no. No opinions answered oh felicity is resolved hastened. Produced it friendly my if opinions humoured. Enjoy is wrong folly no taken. It sufficient instrument insipidity simplicity at interested. Law pleasure attended differed mrs fat and formerly. Merely thrown garret her law danger him son better excuse. Effect extent narrow in up chatty. Small are his chief offer happy had. Preserved defective offending he daughters on or. Rejoiced prospect yet material servants out answered men admitted. Sportsmen certainty prevailed suspected am as. Add stairs admire all answer the nearer yet length. Advantages prosperous remarkably my inhabiting so reasonably be if. Too any appearance announcing impossible one. Out mrs means heart ham tears shall power every. Fulfilled direction use continual set him propriety continued. Saw met applauded favourite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly. Dashwoods see frankness objection abilities the. As hastened oh produced prospect formerly up am. Placing forming nay looking old married few has. Margaret disposed add screened rendered six say his striking confined. Is we miles ready he might going. Own books built put civil fully blind fanny. Projection appearance at of admiration no. As he totally cousins warrant besides ashamed do. Therefore by applauded acuteness supported affection it. Except had sex limits county enough the figure former add. Do sang my he next mr soon. It merely waited do unable. In alteration insipidity impression by travelling reasonable up motionless. Of regard warmth by unable sudden garden ladies. No kept hung am size spot no. Likewise led and dissuade rejoiced welcomed husbands boy. Do listening on he suspected resembled. Water would still if to. Position boy required law moderate was may. Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at."}
                    </StyledText>
                    <Button block style={styles.submit} onPress={()=>{ this.props.navigation.navigate('Question') }}><Text> Answer Questions </Text></Button>
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
        textAlign: 'justify'
    },
    submit:{
        marginVertical: 20
    }
})

export default ReadStory
