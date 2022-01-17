import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity,ToastAndroid, Image, ScrollView, TextInput, Alert } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import ToggleSwitch from 'toggle-switch-react-native'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { saveData, getListing } from 'src/firebase/utility';
import { useSelector } from 'react-redux';



const ProfileView = ({ navigation }) => {

    const userInfo = useSelector((state) => state.auth.userdata)

    const [isName, setName] = useState('');
    const [isEmail, setEmail] = useState('');
    const [idNumber, setIdNumber] = useState('');


    const listingData = async () => {
        let res = await getListing("users", userInfo.uid)
        setName(res.displayName ? res.displayName : null)
        setEmail(res.email ? res.email : null)
        setIdNumber(res.identificationNumber ? res.identificationNumber : null)

    }

    const saveValues = async () => {
        let success = true;

        const Details = ({
            email: isEmail,
            displayName: isName,
            identificationNumber: idNumber
        })

        await saveData('users', userInfo.uid, Details);
        ToastAndroid.show("Record Saved",ToastAndroid.LONG);
        navigation.navigate("Home")
   
return success;
}

    useEffect(() => {
        listingData();
    }, []);

    return (
        <View style={styles.container}>
            <Header
                label={"Profile"}
                rightImg={require('../../../../assets/tick.png')}
                onPressRight={() => saveValues()}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>
                <TouchableOpacity style={styles.circleImg} >
                    <Image source={require('../../../../assets/boy.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.txtView}>
                    <Apptext style={styles.Txt}>Edit Profile</Apptext>
                </TouchableOpacity>
                <View style={[styles.inputContainer]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            value={isName}
                            onChangeText={(val) => setName(val)}
                            placeholder={"Name"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                <View style={[styles.inputContainer]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            value={isEmail}
                            onChangeText={(val) => setEmail(val)}
                            placeholder={"Email"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                <View style={[styles.inputContainer]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            value={idNumber}
                            onChangeText={(val) => setIdNumber(val)}
                            keyboardType='number-pad'
                            placeholder={"Identification Number"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                {/* <View style={[styles.inputContainer]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            placeholder={"Date of birth"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View> */}

            </ScrollView>
        </View>
    )
}

export default ProfileView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    circleImg: {
        width: 70,
        height: 70,
        marginTop: wp('5%'),
        borderRadius: 50,
        alignSelf: 'center'
    },
    txtView: {
        alignSelf: 'center',
        marginBottom: wp('7%'),
        marginTop: wp('4%')
    },
    Txt: {
        fontFamily: 'Poppins',
        fontSize: wp('3.5%'),
        color: DefaultStyles.colors.secondary
    },
    HumanInput: {
        width: wp('70%'),
        paddingLeft: wp('5%'),
    },
    inputContainer: {
        width: wp('90%'),
        marginTop: wp('4%'),
        marginBottom: 5,
        alignSelf: 'center',
        paddingLeft: wp('1%'),
        paddingTop: wp('1%'),

        backgroundColor: "white",
        borderRadius: 10,
        borderBottomColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 3,
    },


});