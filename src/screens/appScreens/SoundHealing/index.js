import React, {useEffect} from 'react';
import { View,StyleSheet,FlatList ,Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import { Divider } from 'react-native-elements';
import TreatBox from 'src/components/TreatBox';
import HomeWideCard from 'src/components/HomeWideCard';

const SoundHealing = ({ navigation }) => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Introduction",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/treat1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Implementation',
            msg: "super,thank you",
            Img: require("../../../../assets/treat2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Outline",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/treat3.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "+22",
            label: "Education",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/treat4.png"),
            dt: "01 Feb",
            move: "Detail"
        },
  

    ];

    return (
        <View style={styles.container}>
            <Header 
            label={"Sound Healing"}
            rightImg={require('../../../../assets/settingIcon.png')}
            />
        <ScrollView>
            <View style={{marginTop:wp('7%')}}>
                <HomeWideCard
                 backImg={require('../../../../assets/TreatCover.png')}
                isLabel={false}
                isSubTxt={true}
                setSubTxt={`Learn how powerful a simple tone, sound or
         vibration can change your emotions`}
                />
            </View>

            <View style={{marginTop:wp('6%')}}>
            <FlatList   
                data={DATA}
                numColumns={2}
                horizontal={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TreatBox
                    leftTitle={item.label}
                    leftImgName={item.Img}
                    subTxt={item.msg}
                />
                   
                )}
            />
           </View>
        </ScrollView>
        </View>
    )
}

export default SoundHealing;

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
        fontFamily:"Lato-Regular",
        fontSize:wp('5%'),
        alignSelf:'center',
        marginTop:wp('6%'),
        color:DefaultStyles.colors.secondary
    },
    });