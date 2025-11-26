import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useUserDetailMutation } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';
// import LinearGradient from 'expo-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import LogoSvg from '../../components/svgs/logo';
import EcellSvg from '../../components/svgs/ecell';
import { useFlowStore } from '../../store/flow-store';
import { ADMIN_EMAIL, FLOW_STAGES } from '../../contants';
import { useUserDetailMutation } from '../../hooks/mutation/user-action-mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

export const Splash = () => {
  const setFlow = useFlowStore(state => state.setFlow);

  const setProfile = useProfileStore(state => state.setProfile);

  const toast = useToast()

  // const { mutateAsync: autoLogin } = useUserDetailMutation();

  // const AutoLogin = async () => {
  //   const email = await AsyncStorage.getItem('email');
  //   if (email !== null) {
  //     if (email == ADMIN_EMAIL) {
  //       setProfile({
  //         email: email,
  //         image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
  //         name: 'Admin User',
  //         pass: 'Not Purchased',
  //         isSignedIn: true,
  //         isAdmin: true,
  //       });
  //       setFlow(FLOW_STAGES.MAIN);
  //     } else {
  //       autoLogin({ email }).then(res => {
  //         if (res.success) {
  //           setProfile({
  //             email: email,
  //             image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
  //             name: res.data.isGuest ? 'Guest User' : res.data.user.name,
  //             pass: res.data.isGuest
  //               ? 'Not Purchased'
  //               : res.data.user.pass_name,
  //             isSignedIn: true,
  //           });
  //           setFlow(FLOW_STAGES.MAIN);
  //         } else {
  //           setFlow(FLOW_STAGES.AUTH);
  //         }
  //       });
  //     }
  //   } else {
  //     setFlow(FLOW_STAGES.AUTH);
  //   }
  // };

  const { mutateAsync: autoLogin } = useUserDetailMutation();

  const AutoLogin = async () => {
    const email = await AsyncStorage.getItem("Esummit24email");
    if (email !== null) {
      if (email == ADMIN_EMAIL) {
        setProfile({
          email: email,
          image: "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
          name: "Admin User",
          pass: "Not Purchased",
          isSignedIn: true,
          isAdmin: true,
        });
        setFlow(FLOW_STAGES.MAIN);
      } else {
        autoLogin({ email }).then((res) => {
          if (res.success) {
            if (res.data.isGuest) {
              setProfile({
                email: email,
                image: "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
                name: "Guest User",
                pass: "Not Purchased",
                isSignedIn: true,
                isGuest: true,
              });
              setFlow(FLOW_STAGES.MAIN);
              // toast.show("Signed In as a guest user!", { type: "success" });
            } else {
              let summitPassLevel;
              switch (res.data.user.summit_pass) {
                case 'lvl1':
                  summitPassLevel = 'Silver';
                  break;
                case 'lvl2':
                  summitPassLevel = 'Gold';
                  break;
                case 'lvl3':
                  summitPassLevel = 'Platinum';
                  break;
                default:
                  summitPassLevel = 'Unknown';
              }
              if (res.data.user.isadmin) {
                setProfile({
                  email: res.data.user.email,
                  image:
                    "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
                  name: res.data.user.firstName + " " + res.data.user.lastName,
                  pass: summitPassLevel,
                  isSignedIn: true,
                  isAdmin: true,
                  isGuest: false
                });
                // toast.show("Signed In as Admin", { type: "success" });
                if (res.profileBuilt) {
                  setFlow(FLOW_STAGES.MAIN);
                } else {
                  setFlow(FLOW_STAGES.PROFILE);
                }
              } else {
                let summitPassLevel;
                switch (res.data.user.summit_pass) {
                  case 'lvl1':
                    summitPassLevel = 'Silver';
                    break;
                  case 'lvl2':
                    summitPassLevel = 'Gold';
                    break;
                  case 'lvl3':
                    summitPassLevel = 'Platinum';
                    break;
                  default:
                    summitPassLevel = 'Unknown';
                }
                setProfile({
                  email: res.data.user.email,
                  image:
                    "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
                  name: res.data.user.firstName + " " + res.data.user.lastName,
                  pass: summitPassLevel,
                  isSignedIn: true,
                });
                // toast.show("OTP verified successfully", { type: "success" });
                if (res.profileBuilt) {
                  setFlow(FLOW_STAGES.MAIN);
                } else {
                  setFlow(FLOW_STAGES.PROFILE);
                }
              }
            }
          } else {
            setFlow(FLOW_STAGES.AUTH);
          }
        });
      }
    } else {
      setFlow(FLOW_STAGES.AUTH);
    }
  };

  useEffect(() => {
    AutoLogin();
  }, []);

  // const AutoLogin = async () => {
  //   setFlow(FLOW_STAGES.AUTH)
  // }

  // useEffect(() => {
  //   AutoLogin();
  // }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logowhite.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.section}>
        <Text style={styles.text}>from</Text>
        <EcellSvg width={85.6} height={90} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111'
  },
  section: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 28,
  },
  text: {
    color: '#FFFFFF',
    // fontFamily: 'Poppins',
    fontSize: 20,
    lineHeight: 24,
    textTransform: 'lowercase',
  },
  logo: {
    width: 275,
    height: 125,
  },
});
