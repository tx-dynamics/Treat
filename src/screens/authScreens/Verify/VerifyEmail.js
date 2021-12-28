import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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


const VerifyEmail = ({ navigation }) => {

    const [isVisibe, setVisible] = useState(false) 
    const [countryCode, setCountryCode] = useState('US')

    const onSelect = (country) => {
        setCountryCode(country.cca2)
      }

    return (
        <ScrollView style={styles.container}>
                 
            <Header
                label="Confirm Email"
                leftIcon={"keyboard-backspace"}
                onPressLeft={() => { navigation.goBack() }}
            />
                  <Divider width={1} style={{marginTop:-5}} color="lightgray" />

            <Image style={{ width: 206, height: 201, alignSelf: 'center' }} source={require('../../../../assets/mbl.png')} />

            <View style={styles.TxtView} >

                <Apptext style={[styles.verifyTxt, { marginTop: wp('5%') }]}>
                    Verify Email</Apptext>
            </View>
            <View style={styles.VerifylightBoxTxt}>
                <Apptext style={styles.lightTxt}>
                    Enter your Email, we will send it to you!
                </Apptext>
            </View>
            <View style={{flexDirection:'row',marginTop:wp('7%'), justifyContent:'space-evenly'}}>
                <TouchableOpacity 
                onPress={() => setVisible(true)} style={styles.inputContainer}>
                <CountryPicker
                    {...{
                        countryCode,
                        onSelect,
                    }}
                    visible={isVisibe}
                />   
                <Image style={{marginTop:wp('3%'), marginLeft:wp('2%')}} source={require('../../../../assets/arrowDown.png')} />
                </TouchableOpacity>
            
                 <HumanFormInput
                    labelValue={"example@gmail.com"}
                    onChangeText={(txt) => console.log(txt)}
                    placeholderText="example@gmail.com"
                    myClr={DefaultStyles.colors.white}
                    myRadius={5}
                    myWidth={wp('70%')}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View style={{ marginTop: wp('35%') }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ChangePass")}
                    style={styles.buttonContainer}>
                    <Apptext style={styles.buttonText}>{"Confirm"}</Apptext>
                </TouchableOpacity>
            </View>

        </ScrollView>
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
        flexDirection:'row',
        width:wp('22%'),
        marginLeft:wp('1%'),
        backgroundColor:"white",
        borderRadius:5,
        height: wp('15%'),
        marginTop: wp('3%'),
        borderWidth: 0.4,
        alignSelf: 'center',
        borderColor:"white",
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