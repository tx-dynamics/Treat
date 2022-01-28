import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal, ScrollView, Alert, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from 'src/components/Apptext';
import DefaultStyles from "src/config/Styles";
import FormInput from 'src/components/FormInput';
import FormButton from 'src/components/FormButton';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import { saveData } from 'src/firebase/utility';
import HumanHeader from 'src/components/HumanHeader';



const Signup = ({ navigation }) => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameChk, setNameChk] = useState(false);
    const [mailChk, setMailChk] = useState(false);
    const [passChk, setPassChk] = useState(false);
    const [tickChk, setTckChk] = useState(false);
    const [duplicateEmail, setDuplicateEmail] = useState(false);
    const [weakPass, setWeakPass] = useState(false);
    const [badFormat, setBadFormat] = useState(false);
    const [isPayment, setPayment] = useState(false);

    const checkValues = () => {
        if (name === "" && email === "" && password === "" && toggleCheckBox === false) {
            setNameChk(true)
            setMailChk(true)
            setPassChk(true)
            setTckChk(true);
        }
        else if (name === "") {
            setNameChk(true)
        }
        else if (email === "") {
            setMailChk(true)
        }
        else if (password === "") {
            setPassChk(true)
        }
        else if (toggleCheckBox === false) {
            setTckChk(true)
        }
        else {
            console.log("Sign Up Called")
            signUp(name, email, password, toggleCheckBox)
        }
    }
    const signUp = async (
        firstName,
        email,
        password,
        toggleCheckBox,
    ) => {
        let success = true;

        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async user => {
                let Details = {
                    email: email,
                    fullName: firstName,
                    TermsConditions: toggleCheckBox,
                    isBlocked: false,
                };
                console.log(
                    email,
                    firstName,
                    toggleCheckBox,
                )
                await saveData('users', user.user.uid, Details);
                // await saveInitialData('chats', user.user.uid);
                // var user= auth().currentUser;
                // user.sendEmailVerification().then(function(){
                //   Alert.alert("Verification Email is sent.! please verify your email before sign in");
                // }).catch(function(error){

                // });
                console.log(user);
                Alert.alert('Account Created!');
                navigation.navigate("Login")
            })
            .catch(function (error) {
                success = false;
                console.log(error.code + ':: ' + error.message);
                if (error.code === 'auth/email-already-in-use') {
                    setDuplicateEmail(true)
                    setBadFormat(false)
                    setWeakPass(false)
                }
                else if (error.code === 'auth/invalid-email') {
                    setBadFormat(true)
                    setDuplicateEmail(false)
                    setWeakPass(false)
                }
                else if (error.code === 'auth/weak-password') {
                    setWeakPass(true)
                    setBadFormat(false)
                    setDuplicateEmail(false)
                }
                else {
                    Alert.alert(error.message)
                }
                // Alert.alert(error.message);
            });
        return success;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.ImgView}>
                <Image source={require('../../../../assets/Logo.png')} />
                <Apptext style={styles.SignInTxt}>Create Account</Apptext>
            </View>
            <View style={{ marginTop: 30 }}>
                <FormInput
                    labelValue={name}
                    onChangeText={(e) => {
                        let value = e
                        value = value.replace(/[^A-Za-z]/ig, '')
                        setName(value)
                        setNameChk(false)

                    }}
                    // onChangeText={(txt) => {
                    //     setName(txt)
                    //     setNameChk(false)
                    // }}
                    placeholderText="Name"
                    keyboardType='default'
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {nameChk ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        Please Enter Name</Apptext>
                </View> : null}
                <FormInput
                    labelValue={email}
                    onChangeText={(txt) => {
                        setEmail(txt)
                        setMailChk(false)
                    }}
                    placeholderText="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {mailChk ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        Please Enter Valid Email</Apptext>
                </View> : null}
                {duplicateEmail ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        The email address is already in use by another account.</Apptext>
                </View> : null}
                {badFormat ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                    <Apptext style={{ fontSize: 10, color: "red" }}>
                        The email address is badly formatted</Apptext>
                </View> : null}

                <FormInput
                    labelValue={password}
                    onChangeText={(txt) => {
                        setPassword(txt)
                        setPassChk(false)
                    }}
                    placeholderText="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect={false}
                />
            </View>
            {passChk ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                <Apptext style={{ fontSize: 10, color: "red" }}>
                    Please Enter Strong Password</Apptext>
            </View> : null}
            {weakPass ? <View style={{ marginHorizontal: wp('6%'), marginTop: wp('1%') }}>
                <Apptext style={{ fontSize: 10, color: "red" }}>
                    Password should be at least 6 characters</Apptext>
            </View> : null}

            <TouchableOpacity
                style={styles.lightBoxTxt}>
              
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    boxType={'square'}
                    
                    onValueChange={(newValue) => {
                        setToggleCheckBox(newValue)
                        setPayment(newValue)
                        setTckChk(false)
                    }}
                   
                />
                
                <TouchableOpacity
                 onPress={() => setPayment(true)}
                >
                    <Apptext style={styles.lightTxt}> Agree to terms</Apptext>
                </TouchableOpacity>

            </TouchableOpacity>
            {tickChk ? <Apptext style={{ fontSize: 10, alignSelf: 'center', color: "red" }}>
                Please Agree to Terms & Conditions</Apptext> : null}
            <View style={{ marginTop: wp('5%') }}>

                <FormButton
                    buttonTitle="SIGN UP"
                    onPress={() => checkValues()}
                />
            </View>
            <TouchableOpacity 
            // onPress={() => navigation.navigate("AskProblem")}
            style={styles.methods}>
                <Apptext style={DefaultStyles.lightTxt}>Other Sign-Up Methods</Apptext>
            </TouchableOpacity>
            <View style={styles.socialImgs}>
                <Image source={require('../../../../assets/facebook.png')} />
                <Image source={require('../../../../assets/google.png')} />
            </View>
            <View style={styles.bottomLines} >
                <Apptext style={styles.bottomTxt}> Already have an account? </Apptext>
                <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                    <Apptext style={[styles.bottomTxt,
                    { color: DefaultStyles.colors.secondary, }]}>SIGN IN</Apptext>
                </TouchableOpacity>
            </View>
            <Modal visible={isPayment}>
            <View style={styles.container}>
             <HumanHeader />
            <Apptext style={styles.userTxt}>User Agreement</Apptext>
        <ScrollView >
           
            <View style={{ alignSelf: 'center' }}>
                <Apptext style={{fontSize:12,marginTop:18, fontFamily: "Poppins",marginHorizontal:wp('7%')}}>{`By purchasing any (“Program”) from Ashleigh Boyd LLC (“Company”), you (“Client” and collectively, the “Parties”) agree to the following terms of this Purchase Agreement 
                                    (“Agreement)”: 


                                    1. SERVICES. 

    Company agrees to provide its Program and Client
    agrees to abide by all policies and procedures as
    outlined in this agreement as a condition of their
                        participation in the Program.  


                                    2. DISCLAIMER. 


    Participant understands Company is not an agent,
    publicist, accountant, financial planner, lawyer,
    therapist,medical doctor or any other licensed or
    registered professional except registered nurse. 
    Coaching, which is not directive advice, counseling,
    or therapy, may address overall goals, specific proje
    -cts,or general conditions in Client’s life or profession.
    Coaching services may include setting priorities, esta
    -blishing goals, identifying resources, brainstorming,
    creating action plans, strategizing, asking clarifying 
    questions, and providing models, examples, and in-
    the-moment skills training. Company promises that
    all information provided by Client will be kept strictly
    confidential, as permissible by law.  

    All content found on the ashleighboyd.com and 
    treatthenurse.com Website, including: text, images, 
    audio, or other formats were created for informational 
    purposes only. The Content is not intended to be a
    substitute for professional medical advice, diagnosis, 
    or treatment.Always seek the advice of your physician
    or other qualified health provider with any questions
    you may have regarding a medical condition. Never 
    disregard professional medical advice or delay in 
    seeking it because of something you have read on
    this Website. 

    If you think you may have a medical emergency and 
    or feeling suicidal or homicidal, call your doctor, go
    to the emergency department, or call 911 immediately.
    Ashleigh Boyd LLC does not recommend or endorse
    any specific tests, physicians, products, procedures,
    opinions, or other information that may be mentioned
    on ashleighboyd.com and treatthenurse.com. Reliance
    on any information provided by ashleighboyd.com and
    treatthenurse.com, Ashleigh Boyd LLC employees,
    contracted writers, or medical professionals presenting
    content for publication to Ashleigh Boyd is solely
    at your own risk. 

    The site may contain health- or medical-related
    materials or discussions regarding sexually explicit
    disease states. If you find these materials offensive,
    you may not want to use our Site. The Site and its
    Content are provided on an "as is" basis. 

    Links to educational content not created by Ashleigh
    Boyd are taken at your own risk. Ashleigh Boyd is not
    responsible for the claims of external websites and
    education companies. 

                            3. INTENSIVE STRUCTURE. 

    These intensives are accessed through the
    membership portal.Email and phone access
    is not applicable. 

                                4. TERMINATION. 

    Company is committed to providing all clients in the 
    Program with a positive Program experience. By 
    signing below, Client agrees that the Company may,
    at its sole discretion, terminate this Agreement and
    limit, suspend or terminate Client’s participation
    in the Program without refund or forgiveness of
    monthly payments if Client becomes disruptive or
    upon violation of the terms.  If Client decides to
    terminate this Agreement, no refunds will be issued. 

                                    5. PAYMENT. 

    Total price of this Program is as listed on the mobile
    app or website.  Client grants Company the authority to
    charge the card(s) provided on the applicable start
    date.If a payment is not received by the scheduled date, 
    Company reserves the right to suspend Services
    until payment is complete.  

                                    6. REFUNDS. 

    Client is responsible for full payment of fees for the
    entire Program, regardless of whether Client completes
    the Program. To further clarify, no refunds will 
    be issued. 

                                7. CONFIDENTIALITY. 

    This Agreement is considered a mutual non-disclosure 
    agreement.Both Parties agree not to disclose, reveal
    or make use of any information learned by either party
    during discussions, Or otherwise, throughout the Term
    of this Program (“Confidential Information”).
    Confidential Information includes, but is not
    limited to, information disclosed in connection 
    with this Agreement, and shall not include information
    rightfully obtained from a third party.  Both Parties shall
    keep all Confidential Information strictly confidential
    by using a reasonable degree of care, but not less than
    the degree of care used by it in safeguarding its own
    confidential information.  The obligation of the Parties
    hereunder to hold the information confidential does not 
    apply to information that is subsequently acquired by 
    either Party from a third party who has a bona fide
    right to make such information available without 
    restriction.  Both Parties agree that any and all
    Confidential Information learned as of the date of
    purchase shall survive the termination, revocation,
    or expiration of this Agreement. 

                        8. COMPELLED DISCLOSURE OF 
                        CONFIDENTIAL INFORMATION. 

    Notwithstanding anything in the foregoing, in the event
    that Client is required by law to disclose any of the 
    Confidential Information, Client will (i) provide
    Company with prompt notice of such requirement prior
    to the disclosure, and (ii) give Company all available
    information and assistance to enable Company to take 
    the measures appropriate to protect the Confidential
    Information from disclosure. 

                             9. NON-DISCLOSURE OF 
                                COMPANY MATERIALS. 

    Material given to Client in the course of Client’s
    work with the Company is proprietary, copyrighted 
    and developed specifically for Company. Client 
    agrees that such proprietary material is solely
    for Client’s own use. Any disclosure to a third
    party is strictly prohibited.   

    Company’s program and the original materials that
    have been provided to Client are for Client’s
    individual use only and are granted as a single-user
    license. Client is not authorized to use any of 
    Company’s intellectual property for Client’s 
    business purposes. All intellectual property,
    including Company’s copyrighted program and/or
    course materials, shall remain the sole property
    of the Company. No license to copy, sell or distribute
    Company’s materials is granted or implied.   

    Further, by signing below, Client agrees that
    if Client violates, or displays any likelihood oF
    violating, any of Client’s agreements contained in
    this paragraph, Company will be entitled to injunctive
    relief to prohibit any such violations and to protect
    against the harm of such violations. 

                        10. NON-DISPARAGEMENT.   

    Client shall not make any false, disparaging,
    or derogatory statement in public or private
    regarding Company, its employees, or agents.
    Company shall not make any false, disparaging,
    or derogatory statements in public or private
    regarding Client and its relationship with Company. 

    11. INDEMNIFICATION. 

    Client agrees to indemnify and hold harmless Company,
    its affiliates, and its respective officers, directors,
    agents, employees, and other independent contractors
    from any and all claims, demands, losses, causes of 
    action, damage, lawsuits, judgments, including
    attorneys’ fees and costs, arising out of, or
    relating to,Client’s participation or action(s)
    under this Agreement. Client agrees to defend 
    against any and all claims, demands, causes of
    action, lawsuits, and/or judgments arising out
    of, or relating to, the Client’s participation
    under this Agreement, unless expressly stated
    otherwise by Company, in writing. 

                        12. DISPUTE RESOLUTION. 

    If a dispute is not resolved first by good-faith
    negotiation between the Parties to this Agreement,
    every controversy or dispute to this Agreement will
    be submitted to binding arbitration.  The arbitration
    shall occur within ninety (90) days from the date of
    the initial arbitration demand and shall take place
    in St. Louis, MO.  The Parties shall cooperate in
    exchanging and expediting discovery as part of the
    arbitration process and shall cooperate with each
    other to ensure that the arbitration process is
    completed within the ninety (90) day period.
    The written decision of the arbitrators (which will
    provide for the payment of costs, including attorneys’
    fees) will be absolutely binding and conclusive and
    not subject to judicial review, and may be entered
    and enforced in any court of proper jurisdiction,
    either as a judgment of law or in equity, 
    as circumstances may indicate.   

                            13. GOVERNING LAW. 

    This Agreement shall be governed by and construed 
    in accordance with the laws of the State of Missouri,
    Untied States of America, regardless of the conflict
    of laws principles thereof. 

                            14. ENTIRE AGREEMENT; 
                            AMENDMENT; HEADINGS.   

    This Agreement constitutes the entire agreement
    between the Parties with respect to its relationship,
    and supersedes all prior oral or written agreements,
    understandings and representations to the extent
    that they relate in any way to the subject matter
    hereof. No amendment of, or any consent with respect
    to, any provision of this Agreement shall bind either
    party unless set forth in a writing, specifying such 
    waiver, consent, or amendment, signed by both parties.
    The headings of Sections in this Agreement are
    provided for convenience only and shall not affect its 
    construction or interpretation. 

                            15. COUNTERPARTS.   

    This Agreement may be executed in one or more
    counterparts (including by means of facsimile
    or electronic mail via portable document format),
    each of which shall be deemed an original but all of
    which together will constitute one and the same
    instrument. 

                                16. SEVERABILITY.   

    Should any provision of this Agreement be or become
    invalid, illegal, or unenforceable under applicable
    law, the other provisions of this Agreement shall 
    not be affected and shall remain in full force
    and effect. 

                                    17. WAIVER.   

    The waiver or failure of Company to exercise in any 
    respect any right provided for herein shall not be
    deemed a waiver of any further right hereunder. 

                                18. ASSIGNMENT. 

    This Agreement may not be assigned by either Party
    without express written consent of the other Party. 

                                19. FORCE MAJEURE. 

    In the event that any cause beyond the reasonable
    control of either Party, including without limitation
    acts of God, war, curtailment or interruption of
    transportation facilities, threats or acts of terrorism,
    State Department travel advisory, labor strike or
    civil disturbance, make it inadvisable, illegal, or 
    impossible, either because of unreasonable increased
    costs or risk of injury, for either Party to perform
    its obligations under this Agreement, the affected
    Party’s performance shall be extended without 
    liability for the period of delay or inability
    to perform due to such occurrence.  

                            20. CLIENT RESPONSIBILITY;
                                        GUARANTEES.   

                    There is no refund for non-participation. 

    21. I understand that this does not involve the
    diagnosis or treatment of mental disorders as defined
    by the American Psychiatric Association. I understand
    that coaching is not a substitute for counseling, 
    psychotherapy, psychoanalysis, mental health care or
    substance abuse treatment and I will not use it in 
    place of any form of diagnosis, treatment or therapy.
    `}</Apptext>
            </View>
        </ScrollView>
          <TouchableOpacity
          onPress={()  => {
              setPayment(false)
              setToggleCheckBox(true)
            }}
          style={styles.buttonContainer}>
          <Apptext style={styles.buttonText}>{"I Agree"}</Apptext>
      </TouchableOpacity>
      </View>
            </Modal>
        </ScrollView>
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    ImgView: {
        justifyContent: 'center', alignItems: 'center', marginTop: wp('22%')
    },
    SignInTxt: {
        fontFamily: "Poppins-Regular",
        marginTop: wp('10%'),
        fontSize: 24, color: DefaultStyles.colors.primary
    },
    methods: {
        justifyContent: 'center', alignItems: 'center',
        marginTop: wp('4%')
    },
    socialImgs: {
        flexDirection: 'row',
        marginTop: wp('5%'),
        justifyContent: 'space-evenly', marginHorizontal: wp('35%')
    },
    lightBoxTxt: {
        flexDirection: 'row',
        marginHorizontal: hp('3%'),
        marginTop: wp('5%'),
        justifyContent: 'center',

    },
    bottomLines: {
        alignSelf: 'center',
        marginTop: wp('20%'),
        marginBottom: wp('5%'),
        flexDirection: 'row'
    },
    bottomTxt: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",

    },
    lightTxt: {
        color: DefaultStyles.colors.primary,
        fontSize: wp('4%'),
        fontFamily: "Poppins-Regular",
        marginTop: 5
    },
    userTxt: {
        fontSize: wp('7%'),
        alignSelf: 'center',
        color: DefaultStyles.colors.primary,
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        marginBottom: wp('10%'),
        width: wp('90%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('14%'),
        backgroundColor: DefaultStyles.colors.primary,
        borderRadius: 15,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4%'),
        color: '#ffffff',
        fontFamily: 'Poppins-Regular'
    },
});