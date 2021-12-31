import React from "react";
import { View, StyleSheet,Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultStyles from "../config/Styles";

function TreatHeader({
  rightIcon,
  label,
  leftIcon,
  backgroundColor,
  contentColor = DefaultStyles.colors.secondary,
  onPressLeft,
  onPressRight,
  style,
}) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: backgroundColor,
        ...style,
      }}
    >
      {/* <Icon
        size={25}
        onPress={onPressLeft}
        name={leftIcon}
        style={{marginTop:wp('2%')}}
        color={contentColor}
      /> */}

      <View style={styles.midBox}>
      <Image style={{width:87,height:47,}} source={require('../../assets/Logo.png')} />
      </View>
      <Icon
        size={20}
        onPress={onPressRight}
        name={rightIcon}
        color={contentColor}
      />
    <Image style={{marginTop:wp('3%'), marginLeft:-46}} source={require('../../assets/settingIcon.png')} />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width:wp('100%'),
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
    // alignSelf:'center',
    flexDirection: "row",
    padding: wp('3%'),
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    
    elevation: 3,


  },
  midBox:{
    width:wp('100%'),
    alignItems:'center',
  }
});

export default TreatHeader;
