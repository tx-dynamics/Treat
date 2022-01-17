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
import { getAllOptions, getAllOfCollection} from "src/firebase/utility";



const Framework = ({ navigation,route }) => {

    const [isItem, setSelectedItem] = useState([]);
    const [isOptions, setOptions] = useState([]);
    const [coverImg, setCoverImg] = useState('');

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "1",
            label: "Neuroscience",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat1.png"),
            dt: "5 minutes ago",
            move: "Detail",
            catName:"neuroscience"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "2",
            label: 'Biofield Science',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/treat2.png"),
            dt: "2 hours ago",
            move: "Detail",
            catName: "biofield"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "3",
            label: "Emotional Intelligence",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat3.png"),
            dt: "3 hours ago",
            move: "Detail",
            catName:"emotional_intelligence"
        },
      
  

    ];


    const chkData = async () => {
        let res = await getAllOfCollection("framework")
        setCoverImg(res)
    }
    const chkOptions = async () => {
        let res = await getAllOptions("frameworkCategories")
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
            <Apptext style={styles.monthTxt}>Framework</Apptext>
            <View style={{marginTop:wp('7%')}}>
                <HomeWideCard
                // backImg={require('../../../../assets/frameBack.png')}
                backImg={{uri : coverImg.cover}}
                isLabel={false}
                isSubTxt={coverImg.description ? true : false}
                setSubTxt={coverImg.description ? coverImg.description : null}
         
                />
            </View>

            <View style={{marginTop:wp('6%'), marginBottom:wp('5%')}}>
            <FlatList   
                data={isOptions}
                keyExtractor={(item, index) => index}
                renderItem={({ item,index }) => (
                    <SelectBox
                    onPress={() => {
                        // addCategories(item)
                        navigation.navigate("Library", {catName: item,dbName:"frameworkCategories"})
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

export default Framework;

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
    },
    });