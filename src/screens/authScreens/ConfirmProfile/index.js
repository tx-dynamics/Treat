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
import { useDispatch } from "react-redux";
import { setUser } from 'src/redux/actions/authAction';


const ConfirmProfile = ({ navigation }) => {
   
    let dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
                navigation.replace("Login")
                // dispatch(setUser(false))
        }, 2000);
    }, []);

    return (
        <View style={[styles.container]}>
            <Header 
            label="Password Changed"
            />

            <View style={[styles.headerLogo, {flex:1,marginTop:-100 }]} >
                <Image source={require('../../../../assets/confirm.png')} />
                <Apptext style={[styles.text2, {marginTop:hp('5%')}]}>Email Sent Successfully!</Apptext>
                {/* <Apptext style={[styles.text2, {marginTop:hp('5%')}]}>      Email Sent</Apptext>
                <Apptext style={[styles.text2, {alignSelf:'center'}]}>              Successfully!</Apptext> */}
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
        fontFamily:"Poppins-Medium",
        fontSize:16,
        textAlign:'center',
        color:DefaultStyles.colors.secondary

    }
    });