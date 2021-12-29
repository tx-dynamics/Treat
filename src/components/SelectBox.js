import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SelectBox = ({ count, leftTitle,myStl ,onPress, ...rest }) => {

    return (

            <TouchableOpacity
             onPress={onPress}
             style={myStl ? styles.SightingContainer1 : styles.SightingContainer}
              >
            <View style={styles.DirectionView}>
            <View style={styles.boxWidth}>
            <View style={myStl ? styles.whiteCircle : styles.pinkCircle}>
            <Apptext style={myStl ? styles.countStl : styles.countStl1}>{count}</Apptext>
            </View>
            </View>
            <Apptext style={myStl ? styles.SightingText : styles.SightingText1 }>
                {leftTitle}
            </Apptext>
            </View>
            </TouchableOpacity>


    );
};

export default SelectBox;

const styles = StyleSheet.create({
  
    SightingContainer:{
        width:wp('90%'),
        marginTop:wp('4%'),
        borderRadius:12,
        alignSelf:'center',
        backgroundColor:DefaultStyles.colors.white,
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
        borderRadius:12,
        alignSelf:'center',
        backgroundColor:DefaultStyles.colors.secondary,
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
        padding:15,
    },
    countStl:{
        color:DefaultStyles.colors.white
    },
    countStl1:{
        color:DefaultStyles.colors.secondary
    },
    boxWidth:{
        width:wp('13%')
    },
    whiteCircle:{
        width:wp('9%'),
        borderWidth:3,
        borderColor:DefaultStyles.colors.white,
        height:wp('9%'),
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    pinkCircle:{
        width:wp('9%'),
        borderWidth:3,
        borderColor:DefaultStyles.colors.secondary,
        height:wp('9%'),
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    SightingText1: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('5%'),
        width: wp('65%'),
        color: DefaultStyles.colors.secondary,
    },
    SightingText: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('5%'),
        width: wp('65%'),
        color: DefaultStyles.colors.white,
    },
    innerTxt:{
        fontFamily:'Lato-Regular',
        fontSize:wp('2%'),
        color:DefaultStyles.colors.white
    }
});
