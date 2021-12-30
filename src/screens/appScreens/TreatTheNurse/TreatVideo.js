import React, {useEffect, useState} from 'react';
import { View,StyleSheet,FlatList ,Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import TreatHeader from 'src/components/TreatHeader';
import { Divider } from 'react-native-elements';
import Card from 'src/components/Card';
import VideoCard from 'src/components/VideoCard';

const TreatVideo = ({ navigation }) => {
    const [isHeart, setHeart] = useState(false);

    const updateHeart = () => {
        setHeart(!isHeart)
    }
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Introduction",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Implementation',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/treat2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Outline",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat3.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "+22",
            label: "Education",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat4.png"),
            dt: "01 Feb",
            move: "Detail"
        },
  

    ];

    return (
        <View style={styles.container}>
            <TreatHeader
            leftIcon={"arrow-back"}
            onPressLeft={() => navigation.goBack()}
            />
        <ScrollView>
            <Apptext style={styles.monthTxt}>Video 1</Apptext>
            <View style={{marginTop:wp('4%')}}>
               <VideoCard />
            </View>
            <View style={{marginTop:wp('10%')}}>
                <Card
                videoName={"Video 1"}
                onPress={updateHeart}
                boxImg={isHeart ? require('../../../../assets/redHeart.png') : require('../../../../assets/heartBox.png')  }
                subTxt={"12 Questions"}
                />
            </View>
        </ScrollView>
        </View>
    )
}

export default TreatVideo;

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
        color:DefaultStyles.colors.textColor
    },
  
    });