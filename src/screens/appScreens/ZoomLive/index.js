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

const ZoomLive = ({ navigation }) => {
    const [isItem, setSelectedItem] = useState([]);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "1",
            label: "Join Now",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "2",
            label: 'Archieved Meetings',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/treat2.png"),
            dt: "2 hours ago",
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


    return (
        <View style={styles.container}>
            <TreatHeader />
        <ScrollView>
            <Image style={styles.imgStl} source={require('../../../../assets/ZoomScreen.png')} />
            <View style={{marginTop:wp('7%'), marginBottom:wp('5%')}}>
            <FlatList   
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SelectBox
                    onPress={() => {
                        addCategories(item)
                        // navigation.navigate("Library")
                    }}
                    myStl={isItem.includes(item.id) ? true : false }
                    leftTitle={item.label}
                    count={item.count}
                />
                   
                )}
            />
           </View>
        </ScrollView>
        </View>
    )
}

export default ZoomLive;

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
        fontFamily:'Poppins-Regular',
        fontSize:wp('3%'),
        marginTop:wp('5%')
    },
    imgStl:{
        width:241, height:304, alignSelf:'center',
        marginTop:wp('5%')
    }
    });