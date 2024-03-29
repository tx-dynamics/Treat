import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const HomeHeader = ({headrImg,headerTitle,rightHeaderImg,onPress, leftOnPress, rightOnPress, ...rest }) => {

    return (
        <View style={styles.MainContainer}>
            <View style={{flexDirection:'row',}}>
           <TouchableOpacity onPress={leftOnPress}>
            <ImageBackground imageStyle={{  marginTop:wp('3.2%'),borderRadius:0,width:56,height:35,alignSelf:'center' }}  style={styles.imgBox} source={headrImg}>
            </ImageBackground>
           </TouchableOpacity>
           <Apptext style={styles.headerTxt}>{headerTitle}</Apptext>
           <TouchableOpacity
           onPress={onPress}
           >
           <Image style={{marginTop:wp('5%')}} source={rightHeaderImg} />
           </TouchableOpacity>
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
        borderBottomColor:'lightgray',
        borderBottomWidth:0.5,
        elevation: 3,
  
    },
    imgBox:{
        width:wp('13%'),
        marginTop:wp('2%'),
        marginHorizontal:wp('5%'),
        height:wp('13%') ,
        borderRadius:50,
     
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
