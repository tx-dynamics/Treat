import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeBox = ({ leftTitle,subTitle, rightTitle, leftImgName,
    yellowBoxTxt,
    rightImgName, 
    heartImg,
    onPress,
    leftOnPress, rightOnPress, ...rest }) => {

    return (
        <View style={styles.MainContainer}>
            <TouchableOpacity onPress={leftOnPress}
             style={styles.SightingContainer}>

                <ImageBackground style={styles.imgContainer}
                    imageStyle={{ borderRadius: 18 }} source={leftImgName}>
                    <TouchableOpacity style={styles.innerBox}>
                        <Apptext style={styles.innerTxt}>{yellowBoxTxt}</Apptext>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.grayBoxDirection}>
                    <Apptext style={styles.SightingText}>{leftTitle}</Apptext>
                    <TouchableOpacity onPress={onPress} >
                        <Image style={{ marginTop: wp('2%') }} source={heartImg} />
                    </TouchableOpacity>
                </View>
                <Apptext style={styles.SightingText1}>{subTitle}</Apptext>

            </TouchableOpacity>

        </View>

    );
};

export default HomeBox;

const styles = StyleSheet.create({
    MainContainer: {
        // flexDirection: 'row',
        // width: wp('40%'),
        marginLeft: wp('6%'),
        marginTop: wp('3%'),
    },
    SightingContainer: {
        width: wp('42%'),
        height: wp('53%'),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 1,
        // marginLeft: '10%',
        borderRadius: 20
        // borderWidth:1,
        // alignItems:'center',
        // justifyContent:'center',
        // borderColor:DefaultStyles.colors.secondary,
    },
    imgContainer: {
        width: wp('42%'),
        height: wp('41%'),
        
    },
    SightingText: {
        fontFamily: "Poppins-Regular",
        marginHorizontal: wp('4%'),
        fontSize: wp('4%'),
        width: wp('28%'),
        marginTop: 2,
        color: DefaultStyles.colors.gray,
    },
    SightingText1: {
        fontFamily: "Poppins-Regular",
        marginHorizontal: wp('4%'),
        fontSize: wp('2.5%'),
        width: wp('50%'),
        marginTop: -5,
        color: DefaultStyles.colors.gray,
    },
    grayBox: {
        width: wp('41%'),
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        alignSelf: 'center',
        height: wp('9.5%'),
        opacity: 0.6,
        // backgroundColor: "lightgray",
        marginTop: wp('31.5%')
    },
    pinkBox: {
        width: wp('12%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('4%'),
        marginLeft: wp('2%'),
        marginTop: -2,
        borderRadius: 10,
        backgroundColor: DefaultStyles.colors.secondary
    },
    grayBoxDirection: {
        flexDirection: 'row',
    },
    innerBox:{
        width:wp('11%'),
        marginTop:10,
        marginHorizontal:wp('2%'),
        height:wp('4%'),
        borderRadius:6,
        backgroundColor:DefaultStyles.colors.yellow,
        alignItems:'center',
        justifyContent:'center'
    },
    innerTxt:{
        fontFamily:'Lato-Regular',
        fontSize:wp('2%'),
        color:DefaultStyles.colors.white
    }
});
