import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from 'src/screens/authScreens/Splash/Splash'
import Login from 'src/screens/authScreens/Login'
import Signup from 'src/screens/authScreens/Signup'
import Agreement from 'src/screens/authScreens/User/Agreement'
import AskProblem from "src/screens/authScreens/AskProblem/AskProblem";


const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
        screenOptions = {{
            headerShown: false
        }}>
            <AuthStack.Screen name ="Splash" component={Splash}/>
            <AuthStack.Screen name ="Login" component={Login}/>
            <AuthStack.Screen name ="Signup" component={Signup}/>
            <AuthStack.Screen name ="Agreement" component={Agreement}/>
            
            <AuthStack.Screen name ="AskProblem" component={AskProblem}/>
        </AuthStack.Navigator>
    )
}

export default AuthNavigator