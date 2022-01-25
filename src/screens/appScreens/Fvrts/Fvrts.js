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
import { getAllOfCollection, getFvrtsListing,saveFvrtsData,saveFav, getListing } from "src/firebase/utility";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setItemLikes } from 'src/redux/actions/authAction';
import firestore from '@react-native-firebase/firestore';


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

    let dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userdata)
    const FavItems = useSelector((state) => state.auth.ItemLikes)

    const [islistingData, setListingData] = useState([]);
    const [isLike, setLike] = useState(true);
    const [isDesc, setDesc] = useState([]);
    const [isReferesh, setReferesh] = useState(false);


    const getFvListing = async() => {
        let res = await getListing("FavoriteListing", userInfo.uid)
        dispatch(setItemLikes(res.media))
        if (FavItems === undefined) {
            console.log("Undefined found")    
        }
        else{
            console.log("FavItems",FavItems)
            
        }
    }
    useEffect(() => {
        getFvListing();
    }, [isReferesh]);

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

    return (
        <View style={styles.container}>
            <Header
                label={"Favorites"}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={{ marginTop: wp('8%') }} >
                    <FlatList
                        data={FavItems }
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
                                    heartMethod(item);
                                   
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