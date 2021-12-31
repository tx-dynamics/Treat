import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import HumanHeader from 'src/components/HumanHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import RadioButtonRN from 'radio-buttons-react-native';


const AskProblem = ({ navigation }) => {

    const data = [
        {
            label: 'Stress'
        },
        {
            label: 'Lack of appreciation'
        },
        {
            label: 'Burnout'
        },
        {
            label: 'Lack of emotional support'
        },
        {
            label: 'Others'
        },

    ];

    const [check2, setCheck2] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView >
                <HumanHeader />
                <View style={{ flexDirection: 'row', 
        marginLeft:wp('2%'),alignSelf: 'center' }}>
                    <Apptext style={styles.userTxt}>What is your biggest </Apptext>
                    <Apptext style={[styles.userTxt, { fontFamily: 'Poppins-SemiBold' }]}>hurdle right now?</Apptext>
                </View>
                <View style={{marginTop:wp('14%')}}>
                    <RadioButtonRN
                        data={data}
                        boxStyle={{backgroundColor: "white",marginTop:-15,borderColor: "white" }}
                        circleSize={10}
                        deactiveColor="#f9c26e"
                        textStyle={{ fontSize: 14, fontFamily: "Poppins-Regular",
                        color: DefaultStyles.colors.primary }}
                        selectedBtn={(e) => console.log(e)}
                        icon={
                            <Icon
                                name="checkcircleo"
                                size={16}
                                color={'#f9c26e'}
                            />
                        }
                    />

                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => navigation.navigate("AskSubscription")}
                style={styles.buttonContainer}>
                <Apptext style={styles.buttonText}>{"Next"}</Apptext>
            </TouchableOpacity>
        </View>
    )
}

export default AskProblem;

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
        width: wp('65%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('14%'),
        backgroundColor: DefaultStyles.colors.primary,
        borderRadius: 8,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4%'),
        color: '#ffffff',
        fontFamily: 'Poppins-Regular'
    },
});