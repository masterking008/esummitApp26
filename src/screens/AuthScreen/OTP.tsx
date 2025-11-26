import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useToast } from 'react-native-toast-notifications';
import { OtpBox } from '../../components/form';
import Logo from '../../components/svgs/logo';
import { useCreateOtpMutation } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';


const TIMEOUT = 60 * 5;

export const OTPScreen = () => {
  const [timer, setTimer] = useState(TIMEOUT);
  const email = useProfileStore(state => state.email);


  const { mutateAsync: CreateOtp } = useCreateOtpMutation();

  const toast = useToast();

  const handleResend = () => {
    setTimer(TIMEOUT);
    CreateOtp({ email }).then(data => {
      console.log(data);
      if (data.success) {
        toast.show('OTP has been resent to your email', { type: 'success' });
      } else {
        toast.show('Some error has occured. Try again later', {
          type: 'danger',
        });

      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
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
            <Image
              source={require('../../assets/images/logowhite.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.heading}>VERIFY OTP</Text>
          {/* <Text style={styles.subheading}>OTP sent to</Text> */}

          {timer > 0 ? (
            <Text style={styles.subheading}>
              This OTP will expire in {timer} seconds
            </Text>
          ) : (
            <Text style={styles.subheading}>
              The OTP is expired. Please request a Resend OTP
            </Text>
          )}

          <Text style={styles.subheading2}>Enter OTP</Text>

          <OtpBox length={4}
            handleResend={handleResend}
          />
        </View>
    </View>
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
    color: '#FED606',
    marginBottom: 20,
  },
  subheading2: {
    fontFamily: 'Proxima',
    fontSize: 14,
    lineHeight: 17,
    color: '#FED606',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 275,
    height: 125,
  },
});
