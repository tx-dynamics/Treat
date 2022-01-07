import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Apptext from './Apptext';
import DefaultStyles from "../config/Styles";


const FormButton = ({buttonTitle,onPress, style, ...rest}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={styles.buttonContainer} {...rest}>
      <Apptext style={styles.buttonText}>{buttonTitle}</Apptext>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    
    marginBottom:wp('5%'),
    width: wp('64%'),
    justifyContent:'center',
    alignItems:'center',
    height: wp('14%'),
    backgroundColor: DefaultStyles.colors.primary ,
    borderRadius:8,
    alignSelf:'center'
  },
  buttonText: {
    fontSize: wp('4%'),
    color: '#ffffff',
    fontFamily:'Poppins-Regular'
  },
});
