import React from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Apptext from "./Apptext";
import DefaultStyles from "../config/Styles";

function Header({
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
      <MaterialCommunityIcons
        size={20}
        onPress={onPressLeft}
        name={leftIcon}
        color={contentColor}
      />
      <Apptext style={[DefaultStyles.topheadingTxt, ]}>
        {label}
      </Apptext>
      <Icon
        size={30}
        onPress={onPressRight}
        name={rightIcon}
        color={contentColor}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: wp("20%"),
    width: wp("95%"),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: wp('5%'),
  },
});

export default Header;
