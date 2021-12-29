import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TreatBox = ({ leftTitle, rightTitle, leftImgName,
    yellowBoxTxt,
    rightImgName, leftOnPress, rightOnPress, ...rest }) => {

    return (
        <View style={styles.MainContainer}>
            <TouchableOpacity onPress={leftOnPress} style={styles.SightingContainer} {...rest}>

                <ImageBackground style={styles.imgContainer}
                    imageStyle={{ borderRadius: 18 }} source={leftImgName}>
                     <View style={styles.grayBoxDirection}>
                    <Apptext style={styles.SightingText}>{leftTitle}</Apptext>
                    </View>
                <Apptext style={styles.SightingText1}>{leftTitle}</Apptext>
                </ImageBackground>

            </TouchableOpacity>

        </View>

    );
};

export default TreatBox;

const styles = StyleSheet.create({
    MainContainer: {
        flexDirection: 'row',
        marginLeft: wp('6%'),
        marginTop: wp('4%'),
    },
    SightingContainer: {
        width: wp('42%'),
        height: wp('47%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        borderRadius: 20
    },
    imgContainer: {
        width: wp('42%'),
        height: wp('47%'),
    },
    SightingText: {
        fontFamily: "Poppins-Regular",
        marginHorizontal: wp('2%'),
        fontSize: wp('3%'),
        width: wp('28%'),
        marginTop: wp('38%') ,
        color: DefaultStyles.colors.white,
    },
    SightingText1: {
        fontFamily: "Poppins-Regular",
        marginHorizontal: wp('2%'),
        fontSize: wp('2%'),
        width: wp('50%'),
        marginTop: -5,
        color: DefaultStyles.colors.white,
    },
    grayBox: {
        width: wp('41%'),
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        alignSelf: 'center',
        height: wp('9.5%'),
        opacity: 0.6,
        backgroundColor: "lightgray",
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
        marginHorizontal:17,
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
