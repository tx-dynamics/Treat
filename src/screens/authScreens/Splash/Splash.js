import React,{useState, useEffect} from 'react';
import {StyleSheet,Image, Text, View } from 'react-native';
import { useDispatch } from "react-redux";
import { setSplash } from 'src/redux/actions/authAction';
import { useSelector } from 'react-redux';
import { setUser, setUserData } from 'src/redux/actions/authAction';


const Splash = ({navigation}) => {

    let dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userdata)
    const user = useSelector((state) => state.auth.user)

    console.log("userss", userInfo)
    useEffect(() => {
        // navigation.replace("Login")
        // if (userInfo !== null) {
        // dispatch(setSplash(true)); 
        // dispatch(setUser(true));   
        // }
        // else{
        // dispatch(setSplash(false));
        // dispatch(setUser(true));   
        // }
        setTimeout(() => {
            navigation.replace("Login")
            dispatch(setSplash(false));
        }, 2000);
    }, []);

    return (
        <View style ={styles.container}>

            <Image
            source={require('../../../../assets/SplashLogo.png')}
            style={styles.splashImage}
            resizeMode={"contain"}/>

        </View>
    )
}

export default Splash


const styles = StyleSheet.create({
    container :{
        backgroundColor : "white",
        flex:1
    },
    splashImage:{
        flex:1,
        width:258,
        height:172,
        alignSelf:"center"
    }

  });