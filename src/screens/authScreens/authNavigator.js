import React, { useEffect } from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from 'src/screens/authScreens/Splash/Splash'
import Login from 'src/screens/authScreens/Login'
import Signup from 'src/screens/authScreens/Signup'
import Agreement from 'src/screens/authScreens/User/Agreement'
import AskProblem from "src/screens/authScreens/AskProblem/AskProblem";
import AskSubscription from "src/screens/authScreens/AskSubscription";
import VerifyCode from "src/screens/authScreens/VerifyEmail";
import VerifyEmail from "src/screens/authScreens/Verify/VerifyEmail";
import ChangePass from "src/screens/authScreens/ChangePass";
import ConfirmProfile from "src/screens/authScreens/ConfirmProfile";
import AskPaymentOption from "src/screens/authScreens/Payment/AskPaymentOption";
import CardPayment from 'src/screens/authScreens/Payment/CardPayment';
import CreditCard from 'src/screens/authScreens/Payment/CreditCard';
import PaymentDone from "src/screens/authScreens/Payment/PaymentDone";
import { useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const AuthStack = createNativeStackNavigator()


const SplashNavigator = () => {
    return (
        <AuthStack.Navigator
        screenOptions = {{
            headerShown: false
        }}>
            <AuthStack.Screen name ="Splash" component={Splash}/>
            
        </AuthStack.Navigator>
    )
}

const ExtraNavigator = () => {
    return (
        <AuthStack.Navigator
        screenOptions = {{
            headerShown: false
        }}>
            {/* <AuthStack.Screen name ="SplashNavigator" component={SplashNavigator}/> */}
            <AuthStack.Screen name ="Login" component={Login}/>
            <AuthStack.Screen name ="Signup" component={Signup}/>
            <AuthStack.Screen name ="Agreement" component={Agreement}/>
            
            <AuthStack.Screen name ="AskProblem" component={AskProblem}/>
            <AuthStack.Screen name="AskSubscription" component={AskSubscription} />
            
            <AuthStack.Screen name="VerifyCode" component={VerifyCode} />
            
            <AuthStack.Screen name="ChangePass" component={ChangePass} />
            
            <AuthStack.Screen name="ConfirmProfile" component={ConfirmProfile} />
            
            <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
            
            <AuthStack.Screen name="AskPaymentOption" component={AskPaymentOption} />
            
            <AuthStack.Screen name="CardPayment" component={CardPayment} />
            
            <AuthStack.Screen name="CreditCard" component={CreditCard} />
            
            <AuthStack.Screen name="PaymentDone" component={PaymentDone} />
            
        </AuthStack.Navigator>
    )
}

const AuthNavigator = () => {  

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '502514669957-rinqikkdfp8iq9nud8ov5hc7n4vkpptv.apps.googleusercontent.com',
          });
    },[]);

    const splashchk = useSelector((state) => state.auth.SplashStatus)

     if (splashchk) {
         return <SplashNavigator />
     }
     else{
         return <ExtraNavigator />
     }
    
}

export default AuthNavigator