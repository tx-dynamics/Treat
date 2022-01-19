import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import { Divider } from 'react-native-elements';
import HomeBox from 'src/components/HomeBox';
import HomeHeader from 'src/components/HomeHeader';
import HomeWideCard from 'src/components/HomeWideCard';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { getAllOfCollection, getData, getListing } from "src/firebase/utility";
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {

    const userInfo = useSelector((state) => state.auth.userdata)


    const [coverImg, setCoverImg] = useState('');
    const [islistingData, setListingData] = useState([]);
    const [userId, setUserId] = useState('');

    const chkData = async () => {
        let res = await getAllOfCollection("home")
        setCoverImg(res)
    }

    const listingData = async () => {
        
            let res = await getListing("FavoriteListing", userInfo.uid)
            let result  = res.media.filter((item) => item.isLike === true && item.userId === userInfo.uid);
            setListingData(result)
    }

    useEffect(() => {
        chkData();
        listingData();
    }, [])

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Lorem Ipsum",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/human1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Lorem Ipsum',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/human2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Smith",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/human1.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "+22",
            label: "Aliz",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/human2.png"),
            dt: "01 Feb",
            move: "Detail"
        },
        {
            id: 'bd7acbfsdea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: 'Alexa',
            msg: "Uploaded a file",
            Img: require("../../../../assets/human1.png"),
            dt: "18 Mar",
            move: "Detail"
        },
        {
            id: 'bd7acddbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "John",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/human2.png"),
            dt: "01 Feb",
            move: "Detail"
        },
        {
            id: 'bd7acbeda-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: 'Marzena',
            msg: "potem sie zobaczy",
            Img: require("../../../../assets/human1.png"),
            dt: "01 Feb",
            move: "Detail"
        },

    ];

    const [isHeart, setHeart] = useState(true);
    const [isDate, setDate] = useState('');

    const updateHeart = () => {
        setHeart(!isHeart)
    }

    let datesWhitelist = [{
        start: moment(),
        end: moment().add(7, 'days')  // total 4 days enabled
    }];
    let datesBlacklist = [moment().add(0, 'days')]; // 1 day disabled

    const onDayPress = async (day) => {

        console.log(moment(day).format("D MMM YYYY"))

    };

    return (
        <View style={[styles.container]}>
            <HomeHeader
                headrImg={require('../../../../assets/boyImg.png')}
                headerTitle={"Welcome"}
                leftOnPress={() => navigation.navigate('withoutBottomTabnavigator', { screen: 'ProfileView' })}
                rightHeaderImg={require('../../../../assets/settingIcon.png')}
                onPress={() => navigation.navigate("Settings")}
            />

            {/* <Divider width={1} style={{marginTop:-7}} color="lightgray" /> */}
            <ScrollView>
                <View style={{ marginTop: wp('9%') }}>
                    <HomeWideCard
                        // backImg={require('../../../../assets/human2.png')}
                        backImg={{uri : coverImg.cover}}
                        label={coverImg.quote ? coverImg.quote : null}
                        // isSubTxt={coverImg.description ? true : false}
                        // setSubTxt={coverImg.description ? coverImg.description : null}
                    />
                </View>
                <View style={styles.cntrTxt}>
                    {/* <Apptext style={styles.grayTxt}>{`“It takes as much energy to wish as it does to plan.” 
                                    Eleanor Roosevelt`} </Apptext> */}
                    <Apptext style={styles.grayTxt}>{coverImg.quotee ? coverImg.quotee : null } </Apptext>
                </View>
                <Apptext style={styles.monthTxt}>JUNE</Apptext>
                <View style={styles.CalenderBox}>
                    <CalendarStrip
                        scrollable={true}
                        showMonth={false}
                        numDaysInWeek={7}
                        calendarAnimation={{ type: 'sequence', duration: 30 }}
                        daySelectionAnimation={{
                            type: 'border', duration: 200,
                            borderWidth: 1, borderHighlightColor: 'white'
                        }}
                        onDateSelected={onDayPress}
                        style={{
                            width: wp('90%'),
                            height: wp('30%'),
                            alignSelf: 'center',
                            backgroundColor: "#ffecf8", borderRadius: 20, paddingBottom: 10
                        }}
                        // calendarHeaderStyle={{color: 'white'}}
                        calendarColor={'#7743CE'}
                        iconStyle={{ tintColor: '#ffecf8' }}
                        dayContainerStyle={{ backgroundColor: "white" }}
                        dateNumberStyle={{ color: 'black' }}
                        dateNameStyle={{ color: 'black' }}
                        highlightDateContainerStyle={{ backgroundColor: DefaultStyles.colors.secondary }}
                        highlightDateNumberStyle={{ color: 'white' }}
                        highlightDateNameStyle={{ color: 'white', }}
                        disabledDateNameStyle={{ color: 'grey' }}
                        disabledDateNumberStyle={{ color: 'grey' }}
                        datesWhitelist={datesWhitelist}
                        // datesBlacklist={datesBlacklist}
                        iconContainer={{ flex: 0.1 }}
                    />
                    {/* <CalendarStrip
                        hideArrows={true}
                        scrollable={true}
                        showMonth={false}
                        numDaysInWeek={7}
                        // calendarHeaderContainerStyle={{backgroundColor:"green"}}
                        // calendarHeaderStyle={{fontSize:35, backgroundColor:"red"}}
                        calendarHeaderPosition='above'
                        style={{ height: wp('30%'), paddingTop: 5, paddingBottom: 5 }}
                        dayContainerStyle={{backgroundColor:"white", height:40, width:40}}
                        highlightDateContainerStyle={{backgroundColor:DefaultStyles.colors.secondary, }}
                        highlightDateNameStyle={{color:"white"}}
                        highlightDateNumberStyle={{color:"white"}}
                        calendarColor={'transparent'}
                        calendarHeaderStyle={{color: 'white'}}
                        dateNumberStyle={{color: 'black'}}
                        dateNameStyle={{color: 'black'}}
                        iconContainer={{flex: 0.1,color:'transparent',}}
                    /> */}
                </View>
                <View style={styles.DirectionView}>
                    <Apptext style={styles.PrsnlTxt}>Your Personal Library</Apptext>
                    <TouchableOpacity>
                        <Apptext style={styles.pinkTxt}>View All</Apptext>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={islistingData}
                    numColumns={2}
                    style={{
                        marginBottom: wp('4%'),
                        // backgroundColor:"red"
                    }}
                    ListEmptyComponent={() => {
                        return (
                          <Apptext style={{ alignSelf: "center", marginTop: 50 }}>
                            No Item Found
                          </Apptext>
                        );
                      }}
                    horizontal={false}
                    keyExtractor={(item, index) => index }
                    renderItem={({ item, index }) => (
                        <HomeBox
                            yellowBoxTxt={index + 1 +" MIN"}
                            leftTitle={item.title}
                            subTitle={item.sub_title}
                            leftImgName={{uri : item.thumbnail}}
                            heartImg={item.isLike ? require('../../../../assets/smallRedHeart.png') : require('../../../../assets/redHeart.png')}
                            onPress={updateHeart}
                        />

                    )}
                />

            </ScrollView>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: DefaultStyles.colors.white
    },
    headerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text2: {
        width: 158,
        fontFamily: "Poppins-Medium",
        fontSize: 16,
        color: DefaultStyles.colors.secondary
    },
    cntrTxt: {
        marginTop: wp('8%'), alignSelf: 'center'
    },
    grayTxt: {
        fontSize: 10,
        fontFamily: "Poppins-Regular",
        color: DefaultStyles.colors.gray
    },
    monthTxt: {
        fontFamily: "Lato-Regular",
        fontSize: wp('4%'),
        alignSelf: 'center',
        marginTop: wp('7%'),
        color: DefaultStyles.colors.secondary
    },
    CalenderBox: {
        width: wp('90%'),
        marginTop: wp('5%'),
        height: wp('30%'),
        alignSelf: 'center',
        backgroundColor: "#ffecf8", borderRadius: 20
    },
    DirectionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: wp('9%'),
        marginHorizontal: wp('8%')
    },
    PrsnlTxt: {
        color: DefaultStyles.colors.primary,
        fontFamily: "Poppins-Regular",
        fontSize: wp('4%')
    },
    pinkTxt: {
        fontSize: 10,
        fontFamily: "Poppins-Medium",
        color: DefaultStyles.colors.secondary
    }
});