import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import FormInput from 'src/components/FormInput';
import FormButton from 'src/components/FormButton';
import CheckBox from '@react-native-community/checkbox';
import { signUp } from 'src/firebase/newAuth';
import { connectFirebase } from 'src/firebase/newUtility';


const Signup = ({ navigation }) => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [name, setName]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     signUp();
    // }, [])

    const checkValues = () => {
        if(name && email && password && toggleCheckBox === ""){
            Alert.alert("Please Fill Required Fiels")
        }
        else{
            console.log(name, email, password, toggleCheckBox)
            signUp(name, email, password, toggleCheckBox)
       
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.ImgView}>
                <Image source={require('../../../../assets/Logo.png')} />
                <Apptext style={styles.SignInTxt}>Create Account</Apptext>
            </View>
            <View style={{ marginTop: 30 }}>
                <FormInput
                    labelValue={name}
                    onChangeText={(txt) => setName(txt)}
                    placeholderText="Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FormInput
                    labelValue={email}
                    onChangeText={(txt) => setEmail(txt)}
                    placeholderText="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FormInput
                    labelValue={password}
                    onChangeText={(txt) => setPassword(txt)}
                    placeholderText="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect={false}
                />
            </View>
            <View style={styles.lightBoxTxt}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <TouchableOpacity>
                    <Apptext style={styles.lightTxt}> Agree to terms</Apptext>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: wp('5%') }}>

                <FormButton
                    buttonTitle="SIGN UP"
                    onPress={() => checkValues()}
                />
            </View>
            <View style={styles.methods}>
                <Apptext style={DefaultStyles.lightTxt}>Other Sign-Up Methods</Apptext>
            </View>
            <View style={styles.socialImgs}>
                <Image source={require('../../../../assets/facebook.png')} />
                <Image source={require('../../../../assets/google.png')} />
            </View>
            <View style={styles.bottomLines} >
                <Apptext style={styles.bottomTxt}> Already have an account? </Apptext>
                <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                    <Apptext style={[styles.bottomTxt,
                    { color: DefaultStyles.colors.secondary, }]}>SIGN IN</Apptext>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    ImgView: {
        justifyContent: 'center', alignItems: 'center', marginTop: wp('22%')
    },
    SignInTxt: {
        fontFamily: "Poppins-Regular",
        marginTop: wp('10%'),
        fontSize: 24, color: DefaultStyles.colors.primary
    },
    methods: {
        justifyContent: 'center', alignItems: 'center',
        marginTop: wp('4%')
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
        justifyContent: 'center'
    },
    bottomLines: {
        alignSelf: 'center',
        marginTop: wp('20%'),
        marginBottom: wp('5%'),
        flexDirection: 'row'
    },
    bottomTxt: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",

    },
    lightTxt: {
        color: DefaultStyles.colors.primary,
        fontSize: wp('4%'),
        fontFamily: "Poppins-Regular",
        marginTop:5
    },
});