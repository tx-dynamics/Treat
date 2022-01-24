import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import TreatHeader from 'src/components/TreatHeader';
import Card from 'src/components/Card';
import AudioCard from 'src/components/AudioCard';
import TrackPlayer from 'react-native-track-player';
import { saveData, saveFvrtsData,getListing,removeToArray, getFvrtsListing,saveFav, addToArray } from "src/firebase/utility";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setAudioBtn, setLikeID, setAudioID, setItemLikes } from 'src/redux/actions/authAction';
import { Alert } from 'react-native';


const Audios = ({ navigation, route }) => {

    const { audiodata } = route.params;
    let dispatch = useDispatch();

    const userInfo = useSelector((state) => state.auth.userdata)
    const audioCntrl = useSelector((state) => state.auth.audioBtn)
    const audioId = useSelector((state) => state.auth.audioID)
    const FavItems = useSelector((state) => state.auth.ItemLikes)
    const likeID = useSelector((state) => state.auth.likeId)


    const [isHeart, setHeart] = useState(false);
    const [isRandomNum, setRandomNum] = useState('');
    const [isAzanDon, setAzanDon] = useState([]);
    const [yeData, setmyData] = useState(false);
    const [isID, setID] = useState([]);

    const updateHeart = () => {
        setHeart(!isHeart)
    }
    const [isPlaying, setPlaying] = useState(false);
    // console.log("ItemLikes", FavItems)
    const RandomNumberFunction = (name, num) => {
        // console.log(name, num)
        const txt = name;
        let myNum = 0;
        for (let i = 0; i < txt.length; i++) {
            myNum = myNum + txt.charCodeAt(i);
        }
        let random = myNum + num.toString();

        return random;
    };

    const getFvListing = async() => {
        let res = await getFvrtsListing("FavoriteListing", userInfo.uid)
        dispatch(setItemLikes(res))
        FavItems.forEach(myFunction)  
    }

    const myFunction = (item) => {
        setID([item.id])
      }
    const heartMethod = async (item) => {
        
        let str = RandomNumberFunction(item.title, item.id);
        let hrt = isHeart ? false : true;

        await saveFav("FavoriteListing", userInfo.uid, {
            UID: userInfo.uid,
          });

        let Details = {
            id: audiodata.id ? audiodata.id : null,
            title: audiodata.title ? audiodata.title : null,
            description: audiodata.description ? audiodata.description : null,
            sub_title: audiodata.sub_title ? audiodata.sub_title : null,
            url: audiodata.url ? audiodata.url : null,
            thumbnail: audiodata.thumbnail ? audiodata.thumbnail : null,
            userId: userInfo.uid ? userInfo.uid : null,
            isLike: true
        };
        let result  =  isID.includes(audiodata.id);
        if(result === true){
            console.log("exists")
            await removeToArray("FavoriteListing",userInfo.uid, 'media',
            {
                id: audiodata.id,
                media: Details
            });
        } else{
            console.log("Value does not exists!")
            await addToArray("FavoriteListing",userInfo.uid, 'media',
            {
                id: audiodata.id,
                media: Details
            });
        }
        // isAzanDon.map((item) => {
        //     if (item.id === audiodata.id) {
        //         console.log("ITEMID", item.id , "DBID =>" , audiodata.id ) 
        //         setmyData(true)
        //         item.isLike = !item.isLike
        //     }
        // })
        // console.log("isAzanDon",isAzanDon)
       
        // await saveFvrtsData('FavoriteListing', userInfo.uid, yeData === true ? isAzanDon : Details, yeData === true ? "update" : "insert")
        getFvListing();
     
    }

    const start = async () => {
        // Set up the player
        await TrackPlayer.setupPlayer();

        // Add a track to the queue
        await TrackPlayer.add({
            id: audiodata.id ? audiodata.id : null,
            // url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3',
            url: audiodata.url ? audiodata.url : null,
            title: audiodata.title ? audiodata.title : "Music Track",
            artist: audiodata.sub_title ? audiodata.sub_title : "Playlist Song",
            artwork: audioCntrl ? require('../../../../assets/pause1.png') : require('../../../../assets/videoIcon.png')
        });

        // Start playing it
        await TrackPlayer.play();
    };
    const stop = () => {
        TrackPlayer.stop();
    };

    const chkPlayer = () => {
        dispatch(setAudioBtn(!audioCntrl))
        audioCntrl ? stop() : start()
        dispatch(setAudioID(audiodata.id))
    }

    useEffect(() => {
        getFvListing();
        if (audiodata.id === audioId) {
            dispatch(setAudioBtn(true))
        }
        else {
            dispatch(setAudioBtn(false))
            console.log("Not Same")
        }
    }, []);

    const FavMeth = async() => {
         let hrt = isHeart ? false : true;
         let success1 = await saveFav("FavoriteListing", userInfo.uid, {
            id: audiodata.id,
            title: audiodata.title ? audiodata.title : null,
            description: audiodata.description ? audiodata.description : null,
            sub_title: audiodata.sub_title ? audiodata.sub_title : null,
            url: audiodata.url ? audiodata.url : null,
            thumbnail: audiodata.thumbnail ? audiodata.thumbnail : null,
            userId: userInfo.uid ? userInfo.uid : null,
            isLike: hrt
          });
    
        //  let success = await addToArray("FavoriteListings",userInfo.uid, 'media',
        //  {
        //      id: audiodata.id ? audiodata.id : null,
        //      title: audiodata.title ? audiodata.title : null,
        //      description: audiodata.description ? audiodata.description : null,
        //      sub_title: audiodata.sub_title ? audiodata.sub_title : null,
        //      url: audiodata.url ? audiodata.url : null,
        //      thumbnail: audiodata.thumbnail ? audiodata.thumbnail : null,
        //      userId: userInfo.uid ? userInfo.uid : null,
        //      isLike: hrt
        //  }
        //  );
        //  console.log(success)
        //  Alert.alert("Item Saved")

       }

    return (
        <View style={styles.container}>
            <TreatHeader
                onPressLeft={() => navigation.goBack()}
                onPressRight={() => navigation.navigate("Settings")}

            />
            <ScrollView>
                <View style={{ marginTop: wp('8%') }}>
                    <AudioCard
                        // backImg={require('../../../../assets/TreatCover.png')}
                        backImg={{ uri: audiodata.thumbnail }}
                        audioCntrl={audioCntrl ? require('../../../../assets/pause1.png') : require('../../../../assets/videoIcon.png')}
                        onPress={() => {
                            chkPlayer()
                            // setPlaying(!isPlaying)
                            // isPlaying ? stop() : start()

                        }}
                    />
                </View>
                <View style={{ marginTop: wp('10%') }}>
                    <Card
                        videoName={audiodata.title ? audiodata.title : null}
                        onPress={() => {
                            updateHeart()
                            heartMethod(audiodata)
                            // FavMeth()
                        }}
                        boxImg={isHeart ? require('../../../../assets/redHeart.png') : require('../../../../assets/heartBox.png')}
                        subTxt={audiodata.sub_title ? audiodata.sub_title : null }
                        description={audiodata.description ? audiodata.description : null}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Audios;

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