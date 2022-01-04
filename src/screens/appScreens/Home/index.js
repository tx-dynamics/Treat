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

const Home = ({ navigation }) => {

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

    const updateHeart = () => {
        setHeart(!isHeart)
    }
    return (
        <View style={[styles.container]}>
            <HomeHeader
                headrImg={require('../../../../assets/boyImg.png')}
                headerTitle={"Welcome"}
                leftOnPress={() => navigation.navigate('withoutBottomTabnavigator', {screen:'ProfileView'})}
                rightHeaderImg={require('../../../../assets/settingIcon.png')}
                onPress={() => navigation.navigate("Settings")}
            />

            {/* <Divider width={1} style={{marginTop:-7}} color="lightgray" /> */}
            <ScrollView>
                <View style={{ marginTop: wp('9%') }}>
                    <HomeWideCard
                        backImg={require('../../../../assets/human2.png')}
                    />
                </View>
                <View style={styles.cntrTxt}>
                    <Apptext style={styles.grayTxt}>{`“It takes as much energy to wish as it does to plan.” 
                                    Eleanor Roosevelt`} </Apptext>
                </View>
                <Apptext style={styles.monthTxt}>JUNE</Apptext>
                <View style={styles.CalenderBox}>
                   
                    <CalendarStrip
                        scrollable={true}
                        showMonth={false}
                        numDaysInWeek={7}
                        style={{ height: wp('30%'), paddingTop: 5, paddingBottom: 5 }}
                        dayContainerStyle={{backgroundColor:"white", height:35, width:35}}
                        highlightDateContainerStyle={{backgroundColor:DefaultStyles.colors.secondary, }}
                        highlightDateNameStyle={{color:"white"}}
                        highlightDateNumberStyle={{color:"white"}}
                        calendarColor={'transparent'}
                        calendarHeaderStyle={{color: 'white'}}
                        dateNumberStyle={{color: 'black'}}
                        dateNameStyle={{color: 'black'}}
                        iconContainer={{flex: 0.1,color:'transparent',}}
                    />
                </View>
                <View style={styles.DirectionView}>
                    <Apptext style={styles.PrsnlTxt}>Your Personal Library</Apptext>
                    <TouchableOpacity>
                        <Apptext style={styles.pinkTxt}>View All</Apptext>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={DATA}
                    numColumns={2}
                    style={{
                        marginBottom: wp('3%')
                    }}
                    horizontal={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <HomeBox
                            yellowBoxTxt={"15 MIN"}
                            leftTitle={item.label}
                            leftImgName={item.Img}
                            heartImg={isHeart ? require('../../../../assets/heart.png') : require('../../../../assets/smallRedHeart.png')}
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