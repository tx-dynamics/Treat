import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import Header from 'src/components/Header';
import Icon from 'react-native-vector-icons/AntDesign';
import RadioButtonRN from 'radio-buttons-react-native';


const WorkSchedule = ({ navigation }) => {

    const data = [
        {
            label: 'Days, 12h'
        },
        {
            label: 'Days, 8h'
        },
        {
            label: 'Mid, 09-2100'
        },
        {
            label: 'Mid, 1100-2300'
        },
        {
            label: 'Mid, 1500-0300'
        },
        {
            label: 'Nights, 12h'
        },
        {
            label: 'Nights, 8h,'
        },

    ];

    const [check2, setCheck2] = useState(false);

    return (
        <View style={styles.container}>
            <Header
                label={"Work Schedule"}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView >
                <View style={{ flexDirection: 'row', marginLeft: wp('2%'), alignSelf: 'center' }}>
                    <Apptext style={[styles.userTxt, { fontFamily: 'Poppins-SemiBold', marginTop: wp('10%') }]}>What shift do you work?</Apptext>
                    <Apptext style={[styles.userTxt, { fontFamily: 'Poppins-SemiBold', marginTop: wp('10%'), color:"red" }]}> *</Apptext>
                </View>
                <View style={{ marginTop: wp('14%') }}>
                    <RadioButtonRN
                        data={data}
                        boxStyle={{ backgroundColor: "white", marginTop: -15, borderColor: "white" }}
                        circleSize={10}
                        deactiveColor="#f9c26e"
                        textStyle={{
                            fontSize: 14, fontFamily: "Poppins-Regular",
                            color: DefaultStyles.colors.primary
                        }}
                        selectedBtn={(e) => {
                            setCheck2(true)
                            console.log(e)
                        }}
                        icon={
                            <Icon
                                name="checkcircleo"
                                size={16}
                                color={'#f9c26e'}
                            />
                        }
                    />

                </View>
                {check2 ? (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PickDate")}
                        style={styles.buttonContainer}>
                        <Apptext style={styles.buttonText}>{"Submit"}</Apptext>
                    </TouchableOpacity>
                ) : null}

            </ScrollView>

        </View>
    )
}

export default WorkSchedule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    userTxt: {
        fontSize: wp('4.5%'),
        alignSelf: 'center',
        color: DefaultStyles.colors.primary,
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        marginBottom: wp('13%'),
        width: wp('28%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('12%'),
        marginTop: 50,
        borderWidth: 1,
        borderColor: DefaultStyles.colors.secondary,
        borderRadius: 41,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4%'),
        color: DefaultStyles.colors.secondary,
        fontFamily: 'Poppins'
    },
});