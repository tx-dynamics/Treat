import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import HumanHeader from 'src/components/HumanHeader';

const index = ({ navigation }) => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)


    return (
        <View style={styles.container}>
            <ScrollView >
                <HumanHeader />

                <View style={{ alignSelf: 'center' }}>
                    <Apptext style={{ fontFamily: "Poppins" }}>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies ultricies viverra nulla pulvinar lectus eu malesuada. Interdum habitant sed semper morbi nisi. Enim fermentum a sed potenti ornare at luctus. Habitant pellentesque varius vitae accumsan vitae nunc fermentum, nunc.

Urna tellus lorem ullamcorper consequat enim vestibulum cras. Tempor diam odio laoreet semper odio lectus tellus rhoncus augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies ultricies viverra nulla pulvinar lectus eu malesuada.
       
Interdum habitant sed semper morbi nisi. Enim fermentum a sed potenti ornare at luctus. Habitant pellentesque varius vitae accumsan vitae nunc fermentum, nunc. Urna tellus lorem ullamcorper consequat enim vestibulum cras. Tempor diam odio laoreet semper odio lectus tellus rhoncus augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit.

 Sed ultricies ultricies viverra nulla pulvinasr lectus eu malesuada. Interdum habitant sed semper morbi nisi. Enim fermentum a sed potenti ornare at luctus. Habitant pellentesque varius vitae accumsan vitae nunc fermentum, nunc. Urna tellus lorem ullamcorper consequat enim vestibulum cras.`}
                    </Apptext>
                </View>
            </ScrollView>
            <Apptext style={[styles.userTxt, { fontSize: 20 }]}>Subscription Options</Apptext>
            <Apptext style={[styles.userTxt, { fontSize: 13, marginTop: 5, color: DefaultStyles.colors.secondary }]}>(Billed as one payment)</Apptext>
         
         <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("VerifyEmail")}
                    style={styles.buttonContainer}>
                    <Apptext style={styles.buttonText}>{"Quarterly"}</Apptext>
                    <Apptext style={styles.buttonText}>{"$39.99"}</Apptext>
                    <Apptext style={[styles.buttonText, {fontSize:12}]}>{"Every Three Months*"}</Apptext>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("VerifyCode")}
                    style={[styles.buttonContainer, {backgroundColor:DefaultStyles.colors.secondary}]}>
                      <Apptext style={styles.buttonText}>{"Annual"}</Apptext>
                    <Apptext style={styles.buttonText}>{"$109.99"}</Apptext>
                    <Apptext style={[styles.buttonText, {fontSize:12}]}>{"Per Year*"}</Apptext>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    userTxt: {
        fontSize: wp('7%'),
        alignSelf: 'center',
        color: DefaultStyles.colors.primary,
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        marginTop: wp('13%'),
        marginBottom: wp('10%'),
        width: wp('37%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('40%'),
        backgroundColor: '#f6b558',
        borderRadius: 8,
        // alignSelf: 'center'
    },
    buttonText: {
        fontSize: 16,
        marginVertical:wp('2%'),
        color: '#ffffff',
        fontFamily: 'Poppins-Regular'
    },
});