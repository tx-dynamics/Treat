import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import HumanHeader from 'src/components/HumanHeader';
import FormInput from 'src/components/FormInput';
import FormButton from 'src/components/FormButton';


const SignIn = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.ImgView}>
                <Image source={require('../../../../assets/Logo.png')} />
                <Apptext style={styles.SignInTxt}>Sign In</Apptext>
            </View>
            <View style={{ marginTop: 30 }}>
                <FormInput
                    onChangeText={(txt) => console.log(txt)}
                    placeholderText="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FormInput
                    onChangeText={(txt) => console.log(txt)}
                    placeholderText="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View style={styles.lightBoxTxt}>
                <TouchableOpacity>
                    <Apptext style={DefaultStyles.lightTxt}> Forgot Password?</Apptext>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: wp('9%')}}>

            <FormButton
                buttonTitle="Log In"
                onPress={() => navigation.navigate("Agreement")}
            />
            </View>
            <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.methods}>
                <Apptext style={DefaultStyles.lightTxt}>Other Sign-In Methods</Apptext>
            </TouchableOpacity>
            <View style={styles.socialImgs}>
                <Image source={require('../../../../assets/facebook.png')} />
                <Image source={require('../../../../assets/google.png')} />
            </View>
            <View style={styles.bottomLines} >
                <Apptext style={styles.bottomTxt}> Don't have an account? </Apptext>
                <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                    <Apptext style={[styles.bottomTxt,
                    { color: DefaultStyles.colors.secondary, }]}>SIGNUP</Apptext>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    ImgView: {
        justifyContent: 'center', alignItems: 'center', marginTop: wp('25%')
    },
    SignInTxt: {
        fontFamily:"Poppins-Regular",
        marginTop: wp('10%'),
        fontSize: 24, color: DefaultStyles.colors.primary
    },
    methods: {
        justifyContent: 'center', alignItems: 'center',
        marginTop: wp('10%')
    },
    socialImgs: {
        flexDirection: 'row',
        marginTop: wp('5%'),
        justifyContent: 'space-evenly', marginHorizontal: wp('35%')
    },
    lightBoxTxt: {
        flexDirection: 'row',
        marginHorizontal: hp('3%'),
        marginTop: wp('5%'),
        justifyContent: 'flex-end'
    },
    bottomLines: {
        alignSelf: 'center',
        marginTop: wp('30%'),
        marginBottom: wp('5%'),
        flexDirection: 'row'
    },
    bottomTxt: {
        fontSize: 12,
        fontFamily:"Poppins-Regular",

    },
});