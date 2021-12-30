import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';

const VideoCard = ({ count, leftTitle, myStl, onPress, ...rest }) => {

    return (
        <View>
            {/* <VideoPlayer
                video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                videoWidth={1600}
                videoHeight={900}
                thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
            /> */}
        </View>


    );
};

export default VideoCard;

const styles = StyleSheet.create({

});
