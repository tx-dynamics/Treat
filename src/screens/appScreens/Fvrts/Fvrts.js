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
    const [isLike, setLike] = useState(true);

    const chkFvrt = () => {
        setLike(!isLike)
    };

    return (
        <View style={styles.container}>
            <Header
                label={"Favorites"}
                onPressLeft={() => navigation.goBack()}
            />
<ScrollView>
            <View style={{ marginTop: wp('8%') }} >
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <FvrtComp
                            leftImgName={item.Img}
                            labelValue={item.msg}
                            rightonPress={chkFvrt}
                            rightImgName={isLike ? require('../../../../assets/redHeart.png') : require('../../../../assets/heart.png')}
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