import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet,Alert, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import Header from 'src/components/Header';
import Icon from 'react-native-vector-icons/AntDesign';
import RadioButtonRN from 'radio-buttons-react-native';
import PushNotification from "react-native-push-notification";
import { saveData, getListing } from 'src/firebase/utility';
import { useSelector } from 'react-redux';
import moment, { now } from 'moment';


const WorkSchedule = ({ navigation, route }) => {

    const data = [
        {
            label: '8:00 am'
        },
        {
            label: '10:00 am'
        },
        {
            label: '12:00 pm'
        },
        {
            label: '2:00 pm'
        },
        {
            label: '11:40 pm'
        },
        {
            label: '11:26 pm'
        },
        {
            label: '12:11 am'
        },

    ];

    const userInfo = useSelector((state) => state.auth.userdata)
    const [check2, setCheck2] = useState(false);
    const [isShiftTime, setShiftTime] = useState('');
    const [isdata, setData] = useState([]);

    const getList = async() => {
        let rest = await getListing("WorkShifts", "ShiftTimings")
        console.log("rst",rest.data)
       
      }


    const checkNotification = () => { 
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: "My Notification Message", // (required)
            date: new Date(Date.now() + 5 * 1000), // in 60 secs
            allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
          
            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
          });
    }

    const getShift = async() => {
        let rest = await getListing("WorkSchedule", userInfo.uid)
        console.log("rst",rest)
        setShiftTime(rest.ShiftTime)
      }

    useEffect(() => {
        getShift();
    },[]);
    
 

    return (
        <View style={styles.container}>
            <Header
                label={"Work Schedule"}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView >
                <View style={{ flexDirection: 'row', marginLeft: wp('2%'), alignSelf: 'center' }}>
                    <Apptext style={[styles.userTxt, { fontFamily: 'Poppins-SemiBold', marginTop: wp('10%') }]}>What shift do you work?</Apptext>
                    <Apptext style={[styles.userTxt, { fontFamily: 'Poppins-SemiBold', marginTop: wp('10%'), color: "red" }]}> *</Apptext>
                </View>
                <View style={{ marginTop: wp('14%') }}>
                    <RadioButtonRN
                        data={data}
                        boxStyle={{ backgroundColor: "white", marginTop: -15, borderColor: "white" }}
                        circleSize={10}
                        deactiveColor="#f9c26e"
                        textStyle={{
                            fontSize: 14, fontFamily: "Poppins-Regular",
                            color: DefaultStyles.colors.primary
                        }}
                        selectedBtn={(e) => {
                            setCheck2(true)
                            setShiftTime(e.label)
                            console.log(e.label)
                        }}
                        icon={
                            <Icon
                                name="checkcircleo"
                                size={16}
                                color={'#f9c26e'}
                            />
                        }
                    />

                </View>
                {check2 ? (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PickDate", { shift: isShiftTime })}
                        style={styles.buttonContainer}>
                        <Apptext style={styles.buttonText}>{"Submit"}</Apptext>
                    </TouchableOpacity>
                ) : null}

            </ScrollView>

        </View>
    )
}

export default WorkSchedule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    userTxt: {
        fontSize: wp('4.5%'),
        alignSelf: 'center',
        color: DefaultStyles.colors.primary,
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        marginBottom: wp('13%'),
        width: wp('28%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('12%'),
        marginTop: 50,
        borderWidth: 1,
        borderColor: DefaultStyles.colors.secondary,
        borderRadius: 41,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4%'),
        color: DefaultStyles.colors.secondary,
        fontFamily: 'Poppins'
    },
});