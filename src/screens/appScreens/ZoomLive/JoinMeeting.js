import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Alert, Linking } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import TreatHeader from 'src/components/TreatHeader';
import SelectBox from 'src/components/SelectBox';
import Apptext from 'src/components/Apptext';
import { getAllOfCollection } from "src/firebase/utility";
import moment from 'moment';

const ZoomLive = ({ navigation, route }) => {

    const {joinmeeting} = route.params;
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
                isback={true}
                onPressRight={() => navigation.navigate("Settings")}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={styles.pinkBanner}>
                    <Image style={styles.imgStl}
                        // source={require('../../../../assets/ZoomScreen.png')}
                        source={{uri : joinmeeting.cover }}
                        />
                </View>
                <View style={styles.detailBar} >
                    <Apptext style={styles.hostTxt}>Host:</Apptext>
                    <Apptext style={styles.nameTxt}>{joinmeeting.host ? joinmeeting.host : null }</Apptext>
                    <Apptext style={styles.timeTxt}>Timings: </Apptext>
                    <Apptext style={styles.meetTime}> {moment(joinmeeting.time).format("DD MM YY")} </Apptext>
                </View>
                <View style={{ marginHorizontal: wp('6%'), marginTop: 22 }}>
                    <Apptext style={styles.desctxt}>Description</Apptext>
                    <Apptext style={styles.Desc}>{joinmeeting.description ? joinmeeting.description : null} </Apptext>
                </View>
                <View style={{ marginTop: wp('15%'), marginBottom: wp('5%') }}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(joinmeeting.link)} 
                        style={styles.buttonContainer}>
                        <Apptext style={styles.buttonText}>{"Join"}</Apptext>
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
    pinkBanner: {
        width: wp('100%'), height: wp('70%'), alignSelf: 'center',
        backgroundColor: DefaultStyles.colors.secondary, borderRadius: 10
    },
    detailBar: {
        marginTop: wp('5%'),
        flexDirection: 'row',
        width: wp('100%'),
        alignItems: 'center'
    },
    hostTxt: {
        fontSize: 13,
        marginHorizontal: wp('5%'),
        fontFamily: 'Poppins-Medium',
        color: DefaultStyles.colors.secondary
    },
    nameTxt: {
        fontSize: 12,
        color: DefaultStyles.colors.gray,
        marginHorizontal: -10,
        width: wp('32%')
    },
    timeTxt: {
        fontSize: 13,
        marginHorizontal: 15,
        fontFamily: 'Poppins-Medium',
        color: DefaultStyles.colors.secondary
    },
    meetTime: {
        fontSize: 12,
        color: DefaultStyles.colors.gray,
        marginLeft: -10,
        width: wp('27%')
    },
    desctxt: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: DefaultStyles.colors.secondary
    },
    Desc: {
        fontSize: 12,
        fontFamily: 'Poppins',
        marginHorizontal: wp('6%'),
        lineHeight: 22,
        marginTop: wp('2%'),
        textAlign: 'left'
    },
    buttonContainer: {
        marginBottom: wp('10%'),
        width: 184,
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('14%'),
        backgroundColor: DefaultStyles.colors.secondary,
        borderRadius: 8,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4%'),
        color: '#ffffff',
        fontFamily: 'Poppins-Regular'
    },
  
    imgStl: {
        width: 129,
        height: wp('70%'),
        alignSelf: 'center',
    },
   
});