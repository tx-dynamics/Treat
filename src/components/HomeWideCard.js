import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const HomeWideCard = ({ backImg,setSubTxt,headerTitle, rightHeaderImg, isLabel = true, leftOnPress,
    isSubTxt = false, rightOnPress, ...rest }) => {

    return (
        <TouchableOpacity>
            <ImageBackground style={styles.MainContainer}
                imageStyle={{ borderRadius: 10 }} source={backImg}>
                {isLabel ? (
                    <TouchableOpacity style={styles.innerBox}>
                        <Apptext style={styles.innerTxt}>Latest</Apptext>
                    </TouchableOpacity>) : null}
                {isSubTxt ? (
                    <Apptext style={styles.subTxt}>{setSubTxt}</Apptext>
                ) : null}

            </ImageBackground>
        </TouchableOpacity>

    );
};

export default HomeWideCard;

const styles = StyleSheet.create({
    MainContainer: {
        width: wp('90%'),
        alignSelf: 'center',
        height: wp('45%'),
        borderRadius: 10
    },
    innerBox: {
        width: wp('13%'),
        marginTop: 10,
        marginHorizontal: 17,
        height: wp('4.5%'),
        borderRadius: 6,
        backgroundColor: DefaultStyles.colors.yellow,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerTxt: {
        fontFamily: 'Lato-Regular',
        fontSize: wp('2.5%'),
        color: DefaultStyles.colors.white
    },
    subTxt:{
        color:DefaultStyles.colors.white,
        fontSize:wp('2.5%'),
        marginTop:wp('32%'),
        fontFamily:"Poppins-Regular",
        alignSelf:'center'
    }

});
