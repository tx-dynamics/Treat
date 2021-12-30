import React, { useEffect, useState } from "react"
// import {createStackNavigator} from "@react-navigation/stack"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Keyboard, Image, View, StyleSheet } from 'react-native';
import Home from "src/screens/appScreens/Home";
import TreatTheNurse from "src/screens/appScreens/TreatTheNurse";
import FrameWork from "src/screens/appScreens/FrameWork";
import Podcast from "src/screens/appScreens/Podcast";
import SoundHealing from "src/screens/appScreens/SoundHealing";
import ZoomLive from "src/screens/appScreens/ZoomLive";
import Library from "src/screens/appScreens/Library";
import subTreat from "src/screens/appScreens/TreatTheNurse/subTreat";
import AuthNavigator from 'src/screens/authScreens/authNavigator'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import TreatVideo from "src/screens/appScreens/TreatTheNurse/TreatVideo";
import DefaultStyles from "src/config/Styles";
import {useSelector} from 'react-redux';



const Tab = createBottomTabNavigator();





const StackNavigator = createNativeStackNavigator()

const HomeNavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <StackNavigator.Screen name="Home" component={Home}/>
            <StackNavigator.Screen name="Library" component={Library} />
        </StackNavigator.Navigator>
    )
}
const TreatNavigator = () => {

    return (

        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <StackNavigator.Screen name="TreatTheNurse" component={TreatTheNurse}/>
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
        </StackNavigator.Navigator>
    )
}


const MyTabs = () => {

    return (
        <Tab.Navigator
            tabBarOptions={{
                keyboardHidesTabBar: true,
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: DefaultStyles.colors.textColor,
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
                
            <Tab.Screen name="Home" component={HomeNavigator}
                options={{
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
                    tabBarIcon: ({focused}) => (
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
                    tabBarIcon: ({focused}) => (
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
                 <Tab.Screen name="Podcast" component={Podcast}
                options={{
                    tabBarIcon: ({focused}) => (
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
                 <Tab.Screen name="Zoom Live" component={ZoomLive}
                options={{
                    tabBarIcon: ({focused}) => (
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
                 <Tab.Screen name="Sound Healing" component={SoundHealing}
                options={{
                    tabBarIcon: ({focused}) => (
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
                

            {/* <Tab.Screen name="Discover" component={Discover}
        options={{
            tabBarIcon: () => (
                <Image
                source ={Images.Search}
                style={{height:21, width:20}}
                resizeMode={"contain"}/>
            )
        }} />
        <Tab.Screen name="Share" component={Share} 
        options={{
            tabBarIcon: () => (
                <Image
                source ={Images.Plus}
                style={{height:22, width:24}}
                resizeMode={"contain"}/>
            )
        }} 
        />
        <Tab.Screen name="Action" component={Action}
        options={{
            tabBarIcon: () => (
                <Image
                source ={Images.Action}
                style={{height:15, width:24}}
                resizeMode={"contain"}/>
            )
        }}  />
        <Tab.Screen name="Profile" component={Profile}
        
        options={{
            tabBarIcon: () => (
                <Image
                source ={Images.Profile}
                style={{height:21, width:18}}
                resizeMode={"contain"}/>
            )
        }} /> */}

        </Tab.Navigator>
    );
}


const MainNavigator = () => {

    const user = useSelector((state) => state.auth.user)
    if(user != null){
        return<MyTabs/>
    }
    else{
        return <AuthNavigator/>
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