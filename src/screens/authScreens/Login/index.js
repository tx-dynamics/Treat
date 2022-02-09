import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, ToastAndroid, Alert, Image, StyleSheet, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import HumanHeader from 'src/components/HumanHeader';
import FormInput from 'src/components/FormInput';
import FormButton from 'src/components/FormButton';
import { setUser, setUserData } from 'src/redux/actions/authAction';
import { useDispatch } from "react-redux";
import auth from '@react-native-firebase/auth';
import { getData, saveInitialData,saveData } from 'src/firebase/utility';
import { useSelector } from 'react-redux';
// import PushNotification from "react-native-push-notification";
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const SignIn = ({ navigation }) => {

    let dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mailChk, setMailChk] = useState(false);
    const [passChk, setPassChk] = useState(false);
    const [duplicateEmail, setDuplicateEmail] = useState(false);
    const [weakPass, setWeakPass] = useState(false);
    const [badFormat, setBadFormat] = useState(false);
    const [noUser, setNoUser] = useState(false);


    const user = useSelector((state) => state.auth.user)
    console.log("user", user)
    

    // const createChannels = () => {
    //     PushNotification.createChannel(
    //         {
    //             channelId: "1234",
    //             channelName: "TechXpert"
    //         }
    //     )
    // }

    // useEffect(() => {
    //     createChannels();
    // }, [])

    const checkValues = () => {
        if (email === "" && password === "") {
            setMailChk(true)
            setPassChk(true)
        }
        else if (email === "") {
            setMailChk(true)
            setPassChk(false)
        }
        else if (password === "") {
            setPassChk(true)
            setMailChk(false)
        }
        else {
            console.log("Sign IN Called")
            signIn(email, password)
        }

    }

    const signIn = async (email, password) => {

        let success = true;
        setLoading(true)
        console.log("LoginValues", email, password)

        await auth().signInWithEmailAndPassword(email, password)
            .then(async user => {
                setMailChk(false)
                setPassChk(false)
                setWeakPass(false)
                setBadFormat(false)
                setDuplicateEmail(false)
                let userinfo = await getData('users', user.user.uid);
                var user1 = auth().currentUser;
                console.log(user1)
                if (user1.uid) {
                    dispatch(setUserData(user1))
                    dispatch(setUser(true))
                    // try {
                    //     const jsonValue = user1;
                    //     await AsyncStorage.setItem('userProfile', user1)
                    //       console.log(jsonValue)  
                    //         dispatch(setUser(true))
                    //   } catch (e) {
                    //     console.log("Error")
                    //   }
                    // await saveInitialData("FavoriteListing", user1.uid)
                    // setLoading(false)
                    // navigation.replace("Home")
                }
                else {
                    ToastAndroid.show("Please verify your email before sign in", ToastAndroid.LONG);
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
                setLoading(false)
                console.log(error.code + ':: ' + error.message);
                if (error.code === 'auth/email-already-in-use') {
                    setDuplicateEmail(true)
                }
                else if (error.code === 'auth/user-not-found') {
                    setNoUser(true)
                    setWeakPass(false)
                    setBadFormat(false)

                }
                else if (error.code === 'auth/invalid-email') {
                    setBadFormat(true)
                    setWeakPass(false)
                    setNoUser(false)

                }
                else if (error.code === 'auth/wrong-password') {
                    setWeakPass(true)
                    setPassChk(false)
                    setBadFormat(false)
                    setNoUser(false)

                }
                else {
                    Alert.alert(error.code)
                }
            });
        return success;
    }

    const fbSign = async () => {
        let result;
        try {
            LoginManager.setLoginBehavior('NATIVE_ONLY');
            result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        } catch (error) {
            LoginManager.setLoginBehavior('WEB_ONLY');
            result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        }
        if (result.isCancelled) {
            console.log('Signin cancelled.');
        } else {
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                Alert.alert('Something went wrong obtaining the users access token');
            }
            const response = await fetch(`https://graph.facebook.com/v11.0/me?access_token=${data.accessToken}&fields=name,email,id,picture.type(large)`);
            var userInfo = await response.json();
            console.log("fbUserInfo",userInfo)
            return { "Data": { data } }
        }
        (error) => {
            console.warn('Sign in error', error);
            // return { "Error": { error } }
        }
    }

    const onfbButtonPress = async () => {
        let info = await fbSign();
        console.log("fbinfo", info)
        if (typeof info === "undefined") {
            console.log("Action Cancelled")
        }
        else{

        
        const fb = auth.FacebookAuthProvider.credential(info?.Data?.data?.accessToken);
        auth().signInWithCredential(fb)
        .then(async() => {
                var user1 = auth().currentUser;
                console.log(user1)
                if (user1.uid) {
                    let Details =  {
                        email: user1.email,
                        fullName: user1.displayName,
                        uid: user1.uid,
                        profilePhoto: user1.photoURL,
                        isBlocked: user1.emailVerified === true ? true : false ,
                    };
                    console.log(Details)
                    await saveData('users', user1.uid, Details);
                    dispatch(setUserData(user1))
                    dispatch(setUser(true))
                }
                else {
                    console.log("error")
                    Alert.alert("Please verify your email before sign in");
                }
            })
            .catch(function (error) {
                console.log(error.code + ':: ' + error.message);
                // Alert.alert("Error : ", error)
            });
        }

    }

    
    const GoogleSign = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            if (userInfo !== "") {
                // dispatch(setUserData(userInfo))
                // dispatch(setUser(true))
                return userInfo;
            }
        } catch (error) {

            // Alert.alert("Error : ", error)
            console.log(error)
            // return { "Error": { error } }
        }
    }

    const onGoogleButtonPress = async () => {
        let info = await GoogleSign();
        if (typeof info === "undefined") {
            console.log("Action Cancelled")
        }
        else{
            const google = auth.GoogleAuthProvider.credential(info.idToken);
            auth().signInWithCredential(google)
                .then(async() => {
                    var user1 = auth().currentUser;
                    console.log(user1)
                    if (user1.uid) {
                        let Details =  {
                            email: user1.email,
                            fullName: user1.displayName,
                            uid: user1.uid,
                            profilePhoto: user1.photoURL,
                            isBlocked: user1.emailVerified === true ? false : true ,
                        };
                        console.log(Details)
                        await saveData('users', user1.uid, Details);
                        dispatch(setUserData(user1))
                        dispatch(setUser(true))
                    }
                    else {
                        console.log("error")
                        Alert.alert("Please verify your email before sign in");
                    }
                })
                .catch(function (error) {
                    console.log(error.code + ':: ' + error.message);
                    // Alert.alert("Error : ", error)
                });
        }
     

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
                <TouchableOpacity onPress={() => navigation.navigate("VerifyEmail")}>
                    <Apptext style={DefaultStyles.lightTxt}> Forgot Password?</Apptext>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: wp('6%') }}>
                {isLoading ?
                    <ActivityIndicator size={"large"} color={DefaultStyles.colors.primary} />
                    :
                    <FormButton
                        buttonTitle={"Login"}
                        onPress={() => {
                            checkValues()
                            // dispatch(setUser(true))
                        }}
                    />
                }
            </View>
            <TouchableOpacity
                // onPress={() => navigation.navigate("AskProblem")}
                style={styles.methods}>
                <Apptext style={DefaultStyles.lightTxt}>Other Sign-In Methods</Apptext>
            </TouchableOpacity>
            <View style={styles.socialImgs}>
                <TouchableOpacity onPress={() => onfbButtonPress()}>
                    <Image source={require('../../../../assets/facebook.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onGoogleButtonPress()} >
                    <Image source={require('../../../../assets/google.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomLines} >
                <Apptext style={styles.bottomTxt}> Don't have an account? </Apptext>
                <TouchableOpacity onPress={() => { navigation.navigate("AskProblem") }}>
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