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
import auth from '@react-native-firebase/auth';
import {saveData} from 'src/firebase/utility';



const Signup = ({ navigation }) => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameChk, setNameChk] = useState(false);
    const [mailChk, setMailChk] = useState(false);
    const [passChk, setPassChk] = useState(false);
    const [tickChk, setTckChk] = useState(false);
    const [duplicateEmail ,setDuplicateEmail] = useState(false);
    const [weakPass ,setWeakPass] = useState(false);
    const [badFormat ,setBadFormat] = useState(false);


    const checkValues = () => {
        if (name ==="" || email === "" || password ==="" || toggleCheckBox === false) {
            setNameChk(true)
            setMailChk(true)
            setPassChk(true)
            setTckChk(true);
        }
        else if(name === ""){
            setNameChk(true)
        }
        else if(email === ""){
            setMailChk(true)
        }
        else if(password === ""){
            setPassChk(true)
        }
        else if(toggleCheckBox === false){
            setTckChk(true)
        }
        else{
            console.log("Sign Up Called")
            signUp(name, email, password, toggleCheckBox)
        }
    }
    const signUp = async(
        firstName,
        email,
        password,
        toggleCheckBox,
        ) =>
      {
        let success = true;
        
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async user => {
            let Details = {
              email: email,
              fullName: firstName,
              TermsConditions: toggleCheckBox,
              isBlocked: false,
            };
            console.log(
                email,
                firstName,
                toggleCheckBox,
            )
            await saveData('users', user.user.uid, Details);
            // await saveInitialData('chats', user.user.uid);
            // var user= auth().currentUser;
            // user.sendEmailVerification().then(function(){
            //   Alert.alert("Verification Email is sent.! please verify your email before sign in");
            // }).catch(function(error){
      
            // });
             console.log(user);
            Alert.alert('Account Created!');
             navigation.navigate("Login")
          })
          .catch(function(error) {
            success = false;
            console.log(error.code + ':: ' + error.message);
            if (error.code === 'auth/email-already-in-use'){
                setDuplicateEmail(true)
            }
            else if(error.code === 'auth/invalid-email') {
                setBadFormat(true)
            }
            else if(error.code === 'auth/weak-password'){
                setWeakPass(true)
            }
            else{
                Alert.alert(error.message)
            }
            // Alert.alert(error.message);
          });
        return success;
      }
 
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
                    keyboardType='default'
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {nameChk ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        Please Enter Name</Apptext>
                </View> : null}
                <FormInput
                    labelValue={email}
                    onChangeText={(txt) => setEmail(txt)}
                    placeholderText="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {mailChk ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        Please Enter Valid Email</Apptext>
                </View> : null}
                {duplicateEmail ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                    The email address is already in use by another account.</Apptext>
                </View> : null}
                {badFormat ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                    The email address is badly formatted</Apptext>
                </View> : null}
                
                <FormInput
                    labelValue={password}
                    onChangeText={(txt) => setPassword(txt)}
                    placeholderText="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect={false}
                />
            </View>
            {passChk ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                <Apptext style={{ fontSize: 10, color: "red" }}>
                    Please Enter Strong Password</Apptext>
            </View> : null}
            {weakPass ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                <Apptext style={{ fontSize: 10, color: "red" }}>
                Password should be at least 6 characters</Apptext>
            </View> : null}
            
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
            {tickChk ? <Apptext style={{ fontSize: 10, alignSelf: 'center', color: "red" }}>
                Please Agree to Terms & Conditions</Apptext> : null}
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
        marginTop: 5
    },
});