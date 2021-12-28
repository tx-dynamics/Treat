import React , {useEffect,useState} from "react"
// import {createStackNavigator} from "@react-navigation/stack"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Keyboard ,Image} from 'react-native';


const Tab = createBottomTabNavigator();


import AuthNavigator from 'src/screens/authScreens/authNavigator'


const StackNavigator = createNativeStackNavigator()

const HomeNavigator = () => {

    return(
        
        <StackNavigator.Navigator  
        screenOptions = {{
            headerShown: false
        }}>
            {/* <StackNavigator.Screen name="Home" component={Home}/> */}
          

        </StackNavigator.Navigator>
    )
}

const MainNavigator =() => {
    return(
        <AuthNavigator />
    );
    // const user = useSelector((state) => state.auth.user)
    // if(user != null){
    //     return<HomeNavigator/>
    // }
    // else{
    //     return <AuthNavigator/>
    // }
}
 export default MainNavigator