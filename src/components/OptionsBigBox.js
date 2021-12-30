import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const OptionsBigBox = ({ count, leftTitle,myStl ,onPress, ...rest }) => {

    return (

            <TouchableOpacity
             onPress={onPress}
             style={myStl ? styles.SightingContainer1 : styles.SightingContainer}
              >
            <View style={styles.DirectionView}>
            <View style={myStl ? styles.pinkcircleView : styles.circleView}>
                <Apptext style={myStl ? styles.countTxt1 : styles.countTxt}>{count}</Apptext>
                </View>
                <View style={styles.boxWidth}>

                </View>
            {/* <View style={styles.boxWidth}>
            <View style={myStl ? styles.whiteCircle : styles.pinkCircle}>
            <Apptext style={myStl ? styles.countStl : styles.countStl1}>{count}</Apptext>
            </View>
            </View> */}
            <Apptext style={myStl ? styles.SightingText : styles.SightingText1 }>
                {leftTitle}
            </Apptext>
            </View>
            </TouchableOpacity>


    );
};

export default OptionsBigBox;

const styles = StyleSheet.create({
  
    SightingContainer:{
        width:wp('90%'),
        marginTop:wp('4%'),
        borderRadius:20,
        alignSelf:'center',
        backgroundColor:'#fef3e4',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 1,
    },
    SightingContainer1:{
        width:wp('90%'),
        marginTop:wp('4%'),
        borderRadius:20,
        alignSelf:'center',
        backgroundColor:DefaultStyles.colors.lightred,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 1,
    },
    DirectionView:{
        flexDirection:'row',
        alignItems:'center',
        // padding:10,
    },
    
    circleView: {
        backgroundColor:DefaultStyles.colors.yellow ,
        width: wp('11%'),
        height: wp('11%'),
        borderRadius: 50,
        alignItems:'center',
        justifyContent:'center'
    },
    pinkcircleView: {
        backgroundColor:DefaultStyles.colors.secondary ,
        width: wp('11%'),
        height: wp('11%'),
        borderRadius: 50,
        alignItems:'center',
        justifyContent:'center'
    },
    countTxt:{
        color:DefaultStyles.colors.textColor
    },
    countTxt1:{
        color:DefaultStyles.colors.white
    },
    boxWidth:{
        width:wp('8%')
    },
    
    SightingText1: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('5%'),
        width: wp('65%'),
        color: DefaultStyles.colors.textColor,
    },
    SightingText: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('5%'),
        width: wp('65%'),
        color: DefaultStyles.colors.textColor,
    },
    innerTxt:{
        fontFamily:'Lato-Regular',
        fontSize:wp('2%'),
        color:DefaultStyles.colors.white
    }
});
