import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import SelectBox from 'src/components/SelectBox';
import HomeWideCard from 'src/components/HomeWideCard';

const Settings = ({ navigation }) => {
    const [isItem, setSelectedItem] = useState([]);

    return (
        <View style={styles.container}>
            <Header
                label={"Settings"}

            />
            <ScrollView>
            <View style={{ marginTop: wp('2%'), marginBottom: wp('5%') }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('withoutBottomTabnavigator', {screen:"ProfileInformation"})}
                    style={styles.SightingContainer}>

                    <View style={styles.DirectionView}>
                        <View style={styles.boxWidth}>
                            <View style={styles.whiteCircle}>
                                <Image source={require('../../../../assets/profile.png')} />
                            </View>
                        </View>
                        <View style={styles.bottomDirectionView}>
                            <Apptext style={styles.SightingText}>
                                {"Profile Information"}
                            </Apptext>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* ******************************* */}
                <TouchableOpacity
                    onPress={() =>  navigation.navigate('withoutBottomTabnavigator', {screen:"VerifyEmail"})}
                    style={styles.SightingContainer}>

                    <View style={styles.DirectionView}>
                        <View style={styles.boxWidth}>
                            <View style={styles.whiteCircle}>
                                <Image source={require('../../../../assets/eye.png')} />
                            </View>
                        </View>
                        <View style={styles.bottomDirectionView}>
                            <Apptext style={styles.SightingText}>
                                {"Password"}
                            </Apptext>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* ******************************* */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('withoutBottomTabnavigator', {screen:'Fvrts'})}
                    style={styles.SightingContainer}>

                    <View style={styles.DirectionView}>
                        <View style={styles.boxWidth}>
                            <View style={styles.whiteCircle}>
                                <Image source={require('../../../../assets/fvrt.png')} />
                            </View>
                        </View>
                        <View style={styles.bottomDirectionView}>
                            <Apptext style={styles.SightingText}>
                                {"Favourites"}
                            </Apptext>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* ******************************* */}
                <TouchableOpacity
                      onPress={() => navigation.navigate('withoutBottomTabnavigator', {screen:'WorkSchedule'})}
                    style={styles.SightingContainer}>

                    <View style={styles.DirectionView}>
                        <View style={styles.boxWidth}>
                            <View style={styles.whiteCircle}>
                                <Image source={require('../../../../assets/shdl.png')} />
                            </View>
                        </View>
                        <View style={styles.bottomDirectionView}>
                            <Apptext style={styles.SightingText}>
                                {"Work Schedule"}
                            </Apptext>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* ******************************* */}
                <TouchableOpacity
                      onPress={() => navigation.navigate('withoutBottomTabnavigator', {screen:'Support'})}
                      style={styles.SightingContainer}>

                    <View style={styles.DirectionView}>
                        <View style={styles.boxWidth}>
                            <View style={styles.whiteCircle}>
                                <Image source={require('../../../../assets/help.png')} />
                            </View>
                        </View>
                        <View style={styles.bottomDirectionView}>
                            <Apptext style={styles.SightingText}>
                                {"Help & Support"}
                            </Apptext>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* ******************************* */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('withoutBottomTabnavigator', {screen:'AskSubscription'})}
                    style={styles.SightingContainer}>

                    <View style={styles.DirectionView}>
                        <View style={styles.boxWidth}>
                            <View style={styles.whiteCircle}>
                                <Image source={require('../../../../assets/billing.png')} />
                            </View>
                        </View>
                        <View style={styles.bottomDirectionView}>
                            <Apptext style={styles.SightingText}>
                                {"Billing & Upgrade"}
                            </Apptext>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* ******************************* */}
                <TouchableOpacity
                onPress={() => navigation.navigate('withoutBottomTabnavigator', {screen:'Login'})}
                    style={styles.SightingContainer}>

                    <View style={styles.DirectionView}>
                        <View style={styles.boxWidth}>
                            <View style={styles.whiteCircle}>
                                <Image source={require('../../../../assets/logout.png')} />
                            </View>
                        </View>
                        <View style={styles.bottomDirectionView}>
                            <Apptext style={styles.SightingText}>
                                {"Log Out"}
                            </Apptext>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* ******************************* */}

            </View>
            </ScrollView>
        </View>
    )
}

export default Settings;

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
    DirectionView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp('6%'),
        paddingLeft:wp('3%')
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
        paddingTop: wp('1%')
    },
    SightingText: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('4%'),
        width: wp('65%'),
        color: DefaultStyles.colors.secondary,
    },
});