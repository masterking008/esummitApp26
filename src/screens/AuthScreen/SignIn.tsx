import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";
import { TextInput } from "../../components/form";
import Logo from "../../components/svgs/logo";
import { ADMIN_EMAIL, FLOW_STAGES, Validator } from "../../contants";
import {
  useCreateOtpMutation,
  useUserDetailMutation,
} from "../../hooks/mutation/user-action-mutation";
import { useFlowStore } from "../../store/flow-store";
import { useProfileStore } from "../../store/profile-store";
import AsyncStorage from "@react-native-async-storage/async-storage";


const TIMEOUT = 60 * 5;

export const SignInScreen = () => {
  const email = useProfileStore((state) => state.email);
  const setEmail = useProfileStore((state) => state.setEmail);
  const name = useProfileStore((state) => state.name);



  const toast = useToast();

  const { mutateAsync: CreateOtp } = useCreateOtpMutation();

  const navigation = useNavigation();

  const setProfile = useProfileStore((state) => state.setProfile);

  const setFlow = useFlowStore((state) => state.setFlow);

  const handleSubmit = () => {
    if (email.toLowerCase() == ADMIN_EMAIL) {
      setProfile({
        email: email,
        image: "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
        name: "Admin User",
        pass: "none",
        isSignedIn: true,
        isAdmin: true,
      });
      setFlow(FLOW_STAGES.MAIN);
      return;
    } else {
      CreateOtp({ email }).then((data) => {
        console.log(data)
        if (data.success) {
          toast.show("OTP sent to your email", { type: "success" });
          navigation.navigate("Otp" as never);
        } else {
          toast.show("Some error has occured. Try again later", {
            type: "danger",
          });
        }
      });
    }
  };

  // useEffect(() => {
  //   if(AsyncStorage.getItem('Esummit24email') != null || AsyncStorage.getItem('Esummit24email') != undefined){
  //     setFlow(FLOW_STAGES.MAIN)
  //     navigation.navigate('Home' as never)
  //   }
  // })

  // const handleSubmit = () => {
  //   setFlow(FLOW_STAGES.MAIN)
  // }

  return (
    // <ScrollView>
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FED606" /> */}
      <LinearGradient
        colors={['#FED606', '#161616']}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0, 0.7]}
        style={styles.header}
      >
        <View>
          {/* <Logo width={574} height={120} /> */}
          <Image
            source={require('../../assets/images/logowhite.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.subheading}>Enter your E-mail ID to proceed</Text>

        <TextInput
          label="Email Id"
          value={email}
          onChangeText={setEmail}
          validator={Validator.email}
          onSubmit={handleSubmit}
        />

      </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
  },
  header: {
    height: Dimensions.get('window').height * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight || 50,
  },
  section: {
    padding: 20,
    backgroundColor: '#161616',
    flex: 1,
  },
  heading: {
    fontFamily: 'ProximaBold',
    fontSize: 23,
    lineHeight: 28,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  subheading: {
    fontFamily: 'Proxima',
    fontSize: 14,
    lineHeight: 17,
    color: '#A2A2A2',
    marginBottom: 20,
  },
  logo: {
    width: 275,
    height: 125,
  },
});
