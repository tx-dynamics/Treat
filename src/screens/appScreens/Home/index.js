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
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { getAllOfCollection, getData, saveFav,getListing, saveInitialData} from "src/firebase/utility";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setItemLikes } from 'src/redux/actions/authAction';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native-paper';


const Home = ({ navigation }) => {

    const userInfo = useSelector((state) => state.auth.userdata)
    // console.log("userInfo",userInfo)
    let dispatch = useDispatch();
    const [isReferesh, setReferesh] = useState(false);
    const [coverImg, setCoverImg] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [islistingData, setListingData] = useState([]);
    const [profilePath, setProfileUrl] = useState('');
    const [userId, setUserId] = useState('');
    const [isMonth, setMonth] = useState('');
    
    const FavItems = useSelector((state) => state.auth.ItemLikes)

    const chkData = async () => {
        let res = await getAllOfCollection("home")
        setCoverImg(res)
    }

    const listingData = async () => {

        // let res = await getListing("FavoriteListing", userInfo.uid)
        // let rest = await getListing("users", userInfo.uid)
            
            let rest = await getListing("users", userInfo.uid)
            console.log("rst",rest)
            setProfileUrl(rest.profilePhoto ? rest.profilePhoto : null)
        // let result = res.media.filter((item) => item.isLike === true && item.userId === userInfo.uid);
        // setListingData(result)
    }

    useFocusEffect(
        React.useCallback(() => {
            listingData();
            getFvListing();
        }, [navigation])
      );

    useEffect(() => {
        chkData();
        setTimeout(() => { 
            listingData();
            setLoading(false)
    }, 2000);
    },[navigation])

    useEffect(() => {
        getFvListing();
        setMonth(moment(new Date).format("MMMM"))
    }, [navigation]);
  

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

        console.log(moment(day).format("D MMMM YYYY"))
       
    };
    const getFvListing = async() => {
        let res = await getListing("FavoriteListing", userInfo.uid)
        dispatch(setItemLikes(res.media))
        if (typeof FavItems === "undefined") {
            console.log("Undefined")
            await saveInitialData("FavoriteListing", userInfo.uid)
        }
        else{
            console.log("FavItems",FavItems)
            
        }
    }

       const heartMethod = async (item) => {   
        let hrt = item.isLike ? false : true;
        let Details = {
            id: item.id ? item.id : null,
            title: item.title ? item.title : null,
            description: item.description ? item.description : null,
            sub_title: item.sub_title ? item.sub_title : null,
            url : item.url ? item.url : null,
            thumbnail: item.thumbnail ? item.thumbnail : null,
            userId : userInfo.uid ? userInfo.uid : null,
            isLike : hrt
        };

        let exist ;
        let indexes ;
        if (typeof FavItems === "undefined") {
            console.log("Undefined")
        }
        else{
            FavItems.map((val, index) => 
            {
                if (item.id === val.id) {
                    console.log("exists")
                    console.log("index", index)
                    exist = true;
                    indexes = index;
                }     
            })
        }
    if (exist === true) {
        console.log(indexes)
        
        FavItems.splice(indexes,1)
        await firestore().collection("FavoriteListing").doc(userInfo.uid).delete().
        then(async() => {
            // getFvListing();
            setReferesh(!isReferesh)
            console.log("Favitems",FavItems)
            await saveFav("FavoriteListing",userInfo.uid, FavItems)
        })
    }
    else{
        console.log("FavItems",FavItems)
        FavItems.push(Details)
        await saveFav("FavoriteListing",userInfo.uid, FavItems)
    }
    }
if (isLoading) {
    return <ActivityIndicator size={"small"} color={DefaultStyles.colors.primary}  />
}
else{


    return (
        <View style={[styles.container]}>
            <HomeHeader
                headrImg={profilePath ? { uri: profilePath } : require('../../../../assets/empty-image.png')}
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
                        backImg={{ uri: coverImg.cover }}
                        label={coverImg.quote ? coverImg.quote.substring(0,7)+"..." : null}
                    // isSubTxt={coverImg.description ? true : false}
                    // setSubTxt={coverImg.description ? coverImg.description : null}
                    />
                </View>
                <View style={styles.cntrTxt}>
                    {/* <Apptext style={styles.grayTxt}>{`“It takes as much energy to wish as it does to plan.” 
                                    Eleanor Roosevelt`} </Apptext> */}
                    <Apptext style={styles.grayTxt}>{coverImg.quotee ? coverImg.quotee : null} </Apptext>
                </View>
                <Apptext style={styles.monthTxt}>{isMonth}</Apptext>
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
                    data={FavItems}
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
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <HomeBox
                            yellowBoxTxt={index + 1 + " MIN"}
                            leftTitle={item.title}
                            subTitle={item.sub_title}
                            leftImgName={{ uri: item.thumbnail }}
                            heartImg={item.isLike ? require('../../../../assets/smallRedHeart.png') : require('../../../../assets/redHeart.png')}
                            onPress={() => {
                                setHeart(false)
                                heartMethod(item)}}
                        />

                    )}
                />

            </ScrollView>
        </View>
    )
                            }
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