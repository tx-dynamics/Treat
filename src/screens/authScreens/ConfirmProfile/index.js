import React, {useEffect} from 'react';
import { View,StyleSheet ,Image } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import { Divider } from 'react-native-elements';


const ConfirmProfile = ({ navigation }) => {
    
    useEffect(() => {
        setTimeout(() => {
                navigation.navigate("Login")
        }, 1000);
    }, []);

    return (
        <View style={[styles.container]}>
            <Header 
            label="Password Changed"
            />

            <View style={[styles.headerLogo, {flex:1,marginTop:-100 }]} >
                <Image source={require('../../../../assets/confirm.png')} />
                <Apptext style={[styles.text2, {marginTop:hp('5%')}]}>      Password Changed</Apptext>
                <Apptext style={[styles.text2, {alignSelf:'center'}]}>              Successfully!</Apptext>
            </View>
        </View>
    )
}

export default ConfirmProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    headerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    text2:{
        width:wp('60%'),
        fontFamily:"Poppins-Medium",
        fontSize:16,
        color:DefaultStyles.colors.secondary

    }
    });