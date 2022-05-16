
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image,ToastAndroid,ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import TreatHeader from 'src/components/TreatHeader';
import firestore from '@react-native-firebase/firestore';
import { Divider } from 'react-native-elements';
import Card from 'src/components/Card';
import {useIsFocused} from '@react-navigation/native';
import VideoCard from 'src/components/VideoCard';
import { saveData, saveFvrtsData, getListing,saveFav } from "src/firebase/utility";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setAudioBtn, setAudioID,setItemLikes,setPlayStatus } from 'src/redux/actions/authAction';
import { useFocusEffect } from '@react-navigation/native';


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
    let dispatch = useDispatch();
    const isFocused = useIsFocused();

    const userInfo = useSelector((state) => state.auth.userdata)
    const FavItems = useSelector((state) => state.auth.ItemLikes)
    const likeID = useSelector((state) => state.auth.likeId)
    const [isHeart, setHeart] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [paused, setPaused] = useState(true);
    const [islistingData, setListingData] = useState([]);
    const [isValue, setValue] = useState([]);
    const [isRefresh, setReferesh] = useState(false);
    const audioCntrl = useSelector((state) => state.auth.audioBtn)
    console.log("audioCntrl",audioCntrl)

    const getFvListing = async() => {
        console.log("In")
        let res = await getListing("FavoriteListing", userInfo.uid)
        console.log("res",res)
        dispatch(setItemLikes(res.media))
        if (FavItems === undefined) {
            console.log("Undefined found")    
        }
        else{
            console.log("FavItems",FavItems)
            FavItems.forEach((val) => 
          { 
             if (val.id === videodata.id) {
                setHeart(true)
             }  
             else{
                
             }
            }  
            )  
        }
    }
    
    // useFocusEffect(
    //     React.useCallback(() => {
    //         getFvListing();
    //     }, [navigation])
    //   );

    useEffect(() => {
        getFvListing();
    },[isFocused]);
   

    const heartMethod = async (item) => {
        
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
        let exist ;
        let indexes ;
        if (typeof FavItems === "undefined") {
            console.log("Undefined")
        }
        else{
            FavItems.map((val, index) => 
            {
                if (videodata.id === val.id) {
                    console.log("exists")
                    console.log("index", index)
                    exist = true;
                    indexes = index;
                }     
            })
        }
    if (exist === true) {
        console.log(indexes)
        FavItems.splice(indexes,1)
        await firestore().collection("FavoriteListing").doc(userInfo.uid).delete().
        then(async() => {
            await saveFav("FavoriteListing",userInfo.uid, FavItems)
        })
    }
    else{
        console.log("FavItems",FavItems)
        FavItems.push(Details)
        await saveFav("FavoriteListing",userInfo.uid, FavItems)
    }
    }
const chkPreviousAudio = () => {
    if (audioCntrl === true) {
        ToastAndroid.show("Please Stop Running Audio First", ToastAndroid.LONG);
    }
    else{
        setPlaying(!isPlaying)
        isPlaying ? setPaused(true) : setPaused(false)
    }
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
                          chkPreviousAudio();
                        }}
                    />
                </View>
                <View style={{ marginTop: wp('10%') }}>
                    <Card
                        videoName={videodata.title ? videodata.title : null}
                        boxImg={isHeart ? require('../../../../assets/redHeart.png') : require('../../../../assets/heartBox.png')}
                        onPress={() => {
                            setHeart(!isHeart)
                            heartMethod(videodata)
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