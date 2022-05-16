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
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import stripe from 'tipsi-stripe'


const data = [
    {
        label: 'Credit/Debit Card',
        Img: require('../../../../assets/creditCard.png')
    },
    {
        label: 'Google Payment',
        Img: require('../../../../assets/googlePay.png')
    },
    {
        label: 'Paypal',
        Img: require('../../../../assets/paypal.png')
    },
];
const creditCard = [
    {
        label: 'Credit/Debit Card',
    },
];
const googlePay = [
    {
        label: 'Google Payment',
    },

];
const paypal = [
    {
        label: 'Paypal',
    },
];


const AskPaymentOption = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [isShow, setShow] = useState(false);
    const [checked, setChecked] = useState('CreditCard');
    stripe.setOptions({
        publishableKey: 'pk_test_51KTR6YC7PK2T7hfAgKRkNdRh6v3Fn8mieeJPOXB2Mhc1C80sdLrq3XQzRClbnDJBdPnzfHsTSAqapgs3ulCRIrUI00VmeYfV7X'
        })
      
    const handleCardPayPress = async () => {
        console.log('handleCardPayPress()')
        // const options = {}
        try {
          setLoading(true)
          const token = await stripe.paymentRequestWithCardForm()
          console.log('Token from Card ', token)
          setToken(token)
          setLoading(false)
    
        } catch (error) {
          console.log('handleCardPayPress Error ', error)
          setLoading(false)
        }
    
    
      }
    
    
    console.log(checked)
    return (
        <View style={styles.container}>
            <Header
                label="Payment Method"
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>

                <View style={{ marginTop: wp('4%') }}>
                    {/* <FlatList   
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <PaymentOption
                    label={item.label}
                    imgName={item.Img}
                    />
                   
                )}
            /> */}
                    <TouchableOpacity 
                     onPress={handleCardPayPress}
                        style={styles.SightingContainer}>
                        <View style={styles.DirectionView}>
                            <View style={styles.boxWidth}>
                                <RadioButton
                                    value="Credit/DebitCard"
                                    color='#C64699'
                                    uncheckedColor='lightgray'
                                    status={checked === 'Credit/DebitCard' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setShow(true)
                                        setChecked('Credit/DebitCard')}}
                                />
                                {/* <RadioButtonRN
                                    data={creditCard}
                                    boxStyle={{ backgroundColor: "white", borderColor: "white" }}
                                    circleSize={10}
                                    textStyle={styles.SightingText1}
                                    selectedBtn={(e) => {

                                        setShow(true)
                                        console.log(e)
                                    }
                                    }

                                /> */}
                            </View>
                            <Apptext style={styles.SightingText1}>Credit/DebitCard</Apptext>
                            <View>
                                <Image source={require('../../../../assets/creditCard.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* ********************************** */}

                    <TouchableOpacity
                        style={styles.SightingContainer}>
                        <View style={styles.DirectionView}>
                            <View style={styles.boxWidth}>
                                <RadioButton
                                    value="GooglePayment"
                                    color='#C64699'
                                    uncheckedColor='lightgray'
                                    status={checked === 'GooglePayment' ? 'checked' : 'unchecked'}
                                    onPress={() => 
                                        {
                                        setShow(true)
                                        setChecked('GooglePayment')
                                    }}
                                />
                              
                            </View>
                            <Apptext style={styles.SightingText1}>Google Payment</Apptext>

                            <View>
                                <Image source={require('../../../../assets/googlePay.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.SightingContainer}>
                        <View style={styles.DirectionView}>
                            <View style={styles.boxWidth}>
                           
                            <RadioButton
                                    value="Paypal"
                                    color='#C64699'
                                    uncheckedColor='lightgray'
                                    status={checked === 'Paypal' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setShow(true),
                                        setChecked('Paypal')}}
                                />
                              
                            </View>
                            <Apptext style={styles.SightingText1}>Paypal</Apptext>

                            <View>
                                <Image source={require('../../../../assets/paypal.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* ********************************** */}
                </View>

                {isShow ? (<TouchableOpacity
                    onPress={() => navigation.navigate("CardPayment", {paymentType : checked })}
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
        marginTop: wp('60%'),
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
        paddingLeft:wp('4%'),
        padding: wp('8%'),
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
        width: wp('9%'),
    },

    SightingText1: {
        fontFamily: "Poppins-Medium",
        fontSize: wp('4%'),
        width: wp('53%'),
        color: DefaultStyles.colors.textColor,
        //  backgroundColor:"green",
        paddingLeft: wp('3%')
    },

    innerTxt: {
        fontFamily: 'Lato-Regular',
        fontSize: wp('2%'),
        color: DefaultStyles.colors.white
    }

});