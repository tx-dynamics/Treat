import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, Image, ScrollView, TextInput, Alert } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import ToggleSwitch from 'toggle-switch-react-native'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { saveData, getListing, uploadImage } from 'src/firebase/utility';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import ImagePicker from "react-native-image-crop-picker";
import storage from '@react-native-firebase/storage';



const ProfileView = ({ navigation }) => {

    const userInfo = useSelector((state) => state.auth.userdata)

    let reg = '/^[A-Z]+$/i /^[A-Za-z]+$/';
    var nameRegex = /^[a-zA-Z0-9_]{6,20}$/; //remove the quotes

    const [isName, setName] = useState('');
    const [profilePath, setProfileUrl] = useState('');
    const [isEmail, setEmail] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [isMailChk, setMailChk] = useState(false);
    const [isNameChk, setNameChk] = useState(false);
    const [isLoading, setLoading] = useState(false);


    const handleChoosePhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            compressImageQuality: 1,
            cropping: true,
            writeTempFile: true,
            // mediaType: "photo",
            //   cropperCircleOverlay: true,
        }).then(async (image) => {
            console.log(image)
            // setProfileUrl(image.path);
            // let imgPath = awaituploadImage(image.path)
            try {
                const response = await fetch(image.path);
                const blob = await response.blob();
                const ref = storage().ref(`/files/image/${image.path}`);
                // .child(uuid.v4());
                const task = ref.put(blob);
                return new Promise((resolve, reject) => {
                    
                    setLoading(true)
                    task.on(
                        'state_changed',
                        () => { },
                        err => {
                            reject(err);
                        },

                        async () => {
                            const url = await task.snapshot.ref.getDownloadURL();
                            console.log("File available at", url)
                            resolve(url);
                            let Details = {
                                email: isEmail,
                                fullName: isName,
                                TermsConditions: true,
                                isBlocked: false,
                                identificationNumber: idNumber,
                                profilePhoto: url
                            };
                            await saveData('users', userInfo.uid, Details);
                            ToastAndroid.show("Image Uploaded Successfully", ToastAndroid.LONG);
                            setProfileUrl(url ? url : null)
                            listingData();
                            setLoading(false)
                            //   console.log("File available at", url)

                        },
                    );
                });
            } catch (err) {
                console.log('uploadImage error: ' + err.message);
                ToastAndroid.show(err.message, ToastAndroid.LONG);
            }
        });
    }
    let myEmail = "";
    const listingData = async () => {
        let res = await getListing("users", userInfo.uid)
        console.log("res", res)
        setProfileUrl(res.profilePhoto ? res.profilePhoto : null)
        setName(res.fullName ? res.fullName : null)
        setEmail(res.email ? res.email : null)
        myEmail = res.email ? res.email : null;
        setIdNumber(res.identificationNumber ? res.identificationNumber : null)

    }

    const ValidateEmail = (inputText) => {
        console.log(inputText)
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            setMailChk(false)
            return true;
        }
        else {
            setMailChk(true)
            return false;
        }
    }

    const saveValues = async () => {
        let success = true;

        //     this.reauthenticate(this.state.currentPassword)
        //     .then(() => {
        //         var user = auth().currentUser;
        //         user
        //             .updatePassword(password)
        //             .then(() => {
        //                 console.log('Password updated!');
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        // reauthenticate = currentPassword => {
        //     var user = auth().currentUser;
        //     var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
        //     return user.reauthenticateWithCredential(cred);
        // };

        const Details = ({
            email: isEmail,
            fullName: isName,
            identificationNumber: idNumber
        })

        if (isMailChk === true) {
            ToastAndroid.show("Please Enter Valid Email Address Before Saving", ToastAndroid.LONG);
        }
        else {
            await saveData('users', userInfo.uid, Details);
            ToastAndroid.show("Record Saved", ToastAndroid.LONG);
            navigation.navigate("Home")
        }
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
                <TouchableOpacity
                    onPress={handleChoosePhoto}
                >
                    {profilePath ? <Image style={styles.circleImg}
                        source={{ uri: profilePath }} />
                        :
                        <Image style={styles.circleImg} source={require('../../../../assets/empty-image.png')} />
                    }
                </TouchableOpacity>
                {isLoading ? (

                    <ActivityIndicator size={"small"} color={DefaultStyles.colors.primary} />
                ) : null}
                <TouchableOpacity style={styles.txtView}>
                    <Apptext style={styles.Txt}>Edit Profile</Apptext>
                </TouchableOpacity>
                <View style={[styles.inputContainer]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            value={isName}
                            onChangeText={(e) => {
                                let value = e
                                value = value.replace(/[^A-Za-z]/ig, '')
                                setName(value)

                            }}

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
                            keyboardType='email-address'
                            value={isEmail}
                            editable={false}
                            onChangeText={(val) => {
                                setEmail(val)
                                ValidateEmail(val)
                            }}
                            placeholder={"Email"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                {isMailChk ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        The email address is badly formatted</Apptext>
                </View> : null}
                <View style={[styles.inputContainer]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            value={idNumber}
                            maxLength={14}
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
        borderWidth: 1,
        borderColor: "lightgray",
        // backgroundColor:"lightgray",
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