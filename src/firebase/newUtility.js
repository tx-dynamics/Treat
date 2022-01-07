import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { Alert } from 'react-native';
// import firestore from '@react-native-firebase/app';

export async function connectFirebase() {
  //   // Initialize Firebase

  var config = {
      apiKey: "AIzaSyBsTgQRb3FoiGMRCjngyFzeUneeM8pDCiE",
    
      authDomain: "treat-96076.firebaseapp.com",

      databaseURL: 'https://treat-96076.firebaseio.com',
    
      projectId: "treat-96076",
    
      storageBucket: "treat-96076.appspot.com",
    
      messagingSenderId: "502514669957",
    
      appId: "1:502514669957:web:8c2f22c53dbb76ba758cec",
    
      measurementId: "G-GT64F3HGFK"
  };
  if (!firebase.apps.length) {
    console.log('ok ok ');
    firebase.initializeApp(config);
  } else {
    firebase.app(); //if already intilized, use that one
    console.log("Already Initilized")
  }

}
export async function saveData(collection, doc, jsonObject) {
    firestore().collection(collection).doc(doc).set(jsonObject, {merge: true})
    .then(function() {
      async () => {
        console.log('Record successfully written!');
        return true;
      };
    })
    .catch(function(error) {
      console.log("received", collection, doc,jsonObject)
      console.error('Error Adding Record: ', error);

    });
}
export async function signIn(email, password) {
  let success = true;
  connectFirebase();
  
  console.log("chk Sign In Values", email, password)
  await auth().signInWithEmailAndPassword(email, password)
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
      console.log(error.code + ': ' + error.message);
      Alert.alert(error.message)
    });
  return success;
}