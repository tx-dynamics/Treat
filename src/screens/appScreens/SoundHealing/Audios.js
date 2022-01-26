import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import firestore from '@react-native-firebase/firestore';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import TreatHeader from 'src/components/TreatHeader';
import Card from 'src/components/Card';
import AudioCard from 'src/components/AudioCard';
import TrackPlayer,{Capability,State,usePlaybackState,useProgress,useTrackPlayerEvents }from 'react-native-track-player';
import { saveData, saveFvrtsData,getListing,removeToArray, getFvrtsListing,saveFav, addToArray } from "src/firebase/utility";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setAudioBtn, setLikeID, setAudioID, setItemLikes,setPlayStatus } from 'src/redux/actions/authAction';
import { Alert } from 'react-native';


const Audios = ({ navigation, route }) => {

    const { audiodata } = route.params;
    let dispatch = useDispatch();

    const playbackState = usePlaybackState();

    const userInfo = useSelector((state) => state.auth.userdata)
    const audioCntrl = useSelector((state) => state.auth.audioBtn)
    const audioId = useSelector((state) => state.auth.audioID)
    const FavItems = useSelector((state) => state.auth.ItemLikes)
    const playStatus = useSelector((state) => state.auth.PlayStatus)
    const likeID = useSelector((state) => state.auth.likeId)


    const [isHeart, setHeart] = useState(false);
    const [isRandomNum, setRandomNum] = useState('');
    const [isAzanDon, setAzanDon] = useState([]);
    const [yeData, setmyData] = useState(false);
    const [isRefresh, setReferesh] = useState(false);
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
        console.log("In")
        // let res = await getFvrtsListing("FavoriteListing", userInfo.uid)
        let res = await getListing("FavoriteListing", userInfo.uid)
        console.log("res",res)
        dispatch(setItemLikes(res.media))
        if (FavItems === undefined) {
            console.log("Undefined found")    
        //  dispatch(setItemLikes([]))
        }
        else{
            console.log("FavItems",FavItems)
            FavItems.forEach((val) => 
          { 
             if (val.id === audiodata.id) {
                setHeart(true)
             }  
             else{
                
             }
            }  
            )  
        }
    }

    const myFunction = (item) => {
        console.log("id",[item])
        // setID([item.id])
      }
    const heartMethod = async (item) => {
        
        let str = RandomNumberFunction(item.title, item.id);
        let hrt = isHeart ? false : true;

        // await saveFav("FavoriteListing", userInfo.uid, {
        //     UID: userInfo.uid,
        //   });

        let Details = {
            id: audiodata.id ? audiodata.id : null,
            title: audiodata.title ? audiodata.title : null,
            description: audiodata.description ? audiodata.description : null,
            sub_title: audiodata.sub_title ? audiodata.sub_title : null,
            url: audiodata.url ? audiodata.url : null,
            thumbnail: audiodata.thumbnail ? audiodata.thumbnail : null,
            userId: userInfo.uid ? userInfo.uid : null,
            isLike: hrt
        };
        let result  =  isID.includes(audiodata.id);
        let exist ;
        let indexes ;
        if (typeof FavItems === "undefined") {
            console.log("Undefined")
        }
        else{
            FavItems.map((val, index) => 
            {
                if (audiodata.id === val.id) {
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
    console.log("Details", FavItems)
        
        // console.log("result",result)

        // if(result === true){
        //     console.log("exists")
        //     await firestore().collection("FavoriteListing")
        //     .doc(userInfo.uid)
        //     .update({
        //       media: firestore.FieldValue.arrayRemove(Details),
        //     }).then(async() => {
        //         let res = await getListing("FavoriteListing", userInfo.uid)
        //         console.log("res",res)
        //         dispatch(setItemLikes(res.media))
        //         if (FavItems === undefined) {
        //             console.log("Undefined found")
        //         }
        //         else{
        //             console.log("FavItems",FavItems)
        //             FavItems.forEach(myFunction)  
        //         }
        //         setReferesh(!isRefresh)
        //     })
        //     // await removeToArray("FavoriteListing",userInfo.uid, Details)
            
        // } else{
        //     console.log("Value does not exists!")
        //     await firestore().collection("FavoriteListing")
        //     .doc(userInfo.uid)
        //     .update({
        //       media: firestore.FieldValue.arrayUnion(Details),
        //     }).then(async() => {
        //         let res = await getListing("FavoriteListing", userInfo.uid)
        //         console.log("res",res)
        //         dispatch(setItemLikes(res.media))
        //         if (FavItems === undefined) {
        //             console.log("Undefined found")
        //         }
        //         else{
        //             console.log("FavItems",FavItems)
        //             FavItems.forEach(myFunction)  
        //         }
        //         setReferesh(!isRefresh)
        //     })
        //     // await addToArray("FavoriteListing",userInfo.uid, Details)
            
        //     // await addToArray("FavoriteListing",userInfo.uid, 'media',
        //     // {
        //     //     id: audiodata.id,
        //     //     media: Details
        //     // });
        // }
        // isAzanDon.map((item) => {
        //     if (item.id === audiodata.id) {
        //         console.log("ITEMID", item.id , "DBID =>" , audiodata.id ) 
        //         setmyData(true)
        //         item.isLike = !item.isLike
        //     }
        // })
        // console.log("isAzanDon",isAzanDon)
       
        // await saveFvrtsData('FavoriteListing', userInfo.uid, yeData === true ? isAzanDon : Details, yeData === true ? "update" : "insert")
       
     
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
        // await TrackPlayer.play();
        await TrackPlayer.updateOptions({
            // Media controls capabilities
            capabilities: [
                Capability.Play,
                Capability.Pause,
            ],
        
            // Capabilities that will show up when the notification is in the compact form on Android
            compactCapabilities: [Capability.Play, Capability.Pause],
        
            // Icons for the notification on Android (if you don't like the default ones)
            playIcon: require('../../../../assets/videoIcon.png'),
            pauseIcon: require('../../../../assets/pause1.png'),
        });
    };
    // const stop = () => {
    //     TrackPlayer.stop();
    // };
    const togglePlayback = async(playbackState) => {
        
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null ) {
            if (playbackState === State.Paused) {

                await TrackPlayer.play();
                dispatch(setAudioBtn(true))
            }
            else{
                dispatch(setAudioBtn(false))
                await TrackPlayer.pause();
            }
        }
    }

    const chkPlayer = () => {
        dispatch(setAudioBtn(!audioCntrl))
        dispatch(setPlayStatus(!playStatus))
        audioCntrl ? stop() : start()
        dispatch(setAudioID(audiodata.id))
    }
    useEffect(() => {
        getFvListing();
    },[isRefresh]);

    useEffect(() => {
        start();
        // if (audiodata.id === audioId && playStatus) {
        //     dispatch(setAudioBtn(true))
        // }
        // else {
        //     dispatch(setAudioBtn(false))
        //     console.log("Not Same")
        // }
    }, []);

    const FavMeth = async() => {
        //  let hrt = isHeart ? false : true;
         let hrt = !isHeart;

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
                onPressRight={() => 
                    navigation.navigate("Settings")
                }

            />
            <ScrollView>
                <View style={{ marginTop: wp('8%') }}>
                    <AudioCard
                        // backImg={require('../../../../assets/TreatCover.png')}
                        backImg={{ uri: audiodata.thumbnail }}
                        // audioCntrl={audioCntrl ? require('../../../../assets/pause1.png') : require('../../../../assets/videoIcon.png')}
                        audioCntrl={playbackState === State.Playing ? require('../../../../assets/pause1.png') : require('../../../../assets/videoIcon.png')}
                        onPress={() => {
                            togglePlayback(playbackState)
                            // start();
                            // chkPlayer()
                            // console.log("dura",getDuration())
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