import React from "react";
import { View, StyleSheet,Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultStyles from "../config/Styles";

function HumanHeader({
  rightIcon,
  label,
  leftIcon,
  backgroundColor,
  contentColor = DefaultStyles.colors.primary,
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
      <Icon
        size={25}
        onPress={onPressLeft}
        name={leftIcon}
        color={contentColor}
      />
      <Image style={{width:139,marginTop:wp('5%') ,height:77}} source={require('../../assets/Logo.png')} />

      <Icon
        size={20}
        onPress={onPressRight}
        name={rightIcon}
        color={contentColor}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // height: wp("20%"),
    // width: wp("95%"),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignSelf:'center',
    flexDirection: "row",
    padding: wp('6%'),
  },
});

export default HumanHeader;
