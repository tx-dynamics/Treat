import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList,ToastAndroid, Image, ScrollView, TextInput, Alert } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import ToggleSwitch from 'toggle-switch-react-native'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { useSelector } from 'react-redux';
import { saveData, getListing } from 'src/firebase/utility';


const ProfileInformation = ({ navigation }) => {

    const userInfo = useSelector((state) => state.auth.userdata)
    console.log(userInfo);

    const [isToggle, setToggle] = useState(true)
    const [isUp, setUp] = useState(false);
    const [isUp1, setUp1] = useState(false);
    const [isUp2, setUp2] = useState(false);
    const [islistingData, setListingData] = useState([]); 
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
              
                // console.log(
                //     email,
                //     fullName,
                //     identificationNumber,
                // )
                await saveData('users', userInfo.uid, Details);
                // await saveInitialData('chats', user.user.uid);
                // var user= auth().currentUser;
                // user.sendEmailVerification().then(function(){
                //   Alert.alert("Verification Email is sent.! please verify your email before sign in");
                // }).catch(function(error){

                // });
                ToastAndroid.show("Record Saved",ToastAndroid.LONG);
                navigation.navigate("Settings")
           
        return success;
    }

    useEffect(() => {
        listingData();
    }, []);

    return (
        <View style={styles.container}>
            <Header
                label="Profile Info"
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={{ marginTop: wp('6%'), marginBottom: wp('5%') }}>
                    <TouchableOpacity
                        style={styles.SightingContainer}>
                        <View style={styles.DirectionView}>
                            <View style={styles.bottomDirectionView}>
                                <Apptext style={styles.SightingText}>
                                    {"Profile Status (Active)"}
                                </Apptext>
                            </View>
                            <ToggleSwitch
                                isOn={isToggle}
                                onColor={'#fce8cb'}
                                thumbOffStyle={{ backgroundColor: "gray" }}
                                thumbOnStyle={{ backgroundColor: DefaultStyles.colors.yellow }}
                                trackOnStyle={{ color: DefaultStyles.colors.yellow }}
                                offColor={DefaultStyles.colors.lightgray}
                                size='small'
                                onToggle={isOn => {
                                    setToggle(!isToggle)
                                    console.log("changed to : ", isOn)
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* ******************************* */}
                   
                    <TouchableOpacity>
                        <Collapse 
                        isExpanded={isUp} 
                        onToggle={() => setUp(!isUp)}
                        style={styles.SightingContainer}>
                            <CollapseHeader>
                                <View style={styles.DirectionView}>
                                    <View style={styles.bottomDirectionView}>
                                        <Apptext style={styles.headerText}>
                                            {"Name"}
                                        </Apptext>
                                    </View>
                                    {
                                        isUp ?
                                            <Image source={require('../../../../assets/up.png')} />
                                            :
                                            <Image source={require('../../../../assets/down.png')} />

                                    }
                                </View>
                            </CollapseHeader>
                            <CollapseBody style={styles.CollapsedView}>
                                <View style={styles.inputView}>
                                    <TextInput
                                        value={isName}
                                        placeholder='User Name'
                                        onChangeText={(val) => setName(val)}
                                        style={styles.input}
                                    />
                                    <Apptext style={styles.editTxt}>Edit</Apptext>
                                </View>
                                <TouchableOpacity
                                onPress={() => saveValues()}
                                style={styles.bodyBtn}>
                                    <Apptext style={styles.btnTxt}>Save</Apptext>
                                </TouchableOpacity>
                            </CollapseBody>
                        </Collapse>
                    </TouchableOpacity>
                   
                    {/* ******************************* */}
                    <TouchableOpacity>
                        <Collapse
                         isExpanded={isUp1} 
                        onToggle={() => setUp1(!isUp1)}
                         style={styles.SightingContainer}>
                            <CollapseHeader>
                                <View style={styles.DirectionView}>
                                    <View style={styles.bottomDirectionView}>
                                        <Apptext style={styles.headerText}>
                                            {"Email"}
                                        </Apptext>
                                    </View>
                                    {
                                        isUp1 ?
                                            <Image source={require('../../../../assets/up.png')} />
                                            :
                                            <Image source={require('../../../../assets/down.png')} />

                                    }
                                </View>
                            </CollapseHeader>
                            <CollapseBody style={styles.CollapsedView}>
                                <View style={styles.inputView}>
                                    <TextInput
                                        value={isEmail}
                                        placeholder='Email'
                                        onChangeText={(val) => setEmail(val)}
                                        style={styles.input}
                                    />
                                    <Apptext style={styles.editTxt}>Edit</Apptext>
                                </View>
                                <TouchableOpacity
                                 onPress={() => saveValues()}
                                 style={styles.bodyBtn}>
                                    <Apptext style={styles.btnTxt}>Save</Apptext>
                                </TouchableOpacity>
                            </CollapseBody>
                        </Collapse>
                    </TouchableOpacity>
                    {/* ******************************* */}
                    <TouchableOpacity>
                        <Collapse 
                        isExpanded={isUp2} 
                        onToggle={() => setUp2(!isUp2)}
                        style={styles.SightingContainer}>
                            <CollapseHeader>
                                <View style={styles.DirectionView}>
                                    <View style={styles.bottomDirectionView}>
                                        <Apptext style={styles.headerText}>
                                            {"Identification Number"}
                                        </Apptext>
                                    </View>
                                    {
                                        isUp2 ?
                                            <Image source={require('../../../../assets/up.png')} />
                                            :
                                            <Image source={require('../../../../assets/down.png')} />

                                    }
                                </View>
                            </CollapseHeader>
                            <CollapseBody style={styles.CollapsedView}>
                                <View style={styles.inputView}>
                                    <TextInput
                                        value={idNumber}
                                        placeholder='Identification Number'
                                        keyboardType='number-pad'
                                        onChangeText={(val) => setIdNumber(val)}
                                        style={styles.input}
                                    />
                                    <Apptext style={styles.editTxt}>Edit</Apptext>
                                </View>
                                <TouchableOpacity 
                                 onPress={() => saveValues()}
                                style={styles.bodyBtn}>
                                    <Apptext style={styles.btnTxt}>Save</Apptext>
                                </TouchableOpacity>
                            </CollapseBody>
                        </Collapse>
                    </TouchableOpacity>
                    {/* ******************************* */}
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileInformation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    SightingContainer: {
        width: wp('90%'),
        marginTop: wp('6%'),
        marginBottom: 1,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: DefaultStyles.colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 1,
    },
    CollapsedView: {
        width: wp('90%'),
        marginBottom: wp('5%'),
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: DefaultStyles.colors.white,

    },
    inputView: {
        width: wp('70%'),
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: DefaultStyles.colors.lightred,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    input: {
        paddingLeft: wp('4%'),
        width: wp('58%')
    },
    editTxt: {
        fontSize: wp('3.5%'),
        fontFamily: "Poppins-Regular",
        color: DefaultStyles.colors.secondary,
        marginTop: wp('1%')
    },
    bodyBtn: {
        width: wp('20%'),
        borderRadius: 17,
        alignSelf: 'center',
        marginTop: wp('5%'),
        alignItems: 'center',
        padding: wp('2%'),
        backgroundColor: DefaultStyles.colors.secondary
    },
    btnTxt: {
        color: DefaultStyles.colors.white,
        fontFamily: "Poppins-Regular",
        fontSize: wp('3%'),

    },
    DirectionView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp('4%'),
        paddingLeft: wp('3%')
    },
    countStl: {
        color: DefaultStyles.colors.secondary,
        padding: 1
    },
    boxWidth: {
        width: wp('11%'),
    },
    whiteCircle: {
        width: wp('8%'),
        borderWidth: 2,
        borderColor: DefaultStyles.colors.white,
        height: wp('8%'),
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomDirectionView: {
        paddingTop: wp('1%'),
        marginHorizontal: wp('3%')
    },
    SightingText: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('4%'),
        width: wp('65%'),
        color: DefaultStyles.colors.primary,
    },
    headerText: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('4%'),
        width: wp('70%'),
        color: DefaultStyles.colors.primary,
    },
});