import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

const VideoCard = ({ count, leftTitle, myStl, onPress, ...rest }) => {

    return (
        <View>
          
                <View>
                <Video source={{uri : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}   // Can be a URL or a local file.
                    repeat={true}
                    muted={true}               // Callback when video cannot be loaded
                    posterResizeMode="stretch"
                    resizeMode="stretch"
                    hideShutterView={true}
                    style={{ width: wp('88%'),borderRadius:12,alignSelf:'center', height: wp('57%') }} />
                    
                    <View style={{ position: "absolute", justifyContent: "center", alignSelf: "center", alignItems: 'center', bottom: 70 }}>
                        <Image source={require('../../assets/videoIcon.png')} resizeMode={"contain"} style={{ height: 42 , width: 42, }} />
                    </View>
                </View>
        </View>


    );
};

export default VideoCard;

const styles = StyleSheet.create({

});
