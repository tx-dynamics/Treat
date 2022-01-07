import {connectFirebase, getAllOfCollection ,saveData, getData, saveInitialData} from './utility';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  NetInfo,
  Alert,
  ToastAndroid,
  
} from 'react-native';
// import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/app';
// import firebase from '@react-native-firebase/app';
// import { Toast } from 'native-base';
// import 'firebase/compat/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function signUp(
  firstName,
  lastName,
  bday,
  universityName,
  countryName,
  graduationDate,
  email,
  secondaryEmail,
  password,
  switchValue,
  joinDate,
)

{
  let success = true;
  // console.log(firstName, lastName, bday,
  //   universityName, countryName, graduationDate, email, secondaryEmail, switchValue);
 
  // connectFirebase();
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async user => {
      let Details = {
        id: user.user.uid,
        firstName: firstName,
        lastName: lastName,
        dob: bday,
        universityName: universityName,
        countryName: countryName,
        graduationDate: graduationDate,
        email: email,
        secondaryEmail: secondaryEmail,
        switchValue: switchValue,
        joinDate: joinDate,
      };
      console.log(
        firstName,
        lastName,
        bday,
        universityName,
        countryName,
        graduationDate,
        email,
        secondaryEmail,
        password,
        switchValue,
        joinDate
      )
      //await saveData('users', user.user.uid, Details);
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
    });
  return success;
}

export async function signIn(email, password) {
  let success = true;
  // connectFirebase();
  
  console.log("imam", email, password)
  await auth()
    .signInWithEmailAndPassword(email, password)
     .then(async user => {
       Alert.alert("Logged In")
    //   let userinfo = await getData('users', user.user.uid);
    //   var user1= auth().currentUser;
    //   if(user1.emailVerified){
    //   if (userinfo) {
    //     GlobalConst.UserInfo = userinfo;
    //     AsyncStorage.setItem('Token', user.user.uid);
    //     AsyncStorage.setItem('favPost', userinfo.fav);
    //     if (userinfo.imgurl) {
    //       AsyncStorage.setItem('user_imgurl', userinfo.imgurl);
    //     }
    //   } else {
    //     success = false;
    //     await firebase.auth().signOut();
    //     alert('Invalid User!');
    //   }
    // }
    // else{
    //   success = false;
    //   ToastAndroid.show("Please verify your email before sign in",ToastAndroid.LONG);
    // }
    })
    .catch(function(error) {
      success = false;
      alert(error.code + ': ' + error.message);
    });
  return success;
}

export async function passwordReset(email) {
  return auth().sendPasswordResetEmail(email);
}
