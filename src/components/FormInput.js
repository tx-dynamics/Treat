import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultStyles from "../config/Styles";

const FormInput = ({ labelValue, placeholderText,
    iconType, leftIconType, leftImgName, rightImgName,
    rightIconType, ...rest }) => {
    return (
        <View style={[styles.inputContainer]} >
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
                    placeholderTextColor={'#929292' } 
                    {...rest}
                />
                <FontAwesome style={{ marginTop: wp('3%') }} name={rightIconType} size={20} color={DefaultStyles.colors.gray} />
                <Image style={{ width: 18, height: 18 }} source={rightImgName} />

            </View>
        </View>
    );
};

export default FormInput;

const styles = StyleSheet.create({
    HumanInput: {
        //paddingLeft: wp('2%'),
        width: wp('70%'),
    
    },
    inputContainer: {
        width: wp('90%'),
        height: wp('15%'),
        marginTop: wp('3%'),
        alignSelf: 'center',
        paddingLeft: wp('3%'),
        //paddingTop: wp('1%'),
        justifyContent:'center',
        backgroundColor: "white",
        borderRadius: 10,
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
});
