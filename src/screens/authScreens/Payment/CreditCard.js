import React, { useState, useRef, useEffect } from 'react'
import {
    View, Text, StyleSheet, Image,
    StatusBar, SafeAreaView, ScrollView, Dimensions, Pressable, FlatList,
    TextInput, Share, Keyboard, ImageBackground
} from 'react-native'

import InputField from 'src/components/InputField';
import DefaultStyles from "src/config/Styles";
// import { Colors } from '../../Constants/Colors';
// import { iconPath } from '../../Constants/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { hp, wp } from '../../Helpers/Responsiveness';
// import { fonts } from '../../Constants/Fonts';
// import Ionicons from '../../Constants/FontIcon';
import ResponsiveText from 'src/components/Apptext';
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from 'src/components/Header';

// import Button from '../../Components/Button';

const CreditCard = (props) => {
    const[cardnum,setcardnum]=useState('');
    const[nam,setnam]=useState('');
    const[exp,setexp]=useState('');
    const[cvc,setcvc]=useState('');
    const[promo,setpromo]=useState('');
    const[show,setshow]=useState(false);
    
    return (
      <View style={styles.container}>
           <Header
                label="Payment Method"
                onPressLeft={() => navigation.goBack()}
            />
        <ScrollView>
         { !show?
         <>
         {/* <StatusBar hidden={false} backgroundColor={"#fff"} barStyle={'dark-content'} /> */}
            {/* <View style={{ marginBottom:hp(1.5),flexDirection: "row", justifyContent: "space-between", 
            marginTop: wp(4), alignItems: "center", paddingHorizontal: wp(4) }}>
                <Pressable onPress={() => props.navigation.goBack()}
                    style={{ flexDirection: "row", alignItems: "center" }}>
                   <Ionicons name='md-arrow-back-outline' color={'black'} size={wp(6.5)} />
                </Pressable>
            </View> */}
            <View style={{paddingHorizontal:wp(4)}}>
              <ImageBackground 
              style={{width:wp('83%'), height:163, alignSelf:'center',
              borderColor:cardnum!==''&&nam!==''&& exp!==''&&cvc!==''?'#00F462':'white',
              borderRadius:14, marginTop:24}}
              source={require('../../../../assets/cardBack.png')} resizeMode='cover'  >
              </ImageBackground>
              <ResponsiveText style={{fontFamily:'Poppins',
              color:"gray", textAlign:'center', marginTop:16,
              width:wp('80%'),alignSelf:'center' 
              }} >By adding debit / creadit card you agree to the
                             Terms & Condition</ResponsiveText>
                {/* <Image source={require('../../../../assets/podcastCover.png')}
                style={{height:185,width:wp(90),alignSelf:"center",marginTop:hp(2.5),
                borderWidth:2,
                }} resizeMode='cover' /> */}
                <ResponsiveText size="h6" fontFamily={'Poppins-Medium'} color={'#3A3C3F'}
          top={hp(.8)}
          >{"Card number"}
          </ResponsiveText>
          <InputField
          rightIcon={cardnum!==''?true:false}
          borderBottomWidth={cardnum!==''?1:0}
          borderColor={'#25D482'}
          maxLength={19}
          keyboardType='fe'
          rightIconName={require('../../../../assets/tick.png')}
            keyboardType=''
            placeholder={"0000   0000   0000    0000"}
            placeholderTextColor='#929DA9'
            color='#424D59'
            fontFamily={'Poppins-Medium'}
            value={cardnum}
            backgroundColor='#EAECEE'
            borderRadius={16}
            onChangeText={(EmailAdd) => setcardnum( EmailAdd
                .replace(/\s?/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim())}
          />
          <ResponsiveText size="h6" fontFamily={'Poppins-Medium'} color={'#3A3C3F'}
          top={hp(.8)}
          margin={[wp(2), 0, 0, 0]}
          >{"Cardholder name"}</ResponsiveText>
       
          <InputField
            keyboardType="email-address"
            color='#424D59'
            fontFamily={'Poppins-Medium'}
            backgroundColor='#EAECEE'
            borderBottomWidth={nam!==''?1:0}
            borderColor={'#25D482'}
            borderRadius={16}
            value={nam}
            onChangeText={(EmailAdd) => setnam(EmailAdd)}
          />
        <View style={{marginTop:hp(1.5),width:'100%',justifyContent:"space-between",flexDirection:"row"}} >
        <View style={{width:'38%'}}>
          <ResponsiveText  size="h6" fontFamily={'Poppins-Medium'} color={'#3A3C3F'} top={hp(.8)}
          >{"Expiry date"}
          </ResponsiveText>
          <InputField
               maxLength={7}
               keyboardType='fe'
              placeholder={"MM   /   YYYY"}
              placeholderTextColor='#929DA9'
              
          borderBottomWidth={exp!==''?1:0}
          borderColor={'#25D482'}
              color='#424D59'
              value={exp}
              backgroundColor='#EAECEE'
              borderRadius={16}
              fontFamily={'Poppins-Medium'}
              onChangeText={(EmailAdd) => setexp(
                EmailAdd.length === 4 && !EmailAdd.includes('/')
                  ? `${EmailAdd.substring(0, 2)}/${EmailAdd.substring(2, 5)}`
                  : EmailAdd)}
          />
          </View>
          <View style={{width:'38%'}}>
        <View style={{width:'90%',flexDirection:"row",justifyContent:'space-between',alignItems:'center',top:hp(.8)}}>
          <ResponsiveText  size="h6" fontFamily={'Poppins-Medium'} color={'#3A3C3F'}
          >{"CVV / CVC"}
          </ResponsiveText>
          <Image source={require('../../../../assets/eye.png')}
          tintColor="gray"
          style={{height:18,width:18,right:wp(2)}} resizeMode='contain'/>
          </View>
          <InputField
                keyboardType="em"
                placeholder={"3-4 digits"}
                placeholderTextColor='#929DA9'
                value={cvc}
                maxLength={4}
                backgroundColor='#EAECEE'
                borderBottomWidth={cvc!==''?1:0}
                borderColor={'#25D482'}
                borderRadius={16}
                fontFamily={'Poppins-Medium'}
                onChangeText={(EmailAdd) => setcvc(EmailAdd)}
          />
          </View>
          </View>
          <ResponsiveText size="h6" fontFamily={'Poppins-Medium'} color={'#3A3C3F'}
          top={hp(.8)}
          margin={[hp(8), 0, 0, 0]}
          >{"Have Promo?"}</ResponsiveText>
          <InputField
            keyboardType="email-address"
            color='#424D59'
            fontFamily={'Poppins-Medium'}
            backgroundColor='#EAECEE'
            borderBottomWidth={promo!==''?1:0}
            borderColor={'#25D482'}
            borderRadius={16}
            value={promo}
            onChangeText={(EmailAdd) => setpromo(EmailAdd)}
          />
             {/* <Button
             icon={true}
             iconName={iconPath.paylock}
              onPress={() => { cardnum!==''&&nam!==''&& exp!==''&&cvc!==''? setshow(true):console.log('no') }}
              Text={'Pay for the order'}
              marginTop={wp(15)}
              marginHorizontal={wp(20)}
              backgroundColor={cardnum!==''&&nam!==''&& exp!==''&&cvc!==''? DefaultStyles.colors.primary:'#9DA1B7'}
              height={hp(7)}
              borderRadius={16}
            /> */}
            </View>
            </>:
            <Pressable
            //  onPress={()=>props.navigation.navigate('HomeScreen')}
             >
            <Image source={require('../../../../assets/confirm.png')} 
            style={{height:hp(100),width:wp(100),}} resizeMode='stretch' />
            </Pressable>}
        </ScrollView >
        </View>
    )
}
export default CreditCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor:'white',
    }, 
    smallfields:{
        width:'100%', marginTop:hp(.5),justifyContent:'space-between',flexDirection:'row', height:hp(7)
     },
     boxwraper:{backgroundColor:'#F1F1F1',width:'38%',paddingHorizontal:wp(4),borderRadius:7},
})