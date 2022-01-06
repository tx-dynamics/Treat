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
import moment from 'moment';
import Marking from 'react-native-calendars/src/calendar/day/marking';

const PickDate = ({ navigation }) => {

  const [isValue, setValue] = useState('');

  const [isLastMonth, setLastMonth] = useState(1)
  const [isNextMonth , setNextMonth] = useState(1)

  var currentMonth =  moment().startOf("month").format('MMMM');
  var lastMonth =  moment().subtract(isLastMonth, "month").startOf("month").format('MMMM');
  var nextMonth =  moment().add(isNextMonth , "month").startOf("month").format('MMMM');

  return (
    <View style={styles.container}>
      <Header
        label={"Work Schedule"}
        rightImg={require('../../../../assets/tick.png')}
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView >
        {/* <View style={{ flexDirection: 'row', }}>
                    <Apptext style={styles.userTxt}>December 2022</Apptext>
                </View> */}
        <View style={{ marginTop: wp('6%'), width: 300, alignSelf: 'center' }}>
          <Calendar
            hideArrows={true}
            theme={{
              textMonthFontSize: wp('5%'),
              textMonthFontFamily: 'Poppins',
              monthTextColor: DefaultStyles.colors.secondary,
              textDayHeaderFontWeight: "bold",
              textDayHeaderFontFamily: 'Poppins',
              calendarBackground: "transparent",
              selectedDayTextColor: "#ffffff",
              selectedDayBackgroundColor: DefaultStyles.colors.secondary,
              todayTextColor: DefaultStyles.colors.white,
              todayBackgroundColor: DefaultStyles.colors.secondary,
              dayTextColor: "#2d4150",
              //dotColor: DefaultStyles.colors.primary,
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
                  marginBottom: 20,
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
            dayComponent={({ date, state, marking }) => {
           
              return (
                <TouchableOpacity
                  onPress={() => {
                    setValue(date.dateString)
                    console.log('selected day', date.dateString)
                  }}
                  style={ state === 'disabled' ? styles.filledBoxes : styles.boxesView}>
                  <Apptext
                    style={state === 'disabled' ? styles.filledBoxesTxt : styles.boxesTxt}
                    // style={[styles.boxesTxt, 
                    // {backgroundColor: state === 'disabled' ? "white" : "green", 
                    // color: state === 'disabled' ? 'black' : 'white'}]}
                    >
                      {date.day}</Apptext>
                </TouchableOpacity>
              )
            }}

          />

        </View>
        <View style={styles.generalBox}>
          <TouchableOpacity 
          onPress={() => setLastMonth(isLastMonth - 1)}
          style={styles.leftTxt}>
            <Image source={require('../../../../assets/last.png')} />
            <Apptext style={styles.LCNTxt, { color: 'lightgray' }}>
              {lastMonth.substring(0,3) }</Apptext>
          </TouchableOpacity>
          <View style={styles.centerBox}>
            <Apptext style={styles.LCNTxt}>{currentMonth}</Apptext>
          </View>
          <TouchableOpacity 
          onPress={() => setNextMonth(isNextMonth + 1)}
          style={styles.rightBox}>
            <Apptext style={[styles.LCNTxt, { color: 'lightgray' }]}>
              {nextMonth.substring(0,3) }</Apptext>
            <Image source={require('../../../../assets/next.png')} />
          </TouchableOpacity>
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
    marginTop: wp('4%'),
    marginBottom: wp('5%')
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
  generalBox: {
    width: wp('60%'),
    height: wp('10%'),
    marginTop: wp('22%'),
    flexDirection: 'row',
    alignSelf: 'center'
  },
  leftTxt: {
    flexDirection: 'row',
    width: wp('15%'),
    height: wp('10%'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightBox: {
    flexDirection: 'row',
    width: wp('15%'),
    height: wp('10%'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerBox: {
    width: wp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('9%'),
  },
  LCNTxt: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: DefaultStyles.colors.secondary
  },
  filledBoxes: {
    width: 42,
    height: 42,
    marginBottom: -14,
    backgroundColor: DefaultStyles.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: DefaultStyles.colors.white
  },
  boxesView: {
    width: 42,
    height: 42,
    marginBottom: -14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'lightgray'
  },
  filledBoxesTxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12
  },
  boxesTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12
  }
});