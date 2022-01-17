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
import { saveData, saveFvrtsData } from "src/firebase/utility";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setAudioBtn, setAudioID } from 'src/redux/actions/authAction';


const Audios = ({ navigation, route }) => {

    const { audiodata } = route.params;
    let dispatch = useDispatch();

    const userInfo = useSelector((state) => state.auth.userdata)
    const audioCntrl = useSelector((state) => state.auth.audioBtn)
    const audioId = useSelector((state) => state.auth.audioID)
    console.log("backID",audiodata.id)
    console.log("RedxID", audioId)


    const [isHeart, setHeart] = useState(false);
    const updateHeart = () => {
        setHeart(!isHeart)
    }
    const [isPlaying, setPlaying] = useState(false);

    const heartMethod = async() => {

        let hrt = isHeart ? false : true ;
        
        let Details = {
            title: audiodata.title ? audiodata.title : null,
            description: audiodata.description ? audiodata.description : null,
            sub_title: audiodata.sub_title ? audiodata.sub_title : null,
            url : audiodata.url ? audiodata.url : null,
            thumbnail: audiodata.thumbnail ? audiodata.thumbnail : null,
            userId : userInfo.uid ? userInfo.uid : null ,
            isLike : hrt
        };
      
        await saveFvrtsData('FavoriteListing', userInfo.uid, Details);
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
            artist: audiodata.sub_title ? audiodata.sub_title : "Playlist Song" ,
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
        if (audiodata.id === audioId) {
            dispatch(setAudioBtn(true))
        }
        else{
            dispatch(setAudioBtn(false))
            console.log("Not Same")
        }
    },[])
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
                            heartMethod()
                        }}
                        boxImg={isHeart ? require('../../../../assets/redHeart.png') : require('../../../../assets/heartBox.png')}
                        // subTxt={"12 Questions"}
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