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



const Contact = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <Header
                label={"Contact Us"}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={{flexDirection:'row',justifyContent:'space-between',
                 marginHorizontal:wp('8%') }}>
                <View style={[styles.inputContainer, {width:wp('35%')}]} >
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            placeholder={"First Name"}
                            placeholderTextColor={'#929292'}

                        />
                </View>
                <View style={[styles.inputContainer, {width:wp('35%')}]} >
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            placeholder={"Last Name"}
                            placeholderTextColor={'#929292'}

                        />
                </View>
                </View>
                <View style={[styles.inputContainer]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            placeholder={"Email"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                <View style={[styles.inputContainer, { height: wp('35%') }]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            placeholder={"Message"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                <View style={[styles.inputContainer, { height: wp('45%') }]} >

                    <View>
                        <TextInput
                            style={styles.HumanInput}
                            numberOfLines={1}
                            placeholder={"Additional Details"}
                            placeholderTextColor={'#929292'}

                        />
                    </View>
                </View>
                <TouchableOpacity
                onPress={() => navigation.navigate('Support')}
                style={styles.btnView}>
                <Apptext style={styles.btnTxt}>Send Message</Apptext>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Contact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    HumanInput: {
        width: wp('70%'),
        paddingLeft: wp('5%'),
    },
    inputContainer: {
        width: wp('85%'),
        marginTop: wp('6%'),
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
    btnView: {
        width: wp('90%'),
        height: wp('17%'),
        backgroundColor: DefaultStyles.colors.secondary,
        borderRadius: 8,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp('40%'),
        marginBottom: wp('10%')
    },
    btnTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: DefaultStyles.colors.white
    }

});