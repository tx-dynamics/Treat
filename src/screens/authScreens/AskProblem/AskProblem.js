import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import HumanHeader from 'src/components/HumanHeader';
import CheckBox from '@react-native-community/checkbox';

const AskProblem = ({ navigation }) => {

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
                    {/* <CheckBox
                        center
                        title="Click Here"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={check2}
                        onPress={() => setCheck2(!check2)}
                    /> */}
                </View>
            </ScrollView>

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
        width: wp('93%'),
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