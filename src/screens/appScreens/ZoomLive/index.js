import React, {useEffect} from 'react';
import { View,StyleSheet,FlatList ,Image } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import { Divider } from 'react-native-elements';
import HomeBox from 'src/components/HomeBox';

const ZoomLive = ({ navigation }) => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Lorem Ipsum",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/human1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Lorem Ipsum',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/human2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Smith",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/human1.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "+22",
            label: "Aliz",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/human2.png"),
            dt: "01 Feb",
            move: "Detail"
        },
        {
            id: 'bd7acbfsdea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: 'Alexa',
            msg: "Uploaded a file",
            Img: require("../../../../assets/human1.png"),
            dt: "18 Mar",
            move: "Detail"
        },
        {
            id: 'bd7acddbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "John",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/human2.png"),
            dt: "01 Feb",
            move: "Detail"
        },
        {
            id: 'bd7acbeda-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: 'Marzena',
            msg: "potem sie zobaczy",
            Img: require("../../../../assets/human1.png"),
            dt: "01 Feb",
            move: "Detail"
        },

    ];

    return (
        <View style={[styles.container]}>
            <Header 
            label="Debriefing Videos"
            leftIcon={"keyboard-backspace"}
            onPressLeft={() => { navigation.goBack() }}
            />
            <Divider width={1} style={{marginTop:-7}} color="lightgray" />

            <FlatList
                data={DATA}
                numColumns={2}
                horizontal={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <HomeBox
                    leftTitle={item.label}
                    leftImgName={item.Img}
                />
                   
                )}
            />
           
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

    }
    });