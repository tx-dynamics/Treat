import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import { Divider } from 'react-native-elements';
import TreatBox from 'src/components/TreatBox';
import HomeWideCard from 'src/components/HomeWideCard';
import PaymentOption from 'src/components/PaymentOption';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const creditCard = [
    {
        label: 'Credit/Debit Card'
    },
];
const googlePay = [
    {
        label: 'Google Payment'
    },
];
const payPal = [
    {
        label: 'Paypal'
    },
];


const AskPaymentOption = ({ navigation }) => {

const [isShow, setShow] = useState(false);

    return (
        <View style={styles.container}>
            <Header
                label="Payment Method"
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>

                <View style={{ marginTop: wp('4%') }}>

                    <TouchableOpacity
                        style={styles.SightingContainer}>
                        <View style={styles.DirectionView}>
                            <View style={styles.boxWidth}>
                                <RadioButtonRN
                                    data={creditCard}
                                    boxStyle={{ backgroundColor: "white", borderColor: "white" }}
                                    circleSize={10}
                                    textStyle={styles.SightingText1}
                                    selectedBtn={(e) => 
                                        {
                                        setShow(true)
                                        console.log(e)}
                                    }
                                  
                                />
                            </View>
                            <View style={{ marginLeft: wp('50%') }}>
                                <Image source={require('../../../../assets/creditCard.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* ********************************** */}
                    
                    <TouchableOpacity
                        style={styles.SightingContainer}>
                        <View style={styles.DirectionView}>
                            <View style={styles.boxWidth}>
                                <RadioButtonRN
                                    data={googlePay}
                                    boxStyle={{ backgroundColor: "white", borderColor: "white" }}
                                    circleSize={10}
                                    textStyle={styles.SightingText1}
                                    selectedBtn={(e) =>  {
                                        setShow(true)
                                        console.log(e)}
                                    }
                                  
                                />
                            </View>
                            <View style={{ marginLeft: wp('50%') }}>
                                <Image source={require('../../../../assets/googlePay.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* ********************************** */}
                    
                    <TouchableOpacity
                        style={styles.SightingContainer}>
                        <View style={styles.DirectionView}>
                            <View style={styles.boxWidth}>
                                <RadioButtonRN
                                    data={payPal}
                                    boxStyle={{ backgroundColor: "white", borderColor: "white" }}
                                    circleSize={10}
                                    textStyle={styles.SightingText1}
                                    selectedBtn={(e) => {
                                        setShow(true)
                                        console.log(e)}}
                                  
                                />
                            </View>
                            <View style={{ marginLeft: wp('50%') }}>
                                <Image source={require('../../../../assets/paypal.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* ********************************** */}
                </View>

              {isShow ? (<TouchableOpacity
                onPress={() => navigation.navigate("CardPayment")}
                style={styles.buttonContainer}>
                <Apptext style={styles.buttonText}>{"Continue to pay"}</Apptext>
            </TouchableOpacity>) : null}
            </ScrollView>
        </View>
    )
}

export default AskPaymentOption;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    buttonContainer: {
        marginBottom: wp('7%'),
        width: wp('62%'),
        marginTop:wp('60%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('14%'),
        backgroundColor: DefaultStyles.colors.secondary,
        borderRadius: 8,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4.5%'),
        color: '#ffffff',
        fontFamily: 'Poppins-Medium'
    },
    SightingContainer: {
        width: wp('85%'),
        marginTop: wp('5%'),
        height: 104,
        marginBottom: 1,
        borderRadius: 15,
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
        padding: 15,
    },
    countStl: {
        color: DefaultStyles.colors.white,
        padding: 1
    },
    countStl1: {
        color: DefaultStyles.colors.secondary,
        padding: 1
    },
    boxWidth: {
        width: wp('12%'),
    },

    SightingText1: {
        fontFamily: "Poppins-Medium",
        fontSize: wp('4%'),
        width: wp('60%'),
        color: DefaultStyles.colors.textColor,
        //  backgroundColor:"green",
        paddingLeft: wp('7%')
    },

    innerTxt: {
        fontFamily: 'Lato-Regular',
        fontSize: wp('2%'),
        color: DefaultStyles.colors.white
    }

});