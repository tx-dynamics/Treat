import React from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import HumanFormInput from 'src/components/HumanFormInput';
import { Divider } from 'react-native-elements';


const ChangePass = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Header
                label="Change Password"
                leftIcon={"keyboard-backspace"}
                onPressLeft={() => { navigation.goBack() }}
            />
            <Divider width={1} style={{marginTop:-5}} color="lightgray" />

            <View style={styles.headerLogo} >
                <Image style={{ width: 270, height: 223 }}
                 source={require('../../../../assets/chngPassPic.png')} />
            </View>
        <View style={{marginTop:wp('3%')}}>
            <HumanFormInput
                onChangeText={(txt) => console.log(txt)}
                placeholderText="Change Password"
                leftIconType={"lock"}
                myClr={DefaultStyles.colors.white}
                secureTextEntry={true}
                myRadius={15}
                autoCapitalize="none"
                autoCorrect={false}
            />
              <HumanFormInput
                onChangeText={(txt) => console.log(txt)}
                placeholderText="New Password"
                leftIconType={"lock"}
                myClr={DefaultStyles.colors.white}
                secureTextEntry={true}
                myRadius={15}
                autoCapitalize="none"
                autoCorrect={false}
            />
              <HumanFormInput
                onChangeText={(txt) => console.log(txt)}
                placeholderText="Re-Enter The New Password"
                leftIconType={"lock"}
                myRadius={15}
                myClr={DefaultStyles.colors.white}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            </View>
            <View style={{marginTop:wp('25%')}}>
            <TouchableOpacity
                    onPress={() => navigation.navigate("ConfirmProfile")}
                    style={styles.buttonContainer}>
                    <Apptext style={styles.buttonText}>{"Confirm"}</Apptext>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ChangePass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    headerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:wp('5%')
      },
      buttonContainer: {
        marginBottom: wp('10%'),
        width: wp('65%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('14%'),
        backgroundColor: DefaultStyles.colors.secondary,
        borderRadius: 8,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4%'),
        color: '#ffffff',
        fontFamily: 'Poppins-Regular'
    },
});