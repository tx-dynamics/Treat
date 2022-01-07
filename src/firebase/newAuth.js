import {connectFirebase, saveData} from './newUtility';
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
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export async function signUp(name,email,password,switchValue)
{
  let success = true;

  connectFirebase();
  await auth().createUserWithEmailAndPassword(email, password)
  .then(async user => {
      let Details = {
        id: user.user.uid,
        firstName: name,
        email: email,
        password: password,
        isBlocked: switchValue
        
      };
      console.log(
        name,
        email,
        password,
        switchValue,
      )
      await saveData('users', user.user.uid, Details);
    //   await saveInitialData('chats', user.user.uid);
    //   var user= auth().currentUser;
    //   user.sendEmailVerification().then(function(){
    //     Alert.alert("Verification Email is sent.! please verify your email before sign in");
    //   }).catch(function(error){

    //   });
       console.log(user);
      Alert.alert('Account Created!');
      // navigation.navigate("Login")
    })
    .catch(function(error) {
      success = false;
      console.log(error.code + ':: ' + error.message);
      Alert.alert(error.message)
    });
  return success;
}
