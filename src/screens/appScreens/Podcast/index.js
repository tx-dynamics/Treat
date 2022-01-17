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
import { getAllOfCollection, getAllOptions } from "src/firebase/utility";



const Podcast = ({ navigation, route }) => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "1",
            label: "Series 1 Guest",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat1.png"),
            dt: "5 minutes ago",
            move: "Detail",
            catName:"series1"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "2",
            label: 'Series 2 Guest',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/treat2.png"),
            dt: "2 hours ago",
            move: "Detail",
            catName:"series2"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "3",
            label: "Series 3 Guest",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat3.png"),
            dt: "3 hours ago",
            move: "Detail",
            catName:"series3"
        },
      
  

    ];

    
    const [isItem, setSelectedItem] = useState([]);
    const [coverImg, setCoverImg] = useState('');
    const [isOptions, setOptions] = useState([]);


    const chkData = async () => {
        let res = await getAllOfCollection("podcast")
        setCoverImg(res)
        console.log(res)
    }

    const chkOptions = async () => {
        let res = await getAllOptions("podcastCategories")
        setOptions(res)
    }

    useEffect(() => {
        chkData();
        chkOptions();
    }, []);

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


    return (
        <View style={styles.container}>
            <TreatHeader
            isback={false}
            onPressRight={() => navigation.navigate("Settings")}
            onPressLeft={() => navigation.goBack()}

             />
        <ScrollView>
            <Apptext style={styles.monthTxt}>Podcast</Apptext>
            <View style={{marginTop:wp('3%')}}>
                <HomeWideCard
                // backImg={require('../../../../assets/podcastCover.png')}
                backImg={{uri : coverImg.cover }}
                isLabel={false}
                isSubTxt={coverImg.description ? true : false}
                setSubTxt={coverImg.description ? coverImg.description : null}
                />
            </View>
            {/* <Apptext style={styles.cntrTxt}>{`World renowned speakers share first
    hand knowledge and experiences.`}
                </Apptext> */}
   <Apptext style={styles.cntrTxt}>{coverImg.description ? coverImg.description : null}
                </Apptext>
            <View style={{marginTop:wp('8%'), marginBottom:wp('5%')}}>
            <FlatList   
                data={isOptions}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => (
                    <SelectBox
                    onPress={() => {
                        // addCategories(item)
                        navigation.navigate("PodCastVideo", {catName : item, dbName:"podcastCategories"})
                    }}
                    myStl={isItem.includes(item.id) ? true : false }
                    leftTitle={item}
                    count={index + 1}
                />
                   
                )}
            />
           </View>
        </ScrollView>
        </View>
    )
}

export default Podcast;

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
    cntrTxt:{
        alignSelf:'center',
        textAlign:'center',
        fontFamily:'Poppins-Regular',
        fontSize:wp('3%'),
        marginTop:wp('5%')
    }
    });