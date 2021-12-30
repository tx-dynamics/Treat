import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const OptionsBox = ({count, label, leftOnPress, rightOnPress, ...rest }) => {

    return (
        <View style={styles.MainContainer}>
            <View style={styles.directionView}>
                <View style={styles.circleView}>
                <Apptext style={styles.countTxt}>{count}</Apptext>
                </View>
                <Apptext style={styles.txt} >{label}</Apptext>
            </View>

        </View>

    );
};

export default OptionsBox;

const styles = StyleSheet.create({
    MainContainer: {
        // width: wp('90%'),
        marginHorizontal:wp('5%'),
        height: wp('20%'),
        
        
    },
    directionView: {
        // width:wp('30%') ,
        height: wp('9%'),
        flexDirection: 'row',
        backgroundColor: DefaultStyles.colors.lightred,
        borderRadius: 20,
        alignItems:'center',
        
    },
    circleView: {
        backgroundColor:DefaultStyles.colors.secondary ,
        width: wp('9%'),
        height: wp('9%'),
        borderRadius: 20,
        alignItems:'center',
        justifyContent:'center'
    },
    countTxt:{
        color:DefaultStyles.colors.white
    },
    txt: {
        fontFamily: "Lato-Regular",
        fontSize: wp('3.5%'),
        padding:wp('2%'),
        paddingLeft:wp('1%'),
        color: DefaultStyles.colors.secondary
    }
});
