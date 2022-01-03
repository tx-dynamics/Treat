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
                label={"Contact"}

            />
            <ScrollView>
            <View style={[styles.inputContainer]} >
            <View style={{ flexDirection: 'row', marginHorizontal:wp('10%') }}>
                <TextInput
                    style={styles.HumanInput}
                    numberOfLines={1}
                    placeholder={"First Name"}
                    placeholderTextColor={'#929292' } 
                  
                />
               
            </View>
        </View>
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
    
    },
    inputContainer: {
        width: wp('90%'),
        height: wp('15%'),
        marginTop: wp('3%'),
        marginBottom:5,
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