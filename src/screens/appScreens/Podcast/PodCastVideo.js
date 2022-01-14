import React, {useEffect, useState} from 'react';
import { View,StyleSheet,FlatList ,Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import TreatHeader from 'src/components/TreatHeader';
import { Divider } from 'react-native-elements';
import SelectBox from 'src/components/SelectBox';
import HomeWideCard from 'src/components/HomeWideCard';
import {getListing} from "src/firebase/utility";


const PodCastVideo = ({ navigation, route }) => {
    
    const {catName} = route.params;
    console.log(catName)

    const [islistingData, setListingData] = useState([]);
    const [isGuestName, setGuestName] = useState('');
    const [isItem, setSelectedItem] = useState([]);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "1",
            label: "Video 1",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/video1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "2",
            label: 'Video 2',
            msg: "Will do,",
            Img: require("../../../../assets/video2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "3",
            label: "Video 3",
            msg: "Lorem ipsum ",
            Img: require("../../../../assets/video3.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewe33w1-46c2-aed5-3ad53abb28ba',
            count: "3",
            label: "Video 4",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/video4.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
      
  

    ];

    const addCategories = async (item) => {
        var selectedIdss = [...isItem]
        if (selectedIdss.includes(item.id)) {
            selectedIdss = selectedIdss.filter(id => id !== item.id)
        }
        else {
            selectedIdss.push(item.id)
        }
        await setSelectedItem(selectedIdss)
    }


    const listingData = async () => {
        let res = await getListing("categories", catName)
        setListingData(res.media)
        setGuestName(res.guest)
        
    }
    useEffect(() => {
        listingData();
    },[])

    return (
        <View style={styles.container}>
            <TreatHeader
            onPressRight={() => navigation.navigate("Settings")}
            onPressLeft={() => navigation.goBack()}

            />
        <ScrollView>
            {isGuestName ?  
            <Apptext style={styles.monthTxt}>Series 1 Guest : {isGuestName}</Apptext>
            : null
            }
            <View style={{marginTop:wp('8%')}}>
            <FlatList   
                data={islistingData}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <HomeWideCard
                    backImg={{uri : item.thumbnail}}
                    isLabel={false}
                    isSubTxt={false}
                    isLeftTxt={true}
                    isSubLeftTxt={true}
                    setLeftTxt={item.title ? item.title : null}
                    setSubLeftTxt={item.description ? item.description.substring(0,15) : null}
                    />
                   
                )}
            />
              
            </View>


        </ScrollView>
        </View>
    )
}

export default PodCastVideo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    headerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    text2:{
        width:158,
        fontFamily:"Poppins-Medium",
        fontSize:16,
        color:DefaultStyles.colors.secondary

    },
    monthTxt:{
        fontFamily:"Poppins-Regular",
        fontSize:wp('5%'),
        alignSelf:'center',
        marginTop:wp('6%'),
    },
    });