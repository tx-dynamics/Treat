import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const HomeHeader = ({headrImg,headerTitle,rightHeaderImg, leftOnPress, rightOnPress, ...rest }) => {

    return (
        <View style={styles.MainContainer}>
            <View style={{flexDirection:'row',}}>
           <TouchableOpacity>
            <ImageBackground style={styles.imgBox} source={headrImg}>
            </ImageBackground>
           </TouchableOpacity>
           <Apptext style={styles.headerTxt}>{headerTitle}</Apptext>
           <Image style={{marginTop:wp('5%')}} source={rightHeaderImg} />
           </View>
        </View>

    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    MainContainer: {
        width:wp('100%'),
        height:wp('18%'),
        borderBottomRightRadius: 1,
        borderBottomLeftRadius: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 3,
  
    },
    imgBox:{
        width:wp('13%'),
        marginTop:wp('2%'),
        marginHorizontal:wp('5%'),
        height:wp('13%') ,
        borderRadius:50
    },
    headerTxt:{
        marginTop:wp('5%'),
        fontFamily:"Poppins-Regular",
        fontSize:16,
        marginHorizontal:-8,
        color:DefaultStyles.colors.secondary,
        width:wp('72%'),
    }
});
