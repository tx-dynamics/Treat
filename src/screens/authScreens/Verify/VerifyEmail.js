import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TextInput, ToastAndroid, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import HumanFormInput from 'src/components/HumanFormInput';
import Header from 'src/components/Header';
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from 'src/screens/authScreens/Verify/types';
import { Divider } from 'react-native-elements';
import { passwordReset } from 'src/firebase/utility';
import { useSelector } from 'react-redux';


const VerifyEmail = ({ navigation }) => {


    const userInfo = useSelector((state) => state.auth.userdata);

    const user = useSelector((state) => state.auth.user)

    const [isVisibe, setVisible] = useState(false)
    const [countryCode, setCountryCode] = useState('US');
    const [chkMail, setChkMail] = useState(false);
    const [badFormat, setBadFormat] = useState(false);
    const [isEmail, setEmail] = useState('');

    const chkEmailStatus = () => {
        if (user === true) {
            setEmail(userInfo.email)
        }
        else {

        }
    }


    const onSelect = (country) => {
        setCountryCode(country.cca2)
    }

    const ValidateEmail = (inputText) => {
        console.log(inputText)
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            setBadFormat(false)
            return true;
        }
        else {
            setBadFormat(true)
            setChkMail(false)
            return false;
        }
    }
    const saveValues = async () => {
        let success = true;
        if (isEmail === "" || null) {
            setChkMail(true)
        }
        else {

            await passwordReset(isEmail)
                .then(data => {
                    ToastAndroid.show("Reset Link Sent On Your Email ", ToastAndroid.LONG);
                    {user === true ? 
                        navigation.navigate('Settings')
                        : 
                        navigation.navigate('ConfirmProfile')}
                })
                .catch(function (error) {
                    success = false;
                    console.log(error.code + ':: ' + error.message);
                    if (error.code === 'auth/invalid-email') {
                        setBadFormat(true)
                    }
                    else {
                        Alert.alert(error.message)
                    }
                });
            return success;
        }
    }

    useEffect(() => {
        chkEmailStatus()
    }, []);

    return (
        <View style={styles.container}>
            <Header
                label="Confirm Email"
                leftIcon={"keyboard-backspace"}
                onPressLeft={() => { navigation.goBack() }}
            />

            <ScrollView>
                {/* <Divider width={1} style={{marginTop:-5}} color="lightgray" /> */}

                <Image style={{
                    width: 206, height: 201,
                    marginTop: wp('9%'),
                    alignSelf: 'center'
                }} source={require('../../../../assets/mbl.png')} />

                <View style={styles.TxtView} >

                    <Apptext style={[styles.verifyTxt, { marginTop: wp('5%') }]}>
                        Verify Email</Apptext>
                </View>
                <View style={styles.VerifylightBoxTxt}>
                    <Apptext style={styles.lightTxt}>
                        Enter your Email, we will send it to you!
                    </Apptext>
                </View>
                <View style={{ flexDirection: 'row', marginTop: wp('4%'), marginHorizontal: wp('4%'), justifyContent: 'space-evenly' }}>
                    {/* <TouchableOpacity
                        onPress={() => setVisible(true)} style={styles.inputContainer}>
                        <CountryPicker
                            {...{
                                countryCode,
                                onSelect,
                            }}
                            visible={isVisibe}
                        />
                        <Image style={{ marginTop: wp('3%'), marginLeft: wp('2%') }} source={require('../../../../assets/arrowDown.png')} />
                    </TouchableOpacity> */}

                    <HumanFormInput
                        labelValue={isEmail}
                        editable={user === true ? false : true }
                        onChangeText={(val) => {
                            setEmail(val)
                            ValidateEmail(val)
                        }}
                        // onChangeText={(val) => {
                        //     setEmail(val)
                        //     setChkMail(false)
                        // }}
                        placeholderText="example@gmail.com"
                        myClr={DefaultStyles.colors.white}
                        myRadius={5}
                        myWidth={wp('90%')}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                {chkMail ? <View style={{ marginHorizontal: wp('7%'), marginTop: wp('2%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        Please Enter Valid Email</Apptext>
                </View> : null}
                {badFormat ? <View style={{ marginHorizontal: wp('7%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        The email address is badly formatted</Apptext>
                </View> : null}
                <View style={{ marginTop: wp('35%') }}>
                    <TouchableOpacity
                        onPress={() => {
                            saveValues()
                        }}
                        style={styles.buttonContainer}>
                        <Apptext style={styles.buttonText}>{"Confirm"}</Apptext>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

export default VerifyEmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    TxtView: {
        alignSelf: 'center'
    },
    verifyTxt: {
        fontFamily: "Poppins-Bold",
        fontSize: 18
    },
    buttonContainer: {
        marginBottom: wp('10%'),
        width: wp('65%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('14%'),
        backgroundColor: DefaultStyles.colors.secondary,
        borderRadius: 8,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4%'),
        color: '#ffffff',
        fontFamily: 'Poppins-Regular'
    },
    inputContainer: {
        flexDirection: 'row',
        width: wp('22%'),
        marginLeft: wp('1%'),
        backgroundColor: "white",
        borderRadius: 5,
        height: wp('15%'),
        marginTop: wp('3%'),
        borderWidth: 0.4,
        alignSelf: 'center',
        borderColor: "white",
        borderRightColor: "white",
        borderLeftColor: "white",
        borderTopColor: "white",
        paddingLeft: wp('3%'),
        paddingTop: hp('2%'),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 1,
    },
    VerifylightBoxTxt: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: -6,
    },
    lightTxt: {
        fontSize: 12,
        marginTop: wp('2%'),
        color: DefaultStyles.colors.gray
    },


});