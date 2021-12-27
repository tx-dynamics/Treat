import React,{useState, useEffect} from 'react';
import {StyleSheet,Image, Text, View } from 'react-native';

const Splash = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Login")
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