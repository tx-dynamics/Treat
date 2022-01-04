import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultStyles from "../config/Styles";
import Apptext from 'src/components/Apptext';

const FvrtComp = ({ labelValue, placeholderText,
    iconType, leftIconType, leftImgName, rightImgName,
    rightonPress,
    rightIconType, ...rest }) => {
    return (
        <View style={[styles.inputContainer]} >
            <View style={{ flexDirection: 'row' }}>
               <Image style={styles.imgStl}
                source={leftImgName}
               />
               <View style={styles.txtView}>
                <Apptext style={styles.txtVal}>{labelValue}</Apptext>
                </View>
                <TouchableOpacity onPress={rightonPress}>
                <Image
                style={styles.hrtStl}
                source={rightImgName}  />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FvrtComp;

const styles = StyleSheet.create({
    HumanInput: {
        paddingLeft: wp('2%'),
        width: wp('70%'),
    
    },
    imgStl:{
        width:57,
        height:61,
        borderRadius:12,
    },
    txtView:{
        justifyContent:'center',
        marginHorizontal:wp('3%'),
        width:wp('55%'),
    },
    txtVal:{
        fontFamily:'Poppins-Medium',
        fontSize:wp('4%')
    },
    inputContainer: {
        width: wp('90%'),
        marginTop: wp('3%'),
        marginBottom:wp('5%'),
        alignSelf: 'center',
        padding:wp('6%'),
        paddingLeft:wp('4%'),
        backgroundColor: "white",
        borderRadius: 15,
        borderBottomColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 3,
    },
    hrtStl:{
        width:22,
        height:20
    }
});
