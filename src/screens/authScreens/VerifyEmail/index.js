import React from 'react';
import { View, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import FormButton from 'src/components/FormButton';
import Header from 'src/components/Header';
import { Divider } from 'react-native-elements';


const VerifyCode = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Header
                label="Verification"
                leftIcon={"keyboard-backspace"}
                onPressLeft={() => { navigation.goBack() }}
            />
            <Divider width={1} style={{marginTop:-5}} color="lightgray" />

            <Image style={{ width: 270, height: 200, marginTop:wp('7%'), alignSelf: 'center' }} source={require('../../../../assets/VerifyCodePic.png')} />

            <View style={styles.TxtView} >

                <Apptext style={[styles.verifyTxt, { marginTop: wp('5%') }]}>
                    Verify Email</Apptext>
            </View>
            <View style={styles.VerifylightBoxTxt}>
                <Apptext style={styles.lightTxt}>
                    Please enter 4-digit code sent to you at
                </Apptext>
                <Apptext style={[styles.lightTxt,
                { fontSize: wp('4%'), marginTop: wp('2%'), color: DefaultStyles.colors.secondary }]}>
                    {`example@gmail.com`}
                </Apptext>
            </View>
            <View style={styles.Verify4BoxView}>
                <View style={styles.VerifyInnerView}>
                    <TextInput
                        placeholder={"5"}
                        keyboardType={"number-pad"}
                        maxLength={1}
                        placeholderTextColor={"#12121D"}
                        style={styles.VerifyInputView}
                    />
                </View>
                <View style={styles.VerifyInnerView}>
                    <TextInput
                        placeholder={"6"}
                        keyboardType={"number-pad"}
                        maxLength={1}
                        placeholderTextColor={"#12121D"}
                        style={styles.VerifyInputView}
                    />
                </View>
                <View style={styles.VerifyInnerView}>
                    <TextInput
                        placeholder={"7"}
                        keyboardType={"number-pad"}
                        maxLength={1}
                        placeholderTextColor={"#12121D"}
                        style={styles.VerifyInputView}
                    />
                </View>
                <View style={styles.VerifyInnerView}>
                    <TextInput
                        placeholder={"8"}
                        keyboardType={"number-pad"}
                        maxLength={1}
                        placeholderTextColor={"#12121D"}
                        style={styles.VerifyInputView}
                    />
                </View>

            </View>

            <View style={{ marginTop: wp('25%') }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ChangePass")}
                    style={styles.buttonContainer}>
                    <Apptext style={styles.buttonText}>{"Confirm"}</Apptext>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default VerifyCode;

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
    Verify4BoxView: {
        width: wp("100%"),
        marginTop: wp('5%'), paddingHorizontal: wp('10%'),
        flexDirection: "row", justifyContent: "space-evenly"
    },
    VerifyInnerView: {
        height: wp('16%'), width: wp('16%'),
        backgroundColor: "white",
        borderRadius: 56 / 2, borderColor: "gray", borderWidth: 1,
        justifyContent: "center", alignSelf: "center",
    },
    VerifyInputView: {
        padding: 0, alignSelf: "center", paddingStart: 5,
        fontSize: wp('6%'),
        fontWeight: "500", lineHeight: wp('3%'), color: "#12121D"
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
    fourBoxes: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        marginHorizontal: hp('5%')
    },
    fourInputs: {
        height: 56,
        width: 56,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: "gray",
        // padding: 22
    },


});