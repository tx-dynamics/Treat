import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ToastAndroid, Image, ScrollView, TextInput, Alert } from 'react-native';
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
import { useDispatch } from "react-redux";
import { setUserActive } from 'src/redux/actions/authAction';


const ProfileInformation = ({ navigation }) => {

    
    let dispatch = useDispatch();

    const userInfo = useSelector((state) => state.auth.userdata)
    const userCntrl = useSelector((state) => state.auth.userActive)


    const [isToggle, setToggle] = useState(false)
    const [isUp, setUp] = useState(false);
    const [isUp1, setUp1] = useState(false);
    const [isUp2, setUp2] = useState(false);
    const [islistingData, setListingData] = useState([]);
    const [isName, setName] = useState('');
    const [isEmail, setEmail] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [chkMail, setChkMail] = useState(false);
    const [badFormat, setBadFormat] = useState(false);


    const listingData = async () => {
        let res = await getListing("users", userInfo.uid)
        setUserActive(!userCntrl)
        setName(res.displayName ? res.displayName : null)
        setEmail(res.email ? res.email : null)
        setIdNumber(res.identificationNumber ? res.identificationNumber : null)

    }

    const ValidateEmail = (inputText) => {
        console.log(inputText)
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            setBadFormat(false)
            return true;
        }
        else {
            setBadFormat(true)
            setChkMail(false)
            return false;
        }
    }
    const saveValues = async () => {
        let success = true;
        if (isEmail === "") {
            setChkMail(true)
        }
        else if(badFormat === true){
        ToastAndroid.show("Correct Your Email Before Saving", ToastAndroid.LONG);
        }
        else {
        const Details = ({
            email: isEmail,
            displayName: isName,
            identificationNumber: idNumber
        })
        await saveData('users', userInfo.uid, Details);
    
        ToastAndroid.show("Record Saved", ToastAndroid.LONG);
        navigation.navigate("Settings")

        return success;
    }
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
                                isOn={userCntrl}
                                onColor={'#fce8cb'}
                                thumbOffStyle={{ backgroundColor: "gray" }}
                                thumbOnStyle={{ backgroundColor: DefaultStyles.colors.yellow }}
                                trackOnStyle={{ color: DefaultStyles.colors.yellow }}
                                offColor={DefaultStyles.colors.lightgray}
                                size='small'
                                onToggle={isOn => {
                                    dispatch(setUserActive(!userCntrl))
                                    // setToggle(!isToggle)
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
                                        onChangeText={(e) => {
                                            let value = e
                                            value = value.replace(/[^A-Za-z]/ig, '')
                                            setName(value)
            
                                        }}
                                        // onChangeText={(val) => setName(val)}
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
                                        onChangeText={(val) => {
                                            setEmail(val)
                                            ValidateEmail(val)
                                        }}
                                        style={styles.input}
                                    />
                                    <Apptext style={styles.editTxt}>Edit</Apptext>
                                </View>
                                {chkMail ? <View style={{ marginHorizontal: wp('10%'), marginTop: wp('2%') }}>
                                    <Apptext style={{ fontSize: 10, color: "red" }}>
                                        Please Enter Valid Email</Apptext>
                                </View> : null}
                                {badFormat ? <View style={{ marginHorizontal: wp('10%'), marginTop: wp('1%') }}>
                                    <Apptext style={{ fontSize: 10, color: "red" }}>
                                        The email address is badly formatted</Apptext>
                                </View> : null}
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
                                        maxLength={14}
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