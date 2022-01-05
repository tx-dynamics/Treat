import React, { useState, useRef, useEffect } from 'react'
import {
    View, Text, StyleSheet, Image, Modal,
    StatusBar, SafeAreaView, ScrollView, Dimensions, Pressable, FlatList,
    TextInput, Share, Keyboard, ImageBackground, TouchableOpacity
} from 'react-native'

import InputField from 'src/components/InputField';
import DefaultStyles from "src/config/Styles";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ResponsiveText from 'src/components/Apptext';
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from 'src/components/Header';
import { Picker } from '@react-native-picker/picker';
import { CountryCodes } from './CountryCodes';
import Apptext from 'src/components/Apptext';

const CardPayment = ({ props, navigation }) => {
    const [cardnum, setcardnum] = useState('5168 1234 4567 7890');
    const [nam, setnam] = useState('Thomas Anderson');
    const [isDay, setDay] = useState();
    const [isYear, setYear] = useState();
    const [exp, setexp] = useState('');
    const [cvc, setcvc] = useState('');
    const [promo, setpromo] = useState('');
    const [show, setshow] = useState(false);
    const [isPayment, setPayment] = useState(false);

    const [isVisibe, setVisible] = useState(false);
    const [countryCode, setCountryCode] = useState('672');
    const [contPicker, setContPicker] = useState(false);
    console.log(countryCode)

    const checkValue = () => {
        setPayment(true)
        setTimeout(() => {
            setPayment(false)
    }, 2000);

    }
    const renderItemView = (item) => {

        return (
            <View>
                <TouchableOpacity onPress={() => {
                    setContPicker(false)
                    setCountryCode(item.dial_code)
                }} style={{
                    height: 40,
                    marginTop: 10,
                    paddingLeft: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'

                }}>
                    <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{item.name} </Text>
                    <Text style={{ fontSize: 18, marginHorizontal: 10 }}> {item.dial_code} </Text>
                </TouchableOpacity>

            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header
                label="Payment Method"
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>
                {!show ?
                    <>
                        <View style={{ paddingHorizontal: wp(4) }}>
                            <ImageBackground
                                style={{
                                    width: wp('83%'), height: 163, alignSelf: 'center',
                                    borderColor: cardnum !== '' && nam !== '' && exp !== '' && cvc !== '' ? '#00F462' : 'white',
                                    borderRadius: 14, marginTop: 24
                                }}
                                source={require('../../../../assets/cardBack.png')} resizeMode='cover'  >
                                <View 
                                style={{marginTop:wp('5%'),
                                marginHorizontal:wp('5%'),
                                flexDirection:'row',
                                justifyContent:'space-between'
                                }}>
                                <Image source={require('../../../../assets/gold.png')} />
                                <Apptext style={{color:"white", fontWeight:"700"}}>VISA</Apptext>
                                </View>
                                <View 
                                style={{marginTop:23,marginHorizontal:wp('5%'),
                                 width:wp('70%'),}}>
                                <Apptext style={{color:"white",fontSize:14,fontFamily:'Poppins'}}>{cardnum}</Apptext>
                                </View>
                                <View 
                                style={{marginTop:wp('12%'),
                                marginHorizontal:wp('5%'),
                                flexDirection:'row',
                                justifyContent:'space-between'
                                }}>
                                <Apptext style={{color:"white",fontFamily:'Poppins', fontSize:10 }}>{nam}</Apptext>
                                <Apptext style={{color:"white",fontFamily:'Poppins', fontSize:10 }}>{isDay + " / "+ isYear}</Apptext>
                                </View>
                            </ImageBackground>
                            <ResponsiveText style={{
                                fontFamily: 'Poppins',
                                color: "gray", textAlign: 'center', marginTop: 16,
                                width: wp('80%'), alignSelf: 'center'
                            }} >By adding debit / creadit card you agree to the
                                Terms & Condition</ResponsiveText>
                            <ResponsiveText
                                style={{
                                    fontFamily: 'Poppins', fontSize: 12,
                                    color: "gray", marginHorizontal: wp('5%'), marginTop: wp('5%')
                                }} fontFamily={'Poppins-Medium'}

                            >{"Name"}</ResponsiveText>

                            <InputField
                                // keyboardType="email-address"
                                color='#424D59'
                                fontFamily={'Poppins-Medium'}
                                backgroundColor='transparent'
                                borderBottomWidth={nam !== '' ? 1 : 0}
                                borderColor={'#25D482'}
                                borderRadius={15}

                                value={nam}
                                onChangeText={(EmailAdd) => setnam(EmailAdd)}
                            />
                            <ResponsiveText
                                style={{
                                    fontFamily: 'Poppins', fontSize: 12,
                                    color: "gray", marginHorizontal: wp('5%'), marginTop: wp('3%')
                                }} fontFamily={'Poppins-Medium'}

                            >{"Card Number"}</ResponsiveText>
                            <InputField
                                rightIcon={cardnum !== '' ? true : false}
                                borderBottomWidth={cardnum !== '' ? 1 : 0}
                                borderColor={'#25D482'}
                                maxLength={19}
                                keyboardType='fe'
                                rightIconName={require('../../../../assets/tick.png')}
                                keyboardType=''
                                placeholder={"0000   0000   0000    0000"}
                                placeholderTextColor='#929DA9'
                                color='#424D59'
                                fontFamily={'Poppins-Medium'}
                                value={cardnum}
                                backgroundColor='transparent'
                                borderRadius={16}
                                onChangeText={(EmailAdd) => setcardnum(EmailAdd
                                    .replace(/\s?/g, '')
                                    .replace(/(\d{4})/g, '$1 ')
                                    .trim())}
                            />
                            <View style={{ width: '38%' }}>
                                <ResponsiveText
                                    style={{
                                        fontFamily: 'Poppins', fontSize: 12,
                                        color: "gray", marginHorizontal: wp('5%'),
                                        marginTop: wp('3%')
                                    }} fontFamily={'Poppins-Medium'}
                                >{"Expiration Date"}</ResponsiveText>
                            </View>
                            <View style={styles.ownDiv}>
                                <TouchableOpacity style={{ width: wp('25%'), height: 48 }} >
                                    <Picker
                                        // ref={pickerRef}
                                        selectedValue={isDay}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setDay(itemValue)
                                        }>
                                        <Picker.Item label="1" value="1" />
                                        <Picker.Item label="2" value="2" />
                                        <Picker.Item label="3" value="3" />
                                        <Picker.Item label="4" value="4" />
                                        <Picker.Item label="5" value="5" />
                                        <Picker.Item label="6" value="6" />
                                        <Picker.Item label="7" value="7" />
                                        <Picker.Item label="8" value="8" />
                                        <Picker.Item label="9" value="9" />
                                        <Picker.Item label="10" value="10" />
                                        <Picker.Item label="11" value="11" />
                                        <Picker.Item label="12" value="12" />
                                    </Picker>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    marginHorizontal: wp('5%'),
                                    width: wp('33%'), height: 48
                                }} >
                                    <Picker
                                        selectedValue={isYear}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setYear(itemValue)
                                        }>
                                        <Picker.Item label="2021" value="21" />
                                        <Picker.Item label="2022" value="22" />

                                        <Picker.Item label="2023" value="23" />

                                        <Picker.Item label="2024" value="24" />

                                        <Picker.Item label="2025" value="25" />

                                        <Picker.Item label="2026" value="26" />

                                    </Picker>
                                </TouchableOpacity>
                            </View>
                            <ResponsiveText
                                style={{
                                    fontFamily: 'Poppins', fontSize: 12,
                                    color: "gray", marginHorizontal: wp('5%'),

                                }} fontFamily={'Poppins-Medium'}
                            >{"Code"}</ResponsiveText>
                            <TouchableOpacity
                                onPress={() => setContPicker(true)}
                                style={[styles.ownDiv]}>
                                <Modal visible={contPicker}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setContPicker(false)
                                        }} style={styles.boxes1}>
                                        <Text style={[styles.boxesTxt, { color: "white" }]}>Dismiss</Text>
                                    </TouchableOpacity>

                                    <View style={{ flex: 1, marginTop: 20 }}>
                                        <FlatList
                                            keyExtractor={({ code }) => JSON.stringify(code)}
                                            data={CountryCodes}
                                            renderItem={({ item, index }) => renderItemView(item, index)}
                                        />
                                    </View>
                                </Modal>

                                <Apptext style={{ padding: 15 }}>{countryCode}</Apptext>
                                <Image style={{ marginLeft: wp('2%') }} source={require('../../../../assets/codeDownArrow.png')} />

                            </TouchableOpacity>
                            <Modal 
                             visible={isPayment}
                             
                             >
                                <View style={{ flex: 1,
                                       shadowColor: "#000",
                                       shadowOffset: {
                                           width: 0,
                                           height: 5,
                                       },
                                       shadowOpacity: 0.34,
                                       shadowRadius: 6.27,
                                       elevation:6,
                                    backgroundColor: "gray",
                                     }}>
                                    <TouchableOpacity
                                    onPress={() => setPayment(false)}
                                        style={{
                                            width: 327,
                                            marginTop: wp('30%'),
                                            height: 314,
                                            borderRadius: 10,
                                            alignSelf: 'center',
                                            backgroundColor: "white"
                                        }}>
                                        <Image style={{alignSelf:'center',
                                        width:250, height:250
                                        //  marginTop:wp('15%') 
                                        }}
                                         source={require('../../../../assets/done.gif')} /> 
                                        <Apptext style={{
                                            alignSelf:'center',
                                            fontFamily:'Lato',
                                            fontSize:18
                                        }}>Your payment has been completed</Apptext>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                onPress={() => checkValue()}
                                style={styles.buttonContainer}>
                                <Apptext style={styles.buttonText}>{"Pay"}</Apptext>
                            </TouchableOpacity>
                        </View>
                    </> :
                    <Pressable
                    //  onPress={()=>props.navigation.navigate('HomeScreen')}
                    >
                        <Image source={require('../../../../assets/confirm.png')}
                            style={{ height: hp(100), width: wp(100), }} resizeMode='stretch' />
                    </Pressable>}
            </ScrollView >
        </View>
    )
}
export default CardPayment;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white',
    },
    smallfields: {
        width: '100%', marginTop: hp(.5), justifyContent: 'space-between', flexDirection: 'row', height: hp(7)
    },
    boxwraper: {
        backgroundColor: '#F1F1F1', width: '38%', paddingHorizontal: wp(4),
        borderRadius: 7
    },
    ownDiv: {
        flexDirection: "row",
        marginBottom: wp('5%'),
        height: 48,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        width: wp('65%'),
        borderRadius: 15,
        elevation: 1,
        marginHorizontal: wp('5%'),
        marginTop: wp('3%')
    },
    boxes1: {
        marginLeft: wp('75%'),
        marginTop: '15%',
        width: wp('20%'),

        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DefaultStyles.colors.secondary,
        borderColor: DefaultStyles.colors.secondary
    },
    boxesTxt: {
        fontFamily: 'Poppins',
        alignSelf: 'center',
        color: DefaultStyles.colors.white,

    },
    buttonContainer: {
        marginBottom: wp('5%'),
        marginTop: wp('17%'),
        width: wp('50%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('14%'),
        backgroundColor: DefaultStyles.colors.secondary,
        borderRadius: 8,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'Poppins-SemiBold'
    },
})