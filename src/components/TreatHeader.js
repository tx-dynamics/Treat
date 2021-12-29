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
      <View style={styles.midBox}>
      <Image style={{width:87,height:47,}} source={require('../../assets/Logo.png')} />
      </View>
      <Icon
        size={20}
        onPress={onPressRight}
        name={rightIcon}
        color={contentColor}
      />
    <Image style={{marginTop:wp('3%')}} source={require('../../assets/settingIcon.png')} />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignSelf:'center',
    flexDirection: "row",
    padding: wp('3%'),

  },
  midBox:{
    width:wp('80%'),alignItems:'center',
  }
});

export default TreatHeader;
