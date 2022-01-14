import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { ActivityIndicator } from 'react-native-paper';

const VideoCard = ({ videoUrl,backImg, videoCntrl,isPaused = true,
    count, leftTitle, myStl, onPress, ...rest }) => {
console.log("isPaused", isPaused)
    return (
        <View>
                <View>
                <ImageBackground
                    source={backImg}
                    imageStyle={{ borderRadius: 12 }}
                    style={{
                        width: wp('88%'),
                        alignSelf: 'center', height: wp('57%')
                    }}>
                <Video source={{uri : videoUrl}}
                    repeat={true}
                    paused={isPaused}
                    muted={false}     
                    posterResizeMode="cover"
                    resizeMode="cover"
                    hideShutterView={true}
                    style={{ width: wp('88%'),borderRadius:12,alignSelf:'center', height: wp('57%') }} />
                    
                    <TouchableOpacity 
                    onPress={onPress}
                    style={{ position: "absolute", justifyContent: "center",
                     alignSelf: "center", alignItems: 'center', bottom: 70 }}>
                        <Image source={videoCntrl} 
                        resizeMode={"contain"} style={{ height: 42 , width: 42, }} />
                    </TouchableOpacity>
                    </ImageBackground>
                </View>
        </View>


    );
};

export default VideoCard;

const styles = StyleSheet.create({

});
