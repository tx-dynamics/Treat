import React, {useState,useEffect} from 'react';
import { View,StyleSheet,FlatList ,Image, ScrollView, Alert } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import { Divider } from 'react-native-elements';
import TreatBox from 'src/components/TreatBox';
import HomeWideCard from 'src/components/HomeWideCard';
import {getListing} from "src/firebase/utility";


const Library = ({ navigation,route }) => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Video 1",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/library1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Video 2',
            msg: "Lorem Ipsum",
            Img: require("../../../../assets/library2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Video 3",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/library3.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "+22",
            label: "Video 4",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/library4.png"),
            dt: "01 Feb",
            move: "Detail"
        },
        {
            id: 'bd7acbe423a-c1b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "+22",
            label: "Video 5",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/library5.png"),
            dt: "01 Feb",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c14b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "+22",
            label: "Video 6",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/library6.png"),
            dt: "01 Feb",
            move: "Detail"
        },
  

    ];

    const {catName, dbName} = route.params;
    console.log(catName, dbName)
    const [islistingData, setListingData] = useState([]);
    const [ispageHeading, setPageHeading] = useState('');

    const listingData = async () => {
        let res = await getListing(dbName , catName)
        setListingData(res.media)
        console.log("res",res)
        setPageHeading(res.pageHeading)
        
    }
    useEffect(() => {
        listingData();
    },[])

    return (
        <View style={styles.container}>
            <Header
            label={ispageHeading ? ispageHeading : "" }
            rightImg={require('../../../../assets/settingIcon.png')}
            onPressLeft={() => navigation.goBack()}
            onPressRight={() => navigation.navigate("Settings")}
            />
        <ScrollView>
            
            <View style={{marginTop:wp('6%')}}>
            <FlatList   
                data={islistingData}
                numColumns={2}
                horizontal={false}
                ListEmptyComponent={() => {
                    return (
                      <Apptext style={{ alignSelf: "center", marginTop: 50 }}>
                        No Item Found
                      </Apptext>
                    );
                  }}
                keyExtractor={(item) => item.title}
                renderItem={({ item,index }) => (
                    <TreatBox
                    leftTitle={item.title ? item.title : null}
                    leftImgName={{uri : item.thumbnail}}
                    subTxt={item.description ? item.description : null }
                    leftOnPress={() => navigation.navigate("TreatVideo", {videodata: item}) }
                />
                   
                )}
            />
           </View>
        </ScrollView>
        </View>
    )
}

export default Library;

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
        fontFamily:"Lato-Regular",
        fontSize:wp('5%'),
        alignSelf:'center',
        marginTop:wp('6%'),
        color:DefaultStyles.colors.secondary
    },
    });