import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/AntDesign';



const PaymentOption = ({ count, leftTitle, myStl,imgName, onPress, ...rest }) => {

    const data = [];

    return (
        <TouchableOpacity
            style={styles.SightingContainer}>
            <View style={styles.DirectionView}>
                <View style={styles.boxWidth}>
                    <RadioButtonRN
                        data={data}
                        boxStyle={{ backgroundColor: "white", borderColor: "white" }}
                        circleSize={10}
                        textStyle={styles.SightingText1}
                        selectedBtn={(e) => {
                            console.log(e)
                        }
                        }

                    />
                </View>
                <View style={{ marginLeft: wp('50%') }}>
                    <Image source={imgName} />
                </View>
            </View>
        </TouchableOpacity>
        // <TouchableOpacity
        //     onPress={onPress}
        //     style={styles.SightingContainer}>

        //     <View style={styles.DirectionView}>
        //         <View style={styles.boxWidth}>
        //             <RadioButtonRN
        //                 data={data}
        //                 boxStyle={{ backgroundColor: "white", marginTop: -15, borderColor: "white" }}
        //                 circleSize={10}
        //                 deactiveColor="#f9c26e"
        //                 textStyle={{
        //                     fontSize: 14, fontFamily: "Poppins-Regular",
        //                     color: DefaultStyles.colors.primary
        //                 }}
        //                 selectedBtn={(e) => console.log(e)}

        //             />
        //         </View>
        //         <View style={{}}>
        //             <Apptext style={styles.SightingText1}>
        //                 {leftTitle}
        //             </Apptext>
        //         </View>
        //     </View>
        // </TouchableOpacity>


    );
};

export default PaymentOption;

const styles = StyleSheet.create({

    SightingContainer: {
        width: wp('85%'),
        marginTop: wp('5%'),
        height: 104,
        marginBottom: 1,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: DefaultStyles.colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 1,
    },
    DirectionView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    countStl: {
        color: DefaultStyles.colors.white,
        padding: 1
    },
    countStl1: {
        color: DefaultStyles.colors.secondary,
        padding: 1
    },
    boxWidth: {
        width: wp('12%'),
    },

    SightingText1: {
        fontFamily: "Poppins-Medium",
        fontSize: wp('4%'),
        width: wp('60%'),
        color: DefaultStyles.colors.textColor,
        //  backgroundColor:"green",
        paddingLeft: wp('7%')
    },

    innerTxt: {
        fontFamily: 'Lato-Regular',
        fontSize: wp('2%'),
        color: DefaultStyles.colors.white
    }
});
