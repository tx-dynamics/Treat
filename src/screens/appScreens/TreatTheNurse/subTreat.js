import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import TreatHeader from 'src/components/TreatHeader';
import { Divider } from 'react-native-elements';
import OptionsBox from 'src/components/OptionsBox';
import OptionsBigBox from 'src/components/OptionsBigBox';
import ToggleSwitch from 'toggle-switch-react-native'

const subTreat = ({ navigation }) => {
    const [isItem, setSelectedItem] = useState([]);

    const DATA = [
        {
            id: 'bd37acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "1",
            label: "Never",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acb3444ewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "2",
            label: 'Rarely',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/treat2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acb21ea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "3",
            label: "Sometimes",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat3.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1b1-4efw23ffde6c2-aed5-3ad53abb28ba',
            count: "4",
            label: "Often",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat4.png"),
            dt: "01 Feb",
            move: "Detail"
        },
        {
            id: 'bd7acbea-33c1b1-4efwffde6c2-aed5-3ad53abb28ba',
            count: "5",
            label: "Very Often",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat4.png"),
            dt: "01 Feb",
            move: "Detail"
        },


    ];
    const DATAL = [
        {
            id: 'bd37acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "1",
            label: "Never",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acb3444ewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "2",
            label: 'Rarely',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/treat2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acb21ea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "3",
            label: "Sometimes",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            Img: require("../../../../assets/treat3.png"),
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
    return (
        <View style={styles.container}>
            <TreatHeader
            
            onPressRight={() => navigation.navigate("Settings")}
            />
            {/* <Divider width={1} style={{ marginTop: -7 }} color="lightgray" /> */}
            <ScrollView>
                <Apptext style={styles.monthTxt}>Treat The Nurse Analysis</Apptext>
                <View>
                    <Apptext style={styles.moreTxt} >{"When you [Help] people you have direct contact with their lives.As you may found, compassion for those you [Help] can affect you in positive and negetive ways. Below are some questions aboutyour experiences, both positive and negetive as a [helper]. Consider each of the following questions about you and your current work situation. Select the number that honestly reflects how frequently you experienced these things in last 30 days."} </Apptext>
                </View>

                <Apptext style={[styles.monthTxt, { color: '#2591ad' }]}>Personal Identification </Apptext>
                <View style={styles.txtInputContainer}>
                    <TextInput
                        placeholder='eg. 1234'
                    />
                </View>
                <View style={{ marginTop: wp('14%') }}>

                    <FlatList
                        data={DATAL}
                        numColumns={3}
                        horizontal={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <OptionsBox
                                count={item.count}
                                label={item.label}
                            />

                        )}
                    />
                </View>
                <View style={{width:wp('80%')}}>
                <View style={{width:wp('40%'),flexDirection:'row', alignSelf:'center' }}>
                    <OptionsBox
                        count={"4"}
                        label={"Often"}
                    />
                    <OptionsBox
                        count={"5"}
                        label={"Very Often"}
                    />
                </View>
                </View>
                <View>
                    <Apptext style={styles.blueTxt} >{`1_ I am preaccopied with more than one
 person [Help]`}</Apptext>
                </View>
                <View style={{ marginTop: wp('5%') }}>
                    <FlatList
                        data={DATA}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <OptionsBigBox
                                onPress={() => {
                                    addCategories(item)
                                    // navigation.navigate("Library")
                                }}
                                myStl={isItem.includes(item.id) ? true : false}
                                leftTitle={item.label}
                                count={item.count}
                            />

                        )}
                    />
                </View>
                <View style={{ marginTop: wp('18%') }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("TreatVideo")}
                        style={styles.buttonContainer}>
                        <Apptext style={styles.buttonText}>{"Finish !"}</Apptext>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default subTreat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
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
    monthTxt: {
        fontFamily: "Lato-Bold",
        fontSize: wp('4%'),
        alignSelf: 'center',
        marginTop: wp('6%'),
        color: DefaultStyles.colors.textColor
    },
    moreTxt: {
        fontFamily: "Lato-Regular",
        fontSize: wp('3%'),
        alignSelf: 'center',
        textAlign: 'center',
        color: '#2591ad',
        marginTop: wp('5%'),
        width: wp('86%'),
    },
    txtInputContainer: {
        width: wp('67%'),
        marginTop: wp('4%'),
        paddingLeft: wp('3%'),
        height: wp('13%'),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: DefaultStyles.colors.secondary,
        alignSelf: 'center'
    },
    blueTxt: {
        fontFamily: "Lato-Regular",
        fontSize: wp('4.5%'),
        alignSelf: 'center',
        color: DefaultStyles.colors.primary

    },
    buttonContainer: {
        marginBottom: wp('40%'),
        width: wp('78%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('14%'),
        backgroundColor: DefaultStyles.colors.primary,
        borderRadius: 12,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4.5%'),
        color: '#ffffff',
        fontFamily: 'Lato-Regular'
    },
});