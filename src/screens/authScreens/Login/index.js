import React, { useState } from 'react';
import { View, TouchableOpacity,ToastAndroid, Alert,Image, StyleSheet, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import HumanHeader from 'src/components/HumanHeader';
import FormInput from 'src/components/FormInput';
import FormButton from 'src/components/FormButton';
import { setUser } from 'src/redux/actions/authAction';
import { useDispatch } from "react-redux";
import auth from '@react-native-firebase/auth';
import {getData} from 'src/firebase/utility';


const SignIn = ({ navigation }) => {

    let dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mailChk, setMailChk] = useState(false);
    const [passChk, setPassChk] = useState(false);
    const [duplicateEmail ,setDuplicateEmail] = useState(false);
    const [weakPass ,setWeakPass] = useState(false);
    const [badFormat ,setBadFormat] = useState(false);
    const [noUser, setNoUser] = useState(false);

    const checkValues = () => {
        if (email === "" && password === "") {
            setMailChk(true)
            setPassChk(true)
        }
        else if(email === ""){
            setMailChk(true)
            setPassChk(false)
        }
        else if(password === ""){
            setPassChk(true)
            setMailChk(false)
        }
        else{
            console.log("Sign IN Called")
            signIn(email, password)
        }

    }

    const signIn = async (email, password) => {
       
        let success = true;
        
        console.log("LoginValues", email, password)

        await auth().signInWithEmailAndPassword(email, password)
            .then(async user => {
                setMailChk(false)
                setPassChk(false)
                setWeakPass(false)
                setBadFormat(false)
                setDuplicateEmail(false)
                
                  let userinfo = await getData('users', user.user.uid);
                  var user1= auth().currentUser;
                  console.log(user1.uid)
                  if(user1.uid){
                    dispatch(setUser(true))
                  }
                  else{
                    ToastAndroid.show("Please verify your email before sign in",ToastAndroid.LONG);
                  }

                //    if(user1.emailVerified){
                //   if (userinfo) {
                //     console.log('Token', user.user.uid);
                //     // AsyncStorage.setItem('Token', user.user.uid);

                //   } else {
                //     success = false;
                //     await firebase.auth().signOut();
                //     Alert.alert('Invalid User!');
                //   }
                // }
                // else{
                //   success = false;
                // //   Alert.alert("Please verify your email before sign in");
                //   ToastAndroid.show("Please verify your email before sign in",ToastAndroid.LONG);
                // }
            })
            .catch(function (error) {
                success = false;
                console.log(error.code + ':: ' + error.message);
                if (error.code === 'auth/email-already-in-use'){
                    setDuplicateEmail(true)
                }
                else if(error.code === 'auth/user-not-found') {
                    setNoUser(true)
                    
                }
                else if(error.code === 'auth/invalid-email') {
                    setBadFormat(true)
                    
                }
                else if(error.code === 'auth/wrong-password'){
                    setWeakPass(true)
                    setPassChk(false)
                  
                }
                else{
                    Alert.alert(error.code)
                }
            });
        return success;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.ImgView}>
                <Image source={require('../../../../assets/Logo.png')} />
                <Apptext style={styles.SignInTxt}>Sign In</Apptext>
            </View>
            <View style={{ marginTop: 30 }}>
                <FormInput
                    labelValue={email}
                    onChangeText={(txt) => {
                        setEmail(txt)
                        setMailChk(false)
                    }}
                    placeholderText="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {mailChk ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        Please Must Enter Email Address</Apptext>
                </View> : null}
                {duplicateEmail ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                    The email address is already in use by another account.</Apptext>
                </View> : null}
                {badFormat ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                    The email address is badly formatted</Apptext>
                </View> : null}
                {noUser ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                There is no user record corresponding to this identifier. The user may have been deleted.
                    </Apptext>
                </View> : null}
                <FormInput
                    labelValue={password}
                    onChangeText={(txt) => {
                        setPassword(txt)
                        setPassChk(false)
                    }}
                    placeholderText="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect={false}
                />
                {passChk ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        Please Must Enter Password</Apptext>
                </View> : null}
                {weakPass ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                <Apptext style={{ fontSize: 10, color: "red" }}>
                The password is invalid or the user does not have a password.
                    </Apptext>
            </View> : null}
            </View>
            <View style={styles.lightBoxTxt}>
                <TouchableOpacity onPress={() => navigation.navigate("Agreement")}>
                    <Apptext style={DefaultStyles.lightTxt}> Forgot Password?</Apptext>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: wp('6%') }}>
                
                  <FormButton
                    buttonTitle={"Login"} 
                    onPress={() => {
                        checkValues()
                        // dispatch(setUser(true))
                    }}
                />
            </View>
            <TouchableOpacity
                // onPress={() => navigation.navigate("Home")}
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
        justifyContent: 'center', alignItems: 'center', marginTop: wp('22%')
    },
    SignInTxt: {
        fontFamily: "Poppins-Regular",
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
        fontFamily: "Poppins-Regular",

    },
});