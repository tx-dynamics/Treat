import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import Header from 'src/components/Header';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const PickDate = ({ navigation }) => {

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
                rightImg={require('../../../../assets/tick.png')}
            />
            <ScrollView >
                {/* <View style={{ flexDirection: 'row', }}>
                    <Apptext style={styles.userTxt}>December 2022</Apptext>
                </View> */}
                <View style={{marginTop: wp('6%'), width: 300, height: 200, alignSelf: 'center' }}>
                    <Calendar
                        hideArrows={true}
                        
                        theme={{
                            textMonthFontSize: wp('5%'),
                            textMonthFontFamily: 'Poppins',
                            monthTextColor: DefaultStyles.colors.secondary,
                            textDayHeaderFontWeight: "bold",
                            textDayHeaderFontFamily:'Poppins',
                            calendarBackground: "transparent",
                            selectedDayTextColor: "#ffffff",
                            selectedDayBackgroundColor:DefaultStyles.colors.secondary,
                            todayTextColor: DefaultStyles.colors.white,
                            todayBackgroundColor:DefaultStyles.colors.secondary,
                            dayTextColor: "#2d4150",
                            dotColor: DefaultStyles.colors.primary,
                            textMonthFontWeight: "bold",
                            //textMonthFontSize:12,
                            textDayFontWeight: "700",
                            textDayFontSize: 14,
                            "stylesheet.calendar.header": {
                              week: {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                left: 2,
                              },
                              header: {
                                alignSelf: "flex-start",
                                right: 2,
                                marginBottom:20
                              },
                            },
                            "stylesheet.day.basic": {
                              base: {
                                width: 20,
                                height: 20,
                                alignItems: "center",
                                margin: -5,
                              },
                              text: {
                                marginTop: -5,
                                color: "black",
                                // fontWeight: 'bold',
                                fontSize: 12,
                                fontFamily: 'Poppins',
                              },
                            },
                            textDayStyle: {
                              color: "#333333",
                              fontWeight: "bold",
                              fontSize: 11.5,
                              fontFamily: 'Poppins',
                            },
                          }}
                    />

                </View>
                <View>
                    <Apptext style={styles.Txt}>{` Personalize the effectiveness pf your 
daily debriefing app by inputting your
  schedule to ensure you are debriefing.`}</Apptext>
                </View>
            </ScrollView>

        </View>
    )
}

export default PickDate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    userTxt: {
        fontSize: wp('4.5%'),
        alignSelf: 'center',
        color: DefaultStyles.colors.secondary,
        marginHorizontal: wp('11%'),
        fontFamily: 'Poppins-SemiBold',
        marginTop: wp('6%')
    },
    Txt: {
        color: DefaultStyles.colors.secondary,
        fontSize: 16,
        fontFamily: 'Poppins',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: wp('30%'), 
        marginBottom:wp('5%')
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