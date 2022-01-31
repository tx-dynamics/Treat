import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image,ToastAndroid, StyleSheet, ScrollView, } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import Header from 'src/components/Header';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment, { now } from 'moment';
import Marking from 'react-native-calendars/src/calendar/day/marking';
import { MarkingProps } from './marking';
import { saveData, getListing } from 'src/firebase/utility';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setCalenderDates,setWorkShifts } from 'src/redux/actions/authAction';


const PickDate = ({ navigation,route }) => {
  const {shift} = route.params;

  let dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userdata)
  const calenderdates = useSelector((state) => state.auth.calenderDates)
  // console.log("calender",calenderdates)
  const [isValue, setValue] = useState([]);
  const [isLastMonth, setLastMonth] = useState(1)
  const [isCurrentMonth, setCurrentMonth] = useState();
  const [isNextMonth , setNextMonth] = useState(1);
  const [markedDays, setmarkedDays] = useState([]);

  var currentMonth =  moment().startOf("month").format('MMMM');
  var lastMonth =  moment().subtract(isLastMonth,"month").startOf("month").format('MMMM');
  var nextMonth =  moment().add(isNextMonth , "month").startOf("month").format('MMMM');


  const checkMonths = () => {
    setLastMonth(isLastMonth - 1)
    setNextMonth(isNextMonth + 1)
    setCurrentMonth(nextMonth)
  }

  const getList = async() => {
  let rest = await getListing("WorkSchedule", userInfo.uid)
  dispatch(setCalenderDates(rest.dates ? rest.dates : []))
  setmarkedDays(rest.dates ? rest.dates : [])
  console.log("PickPage",rest.dates)
}
  useEffect(() => {
    setCurrentMonth(currentMonth)
    getList();
  },[navigation])
  
  const saveValues = async () => {
    let success = true;
    if(calenderdates === "" || undefined || null){
      ToastAndroid.show("Must Select Date Before Saving", ToastAndroid.LONG); 
    }
    else{
      const res = new Date(Date.now())
      const vatt = moment(res).format('hh:mm a')
    const Details = ({
      ShiftTime: shift ? shift : vatt,
      // ShiftTime:"12:25 am",
      dates: calenderdates
    })
    dispatch(setWorkShifts(Details))

    await saveData('WorkSchedule', userInfo.uid, Details)
    .then(data => {
        ToastAndroid.show("Record Saved", ToastAndroid.LONG);
        navigation.navigate('Settings')
    })
        .catch(function (error) {
            success = false;
            console.log(error.code + ':: ' + error.message);
            ToastAndroid.show(error.code, ToastAndroid.LONG);
        });
    return success;
      }   
}
 
  const markValues = async(datees) => {

    var selectedIdss = [...markedDays]
        if (selectedIdss.includes(datees)) {
            selectedIdss = selectedIdss.filter(id => id !== datees)
            console.log(selectedIdss)
        }
        else {
            // selectedIdss = [];
            selectedIdss.push(datees)
        }
        await setmarkedDays(selectedIdss)
        console.log(selectedIdss)
        dispatch(setCalenderDates(selectedIdss))
    // let markedDay = {};
    
    // markedDay[moment(datees).format('YYYY-MM-DD')] = {selected: true, selectedColor: 'purple',}
    // if(markedDays)
    // {
    //   setTimeout(() => {
    //   setmarkedDays(markedDay);
    //   }, 300);
    // }
    // else{
    //   setTimeout(() => {
    //   setmarkedDays(markedDay);
    //     }, 300);
    // }
  }

  return (
    <View style={styles.container}>
      <Header
        label={"Work Schedule"}
        rightImg={require('../../../../assets/tick.png')}
        onPressRight={() => {saveValues()}}
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView >
        {/* <View style={{ flexDirection: 'row', }}>
                    <Apptext style={styles.userTxt}>December 2022</Apptext>
                </View> */}
        <View style={{ marginTop: wp('6%'), width: 300, alignSelf: 'center' }}>
          <Calendar
            hideArrows={true}
            marking={true}
            markedDates={markedDays} 
            markingType='period'
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
                    markValues(date.dateString);
                    setValue(date.dateString)
                    // console.log('selected day', date.dateString)
                  }}
                  style={ state === 'disabled' ? styles.disabledBoxes : markedDays.includes(date.dateString) ? styles.filledBoxes : styles.boxesView}>
                
                  <Apptext
                    style={state === 'disabled' ? styles.disabledBoxesTxt : markedDays.includes(date.dateString) ? styles.filledBoxesTxt : styles.boxesTxt}
                    >
                      {date.day}</Apptext>
                </TouchableOpacity>
              )
            }}

          />
        </View>
        
        <View style={styles.centerBox1}>
        {/* {
          isValue ? (
            <Apptext style={styles.LCNTxt}>You Selected : {isValue ? isValue : null}</Apptext>
       
          ) : null
        } */}
      </View>
        <View style={styles.generalBox}>
          <TouchableOpacity 
          onPress={() => {
            checkMonths();
            // setLastMonth(isLastMonth + 1)
            // setCurrentMonth(isLastMonth)
          }}
          style={styles.leftTxt}>
            <Image source={require('../../../../assets/last.png')} />
            <Apptext style={styles.LCNTxt, { color: 'lightgray' }}>
              {lastMonth.substring(0,3) }</Apptext>
          </TouchableOpacity>
          <View style={styles.centerBox}>
            <Apptext style={styles.LCNTxt}>{isCurrentMonth}</Apptext>
          </View>
          <TouchableOpacity 
          onPress={() => {
            checkMonths();
            // setNextMonth(isNextMonth + 1)
            // setCurrentMonth(isNextMonth)
          }}
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
    marginTop: wp('5%'),
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
  centerBox1: {
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:wp('5%')
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
  disabledBoxes: {
    width: 42,
    height: 42,
    marginBottom: -14,
    backgroundColor: DefaultStyles.colors.lightgray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: "lightgray"
  },
  disabledBoxesTxt: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 12
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