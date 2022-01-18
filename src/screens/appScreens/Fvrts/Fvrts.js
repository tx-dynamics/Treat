import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, TextInput, Alert } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import Header from 'src/components/Header';
import FvrtComp from 'src/components/FvrtComp';
import { getAllOfCollection, getFvrtsListing,saveFvrtsData, getListing } from "src/firebase/utility";
import { useSelector } from 'react-redux';


const Fvrts = ({ navigation }) => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Introduction",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/fvrtGrl.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Implementation',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/fvrtGrl.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Outline",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/fvrtGrl.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "+22",
            label: "Education",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/fvrtGrl.png"),
            dt: "01 Feb",
            move: "Detail"
        },


    ];


    const userInfo = useSelector((state) => state.auth.userdata)

    const [islistingData, setListingData] = useState([]);
    const [isLike, setLike] = useState(true);
    const [isDesc, setDesc] = useState([]);


    const listingData = async () => {

        let res = await getFvrtsListing("FavoriteListing", userInfo.uid)
        let result = res.media.filter((item) => item.isLike === true && item.userId === userInfo.uid);
        setListingData(result)
    }

    useEffect(() => {
        listingData();
    }, [])
    const heartMethod = async(item,index) => {

        let Details = {
            id: item.id ? item.id : null,
            title: item.title ? item.title : null,
            description: item.description ? item.description : null,
            sub_title: item.sub_title ? item.sub_title : null,
            url : item.url ? item.url : null,
            thumbnail: item.thumbnail ? item.thumbnail : null,
            userId : userInfo.uid ? userInfo.uid : null,
            isLike : isLike
        };

        await saveFvrtsData('FavoriteListing', userInfo.uid,Details);
       }

    return (
        <View style={styles.container}>
            <Header
                label={"Favorites"}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={{ marginTop: wp('8%') }} >
                    <FlatList
                        data={islistingData }
                        keyExtractor={(item, index) => index}
                        ListEmptyComponent={() => {
                            return (
                              <Apptext style={{ alignSelf: "center", marginTop: 50 }}>
                                No Item Found
                              </Apptext>
                            );
                          }}
                        renderItem={({ item,index }) => (
                            <FvrtComp
                                leftImgName={{uri : item.thumbnail }}
                                labelValue={item.title}
                                rightonPress={() => {
                                    setLike(false)
                                    heartMethod(item,index);
                                   
                                }}
                                rightImgName={item.isLike ? require('../../../../assets/redHeart.png') : require('../../../../assets/heart.png')}
                            />

                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Fvrts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },


});