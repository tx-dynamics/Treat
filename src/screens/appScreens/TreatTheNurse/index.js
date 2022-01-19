import React, {useState,useEffect} from 'react';
import { View,StyleSheet,FlatList ,Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import TreatHeader from 'src/components/TreatHeader';
import { Divider } from 'react-native-elements';
import TreatBox from 'src/components/TreatBox';
import HomeWideCard from 'src/components/HomeWideCard';
import { getAllOfCollection,getData, getListing} from "src/firebase/utility";


const TreatTheNurse = ({ navigation, route }) => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Introduction",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/treat1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Implementation',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/treat2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Outline",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/treat3.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "+22",
            label: "Education",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/treat4.png"),
            dt: "01 Feb",
            move: "Detail"
        },
  

    ];

    const [coverImg, setCoverImg] = useState('');
    const [islistingData, setListingData] = useState([]);

    const chkData = async () => {
        let res = await getAllOfCollection("nurse")
        setCoverImg(res) 
    }

    const listingData = async () => {
        let res = await getListing("categories", "nurse")
        setListingData(res.media)
    }

    useEffect(() => {
        chkData();
        listingData();
    }, []);

    return (
        <View style={styles.container}>
            <TreatHeader
            isback={false}
            onPressRight={() => navigation.navigate("Settings")}
            onPressLeft={() => navigation.goBack()}

            />
            {/* <Divider width={1} style={{marginTop:-7}} color="lightgray" /> */}
        <ScrollView>
            <Apptext style={styles.monthTxt}>Intro</Apptext>
            <View style={{marginTop:wp('7%')}}>
                <HomeWideCard 
                // backImg={require('../../../../assets/frameBack.png')}
                 backImg={{uri : coverImg.cover }}
                //  isSubTxt={coverImg.description ? true : false}
                //  setSubTxt={coverImg.description ? coverImg.description : null}
                 isLabel={false} />
            </View>

            <View>
            <FlatList   
                data={islistingData}
                numColumns={2}
                horizontal={false}
                keyExtractor={(item, index) => index}
                renderItem={({ item,index }) => (
                    <TreatBox
                    onPress={() => navigation.navigate("subTreat", {videodata : item})}
                    leftTitle={item.title ? item.title : null}
                    leftImgName={{ uri : item.thumbnail}}
                    subTxt={item.sub_title ? item.sub_title : null}
                />
                   
                )}
            />
           </View>
        </ScrollView>
        </View>
    )
}

export default TreatTheNurse;

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
        marginTop:wp('2%'),
        color:DefaultStyles.colors.secondary
    },
    });