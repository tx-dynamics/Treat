import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ToastAndroid, Image, ScrollView, TextInput, Alert } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import { useSelector } from 'react-redux';
import { saveData } from 'src/firebase/utility';



const Contact = ({ navigation }) => {

    const userInfo = useSelector((state) => state.auth.userdata)
    // console.log(userInfo.email)
    const [isName, setName] = useState('');
    const [isLastName, setLastName] = useState('');
    const [isEmail, setEmail] = useState(userInfo.email);
    const [isMsg, setMsg] = useState('');
    const [addDtls, setAddDtls] = useState('');
    const [chkMail, setChkMail] = useState(false);
    const [msgChk, setMsgChk] = useState(false);
    const [badFormat, setBadFormat] = useState(false);

    const ValidateEmail = (inputText) => {
        console.log(inputText)
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
             setChkMail(false)
            return true;
        }
        else {
            setChkMail(true)
            return false;
        }
    }

    const saveValues = async () => {
        let success = true;
        if(isMsg === ""){
            setMsgChk(true)
        }
        else{
        const Details = ({
            firstName: isName,
            lastName: isLastName,
            email: isEmail,
            Message: isMsg,
            AdditionalDetails: addDtls
        })

        await saveData('QNA', userInfo.uid, Details)
        .then(data => {
            ToastAndroid.show("Message Sent", ToastAndroid.LONG);
            navigation.navigate('Support')
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

    return (
        <View style={styles.container}>
            <Header
                label={"Contact Us"}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    marginHorizontal: wp('8%')
                }}>
                    <View style={[styles.inputContainer, { width: wp('35%') }]} >
                        <TextInput
                            style={[styles.HumanInput, { width: wp('32%') }]}
                            numberOfLines={1}
                            value={isName}
                            onChangeText={(val) => setName(val)}
                            placeholder={"First Name"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                    <View style={[styles.inputContainer, { width: wp('35%') }]} >
                        <TextInput
                            style={[styles.HumanInput, { width: wp('32%') }]}
                            numberOfLines={1}
                            value={isLastName}
                            onChangeText={(val) => setLastName(val)}
                            placeholder={"Last Name"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                <View style={[styles.inputContainer]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            value={isEmail}
                            editable={false}
                            onChangeText={(val) => {
                                setEmail(val)
                                ValidateEmail(val)
                            }}
                            // onChangeText={(val) => {
                            //     setEmail(val)
                            //     setChkMail(false)
                            // }}
                            placeholder={"Email"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                {chkMail ? <View style={{ marginHorizontal: wp('9%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        Please Enter Valid Email</Apptext>
                </View> : null}
                {badFormat ? <View style={{ marginHorizontal: wp('9%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        The email address is badly formatted</Apptext>
                </View> : null}
                <View style={[styles.inputContainer, { height: wp('35%') }]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            value={isMsg}
                            onChangeText={(val) => {
                                setMsg(val)
                                setMsgChk(false)
                            }}
                            placeholder={"Message"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                {msgChk ? <View style={{ marginHorizontal: wp('9%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        Please Must Enter Message</Apptext>
                </View> : null}
                <View style={[styles.inputContainer, { height: wp('45%') }]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            value={addDtls}
                            onChangeText={(val) => setAddDtls(val)}
                            placeholder={"Additional Details"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        saveValues();

                    }}
                    style={styles.btnView}>
                    <Apptext style={styles.btnTxt}>Send Message</Apptext>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Contact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    HumanInput: {
        width: wp('70%'),
        paddingLeft: wp('4%'),
        paddingTop: wp('2%'),
    },
    inputContainer: {
        width: wp('85%'),
        marginTop: wp('6%'),
        marginBottom: 5,
        alignSelf: 'center',
        paddingLeft: wp('1%'),
        paddingTop: wp('1%'),

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
    btnView: {
        width: wp('90%'),
        height: wp('17%'),
        backgroundColor: DefaultStyles.colors.secondary,
        borderRadius: 8,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp('40%'),
        marginBottom: wp('10%')
    },
    btnTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: DefaultStyles.colors.white
    }

});