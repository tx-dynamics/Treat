import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultStyles from "../config/Styles";

const HumanFormInput = ({ labelValue, placeholderText,
    myClr = DefaultStyles.colors.HumanInputColor,
    iconType, leftIconType, leftImgName, rightImgName,
    myBrdrClr = "white",myWidth = wp('90%'), myRadius = 15, 
    rightIconType, ...rest }) => {
    return (
        <View style={[styles.inputContainer,
        {
            backgroundColor: myClr,
            borderRadius: myRadius,
            borderBottomColor: myBrdrClr,
            width: myWidth,
        }]}>
            <View style={{ flexDirection: 'row' }}>
                <Feather style={{ marginTop: wp('3%') }} name={leftIconType}
                    size={20} color={DefaultStyles.colors.gray} />
                <View style={{ justifyContent: 'center' }} >
                    <Image source={leftImgName} />
                </View>
                <TextInput
                     value={labelValue}
                    style={styles.HumanInput}
                    numberOfLines={1}
                    placeholder={placeholderText}
                    placeholderTextColor="#c9c9cd"
                    {...rest}
                />
                <FontAwesome style={{ marginTop: wp('3%') }} name={rightIconType} size={20} color={DefaultStyles.colors.gray} />
                <Image style={{ width: 18, height: 18 }} source={rightImgName} />

            </View>
        </View>
    );
};

export default HumanFormInput;

const styles = StyleSheet.create({
    HumanInput: {
        paddingLeft: wp('4%'),
        width: wp('70%'),
    },
    inputContainer: {
        height: wp('15%'),
        marginTop: wp('3%'),
        borderWidth: 0.4,
        alignSelf: 'center',
        borderRightColor: "white",
        borderLeftColor: "white",
        borderTopColor: "white",
        paddingLeft: wp('3%'),
        paddingTop: hp('1%'),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 1,
    },
});
