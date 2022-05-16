import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import TrackPlayer from 'react-native-track-player';

const AudioCard = ({ count, leftTitle, myStl, backImg, audioCntrl, onPress, ...rest }) => {

    const [isPlaying, setPlaying] = useState(false);

    const start = async () => {
        // Set up the player
        await TrackPlayer.setupPlayer();

        // Add a track to the queue
        await TrackPlayer.add({
            id: 'trackId',
            url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3',
            title: 'Track Title',
            artist: 'Track Artist',
            artwork: require('../../assets/videoIcon.png')
        });

        // Start playing it
        await TrackPlayer.play();
    };
    const stop = () => {
        TrackPlayer.stop();
    };

    return (

       

          
                <ImageBackground
                    source={backImg}
                    imageStyle={{ borderRadius: 12 }}
                    style={{
                        width: wp('100%'),
                       // height:wp('100%'),
                        alignSelf: 'center', 
                        height: hp('40%')
                    }}>
                        <TouchableOpacity
                            onPress={onPress}
                            style={{
                                position: "absolute", justifyContent: "center",
                                alignSelf: "center", alignItems: 'center', bottom: 70
                            }}>
                            <Image source={audioCntrl} 
                            resizeMode={"contain"} style={{ height: 42, width: 42, }} />
                        </TouchableOpacity>
                    {/* {isPlaying ? (
                        <TouchableOpacity
                            onPress={() => 
                             {
                                stop()
                                setPlaying(false)}
                            }
                            style={{
                                position: "absolute", justifyContent: "center",
                                alignSelf: "center", alignItems: 'center', bottom: 70
                            }}>
                            <Image source={require('../../assets/pause1.png')} resizeMode={"contain"} style={{ height: 42, width: 42, }} />
                        </TouchableOpacity>
                    ) : (

                        <TouchableOpacity
                            onPress={() => {
                                start()
                                setPlaying(true)
                            }}
                            style={{
                                position: "absolute", justifyContent: "center",
                                alignSelf: "center", alignItems: 'center', bottom: 70
                            }}>
                            <Image source={require('../../assets/videoIcon.png')} resizeMode={"contain"} style={{ height: 42, width: 42, }} />
                        </TouchableOpacity>

                    )} */}
                </ImageBackground>
           
       


    );
};

export default AudioCard;

const styles = StyleSheet.create({

});
