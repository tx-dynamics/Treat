import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import HumanHeader from 'src/components/HumanHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
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
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Apptext style={styles.userTxt}>What is your biggest </Apptext>
                    <Apptext style={[styles.userTxt, { fontFamily: 'Poppins-Medium' }]}>hurdle right now?</Apptext>
                </View>
                <View>

                    <RadioButtonRN
                        data={data}
                        boxStyle={{backgroundColor:"white",borderColor:"white"}}
                        circleSize={16}
                        textStyle={{fontSize:14, fontFamily:"Poppins-Regular", color:DefaultStyles.colors.primary}}
                        selectedBtn={(e) => console.log(e)}
                        icon={
                            <Icon
                                name="check-circle-o"
                                size={25}
                                color="#2c9dd1"
                            />
                        }
                    />

                </View>
            </ScrollView>
            <TouchableOpacity
          onPress={()  => navigation.navigate("AskSubscription")}
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
        fontSize: 17,
        alignSelf: 'center',
        color: DefaultStyles.colors.primary,
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        marginBottom: wp('10%'),
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