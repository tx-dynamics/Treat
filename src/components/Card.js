import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "src/config/Styles";
import Apptext from 'src/components/Apptext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Card = ({ videoName, boxImg, subTxt,description, leftTitle,myStl ,onPress, ...rest }) => {

    return (

        <View style={styles.card}>
            <View style={styles.directionView}>
                <Apptext style={styles.txt}>{videoName}</Apptext>
                <View style={styles.redBox}>
                    <TouchableOpacity onPress={onPress}>
                    <Image source={boxImg} />
                    </TouchableOpacity>
                </View>
            </View>
            <Apptext style={styles.subTxt} >{subTxt}</Apptext>
            <Apptext style={styles.para}>
                 {description}
                 </Apptext>
        </View>


    );
};

export default Card;

const styles = StyleSheet.create({
    card:{
        alignSelf:'center',
        marginBottom:wp('18%'),
        width:wp('90%'),
        borderRadius:10,
        height:wp('73%'),
        borderWidth:0.5,
        borderColor:'lightgray',
        
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        
        // elevation: 2,
        // elevation:1
    },
    directionView:{
        marginHorizontal:wp('7%'),
        marginTop:wp('7%'),
        flexDirection:'row'
    },
    txt:{
        fontFamily:"Poppins-Regular",
        fontSize:20, 
        width:wp('63%'),
    },
    redBox:{
        width:wp('13%'),
        height:wp('13%'),
        backgroundColor:DefaultStyles.colors.secondary,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center'
    },
    subTxt:{
        marginHorizontal:wp('7%'),
        lineHeight:15,
        fontSize:wp('3.5%'),
        width:wp('60%'),
        fontFamily:"Poppins-Regular",
        color:DefaultStyles.colors.gray
    },
    para:{
        fontFamily:'Poppins',
        fontSize:wp('3.5%'),
        lineHeight:wp('6%'),
        marginHorizontal:wp('7%'),
        marginTop:wp('6%'),
        
    }

});
