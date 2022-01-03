import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, TextInput, Alert } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import ToggleSwitch from 'toggle-switch-react-native'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


const ProfileInformation = ({ navigation }) => {
    const [isToggle, setToggle] = useState(true)
    const [isUp, setUp] = useState(false);

    console.log(isUp)

    return (
        <View style={styles.container}>
            <Header
                label={"Profile Info"}

            />
            <ScrollView>
                <View style={{ marginTop: wp('12%'), marginBottom: wp('5%') }}>
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
                        <Collapse style={styles.SightingContainer}>
                            <CollapseHeader>
                                <View style={styles.DirectionView}>
                                    <View style={styles.bottomDirectionView}>
                                        <Apptext style={styles.headerText}>
                                            {"Name"}
                                        </Apptext>
                                    </View>
                                    <Image
                                    source={require('../../../../assets/down.png')} />
                                </View>
                            </CollapseHeader>
                            <CollapseBody style={styles.CollapsedView}>
                                <View style={styles.inputView}> 
                                    <TextInput
                                        placeholder='User Name'
                                        style={styles.input}
                                    />
                                    <Apptext style={styles.editTxt}>Edit</Apptext>
                                </View>
                                <TouchableOpacity style={styles.bodyBtn}>
                                    <Apptext style={styles.btnTxt}>Save</Apptext>
                                </TouchableOpacity>
                            </CollapseBody>
                        </Collapse>
                    </TouchableOpacity>
                    {/* ******************************* */}
                    <TouchableOpacity>
                        <Collapse style={styles.SightingContainer}>
                            <CollapseHeader>
                                <View style={styles.DirectionView}>
                                    <View style={styles.bottomDirectionView}>
                                        <Apptext style={styles.headerText}>
                                            {"Email"}
                                        </Apptext>
                                    </View>
                                    <Image
                                    source={require('../../../../assets/down.png')} />
                                </View>
                            </CollapseHeader>
                            <CollapseBody style={styles.CollapsedView}>
                                <View style={styles.inputView}> 
                                    <TextInput
                                        placeholder='Email'
                                        style={styles.input}
                                    />
                                    <Apptext style={styles.editTxt}>Edit</Apptext>
                                </View>
                                <TouchableOpacity style={styles.bodyBtn}>
                                    <Apptext style={styles.btnTxt}>Save</Apptext>
                                </TouchableOpacity>
                            </CollapseBody>
                        </Collapse>
                    </TouchableOpacity>
                    {/* ******************************* */}
                    <TouchableOpacity>
                        <Collapse style={styles.SightingContainer}>
                            <CollapseHeader>
                                <View style={styles.DirectionView}>
                                    <View style={styles.bottomDirectionView}>
                                        <Apptext style={styles.headerText}>
                                            {"Identification Number"}
                                        </Apptext>
                                    </View>
                                    <Image
                                    source={require('../../../../assets/down.png')} />
                                </View>
                            </CollapseHeader>
                            <CollapseBody style={styles.CollapsedView}>
                                <View style={styles.inputView}> 
                                    <TextInput
                                        placeholder='Identification Number'
                                        style={styles.input}
                                    />
                                    <Apptext style={styles.editTxt}>Edit</Apptext>
                                </View>
                                <TouchableOpacity style={styles.bodyBtn}>
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
        padding: wp('6%'),
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