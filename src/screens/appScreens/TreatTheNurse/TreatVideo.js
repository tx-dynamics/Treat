import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
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
import { saveData, saveFvrtsData, getListing } from "src/firebase/utility";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setAudioBtn, setAudioID } from 'src/redux/actions/authAction';

const TreatVideo = ({ navigation, route }) => {
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

    const { videodata } = route.params;
    const userInfo = useSelector((state) => state.auth.userdata)
    let dispatch = useDispatch();


    const [isHeart, setHeart] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [paused, setPaused] = useState(true);
    const [islistingData, setListingData] = useState([]);
    const [isValue, setValue] = useState([]);


    // const listingData = async () => {

    // }

    // useEffect(() => {
    //     listingData();
    // },[]);

    const heartMethod = async () => {

        // let res = await getListing("FavoriteListing", userInfo.uid)
        // console.log(res.media)
        // let result = res.media.map((item, index) => (item))
        // console.log(result);
        // result.map((item) => {
        //     if(item.id === videodata.id){
        //         // console.log(item)
        //         item.isLike =! item.isLike
        //         console.log(item)
        //     }
        // } )

        let hrt = isHeart ? false : true;

        let Details = {
            id: videodata.id ? videodata.id : null,
            title: videodata.title ? videodata.title : null,
            description: videodata.description ? videodata.description : null,
            sub_title: videodata.sub_title ? videodata.sub_title : null,
            url: videodata.url ? videodata.url : null,
            thumbnail: videodata.thumbnail ? videodata.thumbnail : null,
            userId: userInfo.uid ? userInfo.uid : null,
            isLike: hrt
        };

        await saveFvrtsData('FavoriteListing', userInfo.uid, Details);
    }

    return (
        <View style={styles.container}>
            <TreatHeader
                leftIcon={"arrow-back"}
                onPressLeft={() => navigation.goBack()}
                onPressRight={() => navigation.navigate("Settings")}
            />
            <ScrollView>
                <Apptext style={styles.monthTxt}>{videodata.title ? videodata.title : null}</Apptext>
                <View style={{ marginTop: wp('4%') }}>
                    <VideoCard
                        backImg={{ uri: videodata.thumbnail }}
                        videoUrl={videodata.url ? videodata.url : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                        videoCntrl={isPlaying ? require('../../../../assets/pause1.png') : require('../../../../assets/videoIcon.png')}
                        isPaused={paused}
                        onPress={() => {
                            setPlaying(!isPlaying)
                            isPlaying ? setPaused(true) : setPaused(false)
                            

                        }}
                    />
                </View>
                <View style={{ marginTop: wp('10%') }}>
                    <Card
                        videoName={videodata.title ? videodata.title : null}
                        boxImg={isHeart ? require('../../../../assets/redHeart.png') : require('../../../../assets/heartBox.png')}
                        onPress={() => {
                            setHeart(!isHeart)
                            heartMethod(isHeart)
                        }}
                        subTxt={videodata.sub_title ? videodata.sub_title : null}
                        description={videodata.description ? videodata.description : null}
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
    text2: {
        width: 158,
        fontFamily: "Poppins-Medium",
        fontSize: 16,
        color: DefaultStyles.colors.secondary

    },
    monthTxt: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('5%'),
        alignSelf: 'center',
        marginTop: wp('6%'),
        color: DefaultStyles.colors.textColor
    },

});