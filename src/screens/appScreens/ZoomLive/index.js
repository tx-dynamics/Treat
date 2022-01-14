import React, {useEffect, useState} from 'react';
import { View,StyleSheet,FlatList ,TouchableOpacity, Image, ScrollView, Alert, Linking } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import TreatHeader from 'src/components/TreatHeader';
import SelectBox from 'src/components/SelectBox';
import Apptext from 'src/components/Apptext';
import { getAllOfCollection} from "src/firebase/utility";


const ZoomLive = ({ navigation, route }) => {
    const [isItem, setSelectedItem] = useState([]);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "1",
            label: "Join Now",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "2",
            label: 'Archieved Meetings',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/treat2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
    ];

    const [meetingLink, setMeetingLink] = useState([]);

    const chkData = async () => {
        let res = await getAllOfCollection("meeting")
        setMeetingLink([res])
        console.log("res", res)
    }

    useEffect(() => {
        chkData();
    }, []);

    const addCategories = async (item) => {
        var selectedIdss = [...isItem]
        if (selectedIdss.includes(item.id)) {
            selectedIdss = selectedIdss.filter(id => id !== item.id)
        }
        else {
            selectedIdss.push(item.id)
        }
        await setSelectedItem(selectedIdss)
    }


    return (
        <View style={styles.container}>
            <TreatHeader 
            isback={false}
            onPressRight={() => navigation.navigate("Settings")}
            onPressLeft={() => navigation.goBack()}
            />
        <ScrollView>
            <Image style={styles.imgStl} source={require('../../../../assets/ZoomScreen.png')} />
            <View style={{marginTop:wp('7%'), marginBottom:wp('5%')}}>
            <FlatList   
                data={meetingLink}
                keyExtractor={(item) => item.link}
                renderItem={({ item, index }) => (
                    <SelectBox
                    onPress={() => navigation.navigate("JoinMeeting", {joinmeeting : item})}
                    // onPress={() => Linking.openURL(item.link)}
                    // onPress={() => {
                    //     addCategories(item)
                    //     // navigation.navigate("Library")
                    // }}
                    // myStl={isItem.includes(item.id) ? true : false }
                    leftTitle={"Join Now"}
                    count={index + 1}
                />
                   
                )}
            />
            
            <TouchableOpacity
            onPress={() => navigation.navigate("PodCastVideo",{catName:"archieved"})}
             style={styles.SightingContainer}
              >
            <View style={styles.DirectionView}>
            <View style={styles.boxWidth}>
            <View style={styles.pinkCircle}>
            <Apptext style={styles.countStl1}>{"2"}</Apptext>
            </View>
            </View>
            <Apptext style={styles.SightingText1}>
                {"Archieved Meetings"}
            </Apptext>
            </View>
            </TouchableOpacity>
           </View>
        </ScrollView>
        </View>
    )
}

export default ZoomLive;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    headerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    text2:{
        width:158,
        fontFamily:"Poppins-Medium",
        fontSize:16,
        color:DefaultStyles.colors.secondary

    },
    monthTxt:{
        fontFamily:"Poppins-Regular",
        fontSize:wp('5%'),
        alignSelf:'center',
        marginTop:wp('6%'),
    },
    cntrTxt:{
        alignSelf:'center',
        fontFamily:'Poppins-Regular',
        fontSize:wp('3%'),
        marginTop:wp('5%')
    },
    imgStl:{
        width:241, height:304, alignSelf:'center',
        marginTop:wp('5%')
    },
    SightingContainer:{
        width:wp('90%'),
        marginTop:wp('4%'),
        marginBottom:1,
        borderRadius:8,
        alignSelf:'center',
        backgroundColor:DefaultStyles.colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 1,
    },
    SightingContainer1:{
        width:wp('90%'),
        marginTop:wp('4%'),
        borderRadius:8,
        marginBottom:1,
        alignSelf:'center',
        backgroundColor:DefaultStyles.colors.secondary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 1,
    },
    DirectionView:{
        flexDirection:'row',
        alignItems:'center',
        padding:15,
    },
    countStl:{
        color:DefaultStyles.colors.white,
        padding:1
    },
    countStl1:{
        color:DefaultStyles.colors.secondary,
        padding:1
    },
    boxWidth:{
        width:wp('12%'),
    },
    whiteCircle:{
        width:wp('8%'),
        borderWidth:2,
        borderColor:DefaultStyles.colors.white,
        height:wp('8%'),
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    pinkCircle:{
        width:wp('8%'),
        borderWidth:2,
        borderColor:DefaultStyles.colors.secondary,
        height:wp('8%'),
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    SightingText1: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('5%'),
        width: wp('65%'),
        color: DefaultStyles.colors.secondary,
    },
    SightingText: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('5%'),
        width: wp('65%'),
        color: DefaultStyles.colors.white,
    },
    innerTxt:{
        fontFamily:'Lato-Regular',
        fontSize:wp('2%'),
        color:DefaultStyles.colors.white
    }
    });