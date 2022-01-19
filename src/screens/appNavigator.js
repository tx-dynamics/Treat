import React, { useEffect, useState } from "react"
// import {createStackNavigator} from "@react-navigation/stack"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Keyboard, Text, Image, View, StyleSheet } from 'react-native';
import Home from "src/screens/appScreens/Home";
import TreatTheNurse from "src/screens/appScreens/TreatTheNurse";
import FrameWork from "src/screens/appScreens/FrameWork";
import Podcast from "src/screens/appScreens/Podcast";
import PodCastVideo from "src/screens/appScreens/Podcast/PodCastVideo";
import SoundHealing from "src/screens/appScreens/SoundHealing";
import Audios from "src/screens/appScreens/SoundHealing/Audios";
import ZoomLive from "src/screens/appScreens/ZoomLive";
import Library from "src/screens/appScreens/Library";
import subTreat from "src/screens/appScreens/TreatTheNurse/subTreat";
import ProfileInformation from "src/screens/appScreens/Profile/ProfileInformation";
import AuthNavigator from 'src/screens/authScreens/authNavigator'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import TreatVideo from "src/screens/appScreens/TreatTheNurse/TreatVideo";
import DefaultStyles from "src/config/Styles";
import { useSelector } from 'react-redux';
import JoinMeeting from 'src/screens/appScreens/ZoomLive/JoinMeeting';
import Apptext from 'src/components/Apptext';
import Settings from "src/screens/appScreens/Settings";
import Support from "src/screens/appScreens/Help&Support/Support";
import Contact from "src/screens/appScreens/Help&Support/Contact";
import Fvrts from "src/screens/appScreens/Fvrts/Fvrts";
import WorkSchedule from "src/screens/appScreens/Work/WorkSchedule";
import VerifyEmail from "src/screens/authScreens/Verify/VerifyEmail";
import AskSubscription from "src/screens/authScreens/AskSubscription";
import Login from 'src/screens/authScreens/Login'
import ProfileView from "src/screens/appScreens/Profile/ProfileView";
import PickDate from "src/screens/appScreens/Work/PickDate";
import ChangePass from 'src/screens/authScreens/ChangePass';
import VerifyCode from "src/screens/authScreens/VerifyEmail";
import ConfirmProfile from 'src/screens/authScreens/ConfirmProfile';
import AskPaymentOption from "src/screens/authScreens/Payment/AskPaymentOption";
import CardPayment from "src/screens/authScreens/Payment/CardPayment";
import PaymentDone from "src/screens/authScreens/Payment/PaymentDone";
// import Login from 'src/screens/authScreens/Login';

const Tab = createBottomTabNavigator();

const StackNavigator = createNativeStackNavigator()

const GeneralNavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
                
            <StackNavigator.Screen name="HomeNavigator" component={HomeNavigator} />
            <StackNavigator.Screen name="Settings" component={Settings} />
           

        </StackNavigator.Navigator>
    )
}

const HomeNavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <StackNavigator.Screen name="Home" component={Home} />
            <StackNavigator.Screen name="Library" component={Library} />

            {/* <StackNavigator.Screen name="ProfileInformation" component={ProfileInformation} />
            <StackNavigator.Screen name="Support" component={Support} />
            <StackNavigator.Screen name="Contact" component={Contact} />
            <StackNavigator.Screen name="Fvrts" component={Fvrts} />
            <StackNavigator.Screen name="WorkSchedule" component={WorkSchedule} /> */}

        </StackNavigator.Navigator>
    )
}
const TreatNavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <StackNavigator.Screen name="TreatTheNurse" component={TreatTheNurse} />
            <StackNavigator.Screen name="subTreat" component={subTreat} />
            <StackNavigator.Screen name="TreatVideo" component={TreatVideo} />
        </StackNavigator.Navigator>
    )
}
const FrameWorkNavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>

            <StackNavigator.Screen name="FrameWork" component={FrameWork} />
            <StackNavigator.Screen name="Library" component={Library} />
            <StackNavigator.Screen name="TreatVideo" component={TreatVideo} />
        </StackNavigator.Navigator>
    )
}
const PodCastNavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>

            <StackNavigator.Screen name="Podcast" component={Podcast} />
            <StackNavigator.Screen name="PodCastVideo" component={PodCastVideo} />
            <StackNavigator.Screen name="TreatVideo" component={TreatVideo} />
        </StackNavigator.Navigator>
    )
}
const ZoomNavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>

            <StackNavigator.Screen name="ZoomLive" component={ZoomLive} />
            <StackNavigator.Screen name="JoinMeeting" component={JoinMeeting} />
            <StackNavigator.Screen name="PodCastVideo" component={PodCastVideo} />
            <StackNavigator.Screen name="TreatVideo" component={TreatVideo} />
        </StackNavigator.Navigator>
    )
}
const SoundHealingNavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>

            <StackNavigator.Screen name="SoundHealing" component={SoundHealing} />
            <StackNavigator.Screen name="Audios" component={Audios} />
            {/* <StackNavigator.Screen name="Settings" component={Settings} /> */}
        </StackNavigator.Navigator>
    )
}

const withoutBottomTabnavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <StackNavigator.Screen name="ProfileInformation" component={ProfileInformation} />
            <StackNavigator.Screen name="Support" component={Support} />
            <StackNavigator.Screen name="Contact" component={Contact} />
            <StackNavigator.Screen name="Fvrts" component={Fvrts} />
            <StackNavigator.Screen name="WorkSchedule" component={WorkSchedule} />
            <StackNavigator.Screen name="VerifyEmail" component={VerifyEmail} />
            <StackNavigator.Screen name="AskSubscription" component={AskSubscription} />
            <StackNavigator.Screen name="Login" component={Login} />
            <StackNavigator.Screen name="ProfileView" component={ProfileView} />
            <StackNavigator.Screen name="PickDate" component={PickDate} />
            <StackNavigator.Screen name="ChangePass" component={ChangePass} />
            <StackNavigator.Screen name="VerifyCode" component={VerifyCode} />
            <StackNavigator.Screen name="ConfirmProfile" component={ConfirmProfile} />
            <StackNavigator.Screen name="AskPaymentOption" component={AskPaymentOption } />
            <StackNavigator.Screen name="CardPayment" component={CardPayment } />
            <StackNavigator.Screen name="PaymentDone" component={PaymentDone } />

        </StackNavigator.Navigator>

    )
}


const AppNavigator = () => {

    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen name="Root" options={{ headerShown: false }}>
                {props => <MyTabs {...props} />}
            </StackNavigator.Screen>
            <StackNavigator.Screen name="withoutBottomTabnavigator" component={withoutBottomTabnavigator}
                options={{ headerShown: false }} />
        </StackNavigator.Navigator>

    )
}

const MyTabs = () => {

    return (
        <Tab.Navigator
            // tabBarOptions={{
            //     keyboardHidesTabBar: true,
            // }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: DefaultStyles.colors.textColor,
                keyboardHidesTabBar: true,
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: DefaultStyles.colors.white,
                    border: 0,
                    height: wp('18%'),
                },
                tabBarLabelStyle: {
                    fontSize: wp('2%'),
                    fontFamily: "Poppins-Regular",
                    color: DefaultStyles.colors.primary
                }

            }}>

            <Tab.Screen name="GeneralNavigator" component={GeneralNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Apptext style={{ fontSize: wp('2%'), fontFamily: "Poppins-Regular", color: focused ? DefaultStyles.colors.secondary : DefaultStyles.colors.primary }}>Home</Apptext>
                    ),
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <View style={styles.tabBox1}>
                                <Image
                                    source={require('../../assets/home.png')}
                                    resizeMode={"contain"} />
                            </View>
                            :
                            
                            <View style={styles.tabBox}>
                                <Image
                                    source={require('../../assets/home.png')}
                                    resizeMode={"contain"} />
                            </View>
                    )
                }} />
            <Tab.Screen name="Treat The Nurse" component={TreatNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Apptext style={{
                            fontSize: wp('2%'), fontFamily: "Poppins-Regular",
                            color: focused ? DefaultStyles.colors.secondary : DefaultStyles.colors.primary
                        }}>Treat The Nurse</Apptext>
                    ),
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <View style={styles.tabBox1}>
                                <Image
                                    source={require('../../assets/tab2.png')}
                                    resizeMode={"contain"} />
                            </View>
                            :
                            <View style={styles.tabBox}>
                                <Image
                                    source={require('../../assets/tab2.png')}
                                    resizeMode={"contain"} />
                            </View>

                    )
                }} />
            <Tab.Screen name="FrameWorkNavigator" component={FrameWorkNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Apptext style={{
                            fontSize: wp('2%'), fontFamily: "Poppins-Regular",
                            color: focused ? DefaultStyles.colors.secondary : DefaultStyles.colors.primary
                        }}>FrameWork</Apptext>
                    ),
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <View style={styles.tabBox1}>
                                <Image
                                    source={require('../../assets/tab3.png')}
                                    resizeMode={"contain"} />
                            </View>
                            :
                            <View style={styles.tabBox}>
                                <Image
                                    source={require('../../assets/tab3.png')}
                                    resizeMode={"contain"} />
                            </View>
                    )
                }} />
            <Tab.Screen name="PodCastNavigator" component={PodCastNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Apptext style={{
                            fontSize: wp('2%'), fontFamily: "Poppins-Regular",
                            color: focused ? DefaultStyles.colors.secondary : DefaultStyles.colors.primary
                        }}>Podcast</Apptext>
                    ),
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <View style={styles.tabBox1}>
                                <Image
                                    source={require('../../assets/tab4.png')}
                                    resizeMode={"contain"} />
                            </View>
                            :
                            <View style={styles.tabBox}>
                                <Image
                                    source={require('../../assets/tab4.png')}
                                    resizeMode={"contain"} />
                            </View>
                    )
                }} />
            <Tab.Screen name="ZoomNavigator" component={ZoomNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Apptext style={{
                            fontSize: wp('2%'), fontFamily: "Poppins-Regular",
                            color: focused ? DefaultStyles.colors.secondary : DefaultStyles.colors.primary
                        }}>Zoom Live</Apptext>
                    ),
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <View style={styles.tabBox1}>
                                <Image
                                    source={require('../../assets/tab5.png')}
                                    resizeMode={"contain"} />
                            </View>
                            :
                            <View style={styles.tabBox}>
                                <Image
                                    source={require('../../assets/tab5.png')}
                                    resizeMode={"contain"} />
                            </View>
                    )
                }} />
            <Tab.Screen name="SoundHealingNavigator" component={SoundHealingNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Apptext style={{
                            fontSize: wp('2%'), fontFamily: "Poppins-Regular",
                            color: focused ? DefaultStyles.colors.secondary : DefaultStyles.colors.primary
                        }}>Sound Healing</Apptext>
                    ),
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <View style={styles.tabBox1}>
                                <Image
                                    source={require('../../assets/tab6.png')}
                                    resizeMode={"contain"} />
                            </View>
                            :
                            <View style={styles.tabBox}>
                                <Image
                                    source={require('../../assets/tab6.png')}
                                    resizeMode={"contain"} />
                            </View>
                    )
                }} />

        </Tab.Navigator>
    );
}


const MainNavigator = () => {

    const user = useSelector((state) => state.auth.user)
    if (user != false) {
        return <AppNavigator />
    }
    else {
        return <AuthNavigator />
    }
}
export default MainNavigator

const styles = StyleSheet.create({
    tabBox: {
        height: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('10%'),
        borderRadius: 20,
        backgroundColor: DefaultStyles.colors.primary
    },
    tabBox1: {
        height: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('10%'),
        borderRadius: 20,
        backgroundColor: DefaultStyles.colors.secondary
    }


});