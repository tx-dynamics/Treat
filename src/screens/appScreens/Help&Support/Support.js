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


const Support = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <Header
                label={"Support"}

            />
            <ScrollView>
                <View style={styles.imgView}>
                    <Image source={require('../../../../assets/support.png')} />
                </View>
                <View style={styles.directionView}>
                    <Apptext style={styles.hlpTxt}>Need some help?</Apptext>
                    <Apptext style={[styles.hlpTxt, { color: '#b8b8bc' }]}>
                    {` Get lost? Don’t know how to use?
    Feel free to get in touch with us`}</Apptext>
                </View>
                <TouchableOpacity
                onPress={() => navigation.navigate('Contact')}
                style={styles.btnView}>
                <Apptext style={styles.btnTxt}>Contact Us</Apptext>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Support;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    imgView: {
        alignSelf: 'center',
        marginTop: wp('11%')
    },
    directionView: {
        alignSelf: 'center',

    },
    hlpTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: wp('4.5%'),
        marginTop: wp('6%'),
        alignSelf:'center',
        textAlign:'center'
    },
    btnView:{
        width:wp('90%'),
        height:wp('17%'),
        backgroundColor:DefaultStyles.colors.secondary,
        borderRadius:8,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:wp('48%'),
        marginBottom:wp('10%')
    },
    btnTxt:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
        color:DefaultStyles.colors.white
    }

});