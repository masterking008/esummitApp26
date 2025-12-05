import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import { ButtonBox as Button } from './Button';
import { FLOW_STAGES } from '../../contants';
import { useVerifyOtpMutation } from '../../hooks/mutation/user-action-mutation';
import { useFlowStore } from '../../store/flow-store';
import { useProfileStore } from '../../store/profile-store';

interface OtpBoxProps {
  length: number;
  handleResend: any;
}

export const OtpBox = (props: OtpBoxProps) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: props.length });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const setProfile = useProfileStore((state) => state.setProfile);
  const setProfileBuilt = useProfileStore((state) => state.setProfileBuilt);
  const toast = useToast();
  const navigation = useNavigation();
  const { mutateAsync: verifyOtpData } = useVerifyOtpMutation();
  const email = useProfileStore((state) => state.email);
  const setFlow = useFlowStore((state) => state.setFlow);

  const [isValid, setValid] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
     clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    let resendInterval: NodeJS.Timeout;
    if (resendTimer > 0) {
      resendInterval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(resendInterval);
  }, [resendTimer]);

  const handleVerify = async () => {
    if (!value || value.trim() === '') {
      toast.show('Please enter OTP', { type: 'danger' });
      return;
    }
    
    console.log('handleVerify called'); // Debug log
    setButtonDisabled(true); // Disable the button
    setTimer(15); // Start the 15-second timer

    try {
      console.log('Sending OTP verification with:', { email, value }); // Debug log
      await verifyOtpData({ email, value }).then(async (res) => {
        console.log('Response received:', res); // Debug log

        if (!res.success) {
          console.log('Verification failed:', res.data.error);
          toast.show(res.data.error, { type: 'danger' });
        } else {
          console.log('Verification succeeded:', res.data);
          await AsyncStorage.setItem('Esummit24email', email);
          // console.log('Email stored in AsyncStorage:', email);

          if (res.data.isGuest) {
            setProfile({
              email: email,
              image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
              name: 'Guest User',
              pass: 'none',
              isSignedIn: true,
              isGuest: true,
            });
            setFlow(FLOW_STAGES.PROFILE);
            toast.show('Signed In as a guest user!', { type: 'success' });
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
              case 'lvl4':
                summitPassLevel = 'Signature';
                break;
              case 'none':
                summitPassLevel = 'none';
                break;
              default:
                summitPassLevel = 'Unknown';
            }

            setProfileBuilt(res.profileBuilt);
            
            if (res.data.user.isadmin) {
              console.log('Admin user detected');
              setProfile({
                email: res.data.user.email,
                image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
                name: `${res.data.user.firstName} ${res.data.user.lastName}`,
                pass: summitPassLevel,
                isSignedIn: true,
                isAdmin: true,
              });
              toast.show('Signed In as Admin', { type: 'success' });
            } else {
              setProfile({
                email: res.data.user.email,
                image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
                name: `${res.data.user.firstName} ${res.data.user.lastName}`,
                pass: summitPassLevel,
                isSignedIn: true,
              });
              toast.show('OTP verified successfully', { type: 'success' });
            }

            if (res.profileBuilt) {
              setFlow(FLOW_STAGES.MAIN);
              setTimeout(() => navigation.navigate('Home' as never), 100);
            } else {
              setFlow(FLOW_STAGES.PROFILE);
              setTimeout(() => navigation.navigate('BuildProfile' as never), 100);
            }
          }
        }
      });
    } catch (error) {
      console.error('Error in handleVerify:', error);
    } finally {
      // Re-enable the button after 15 seconds
      setTimeout(() => {
        setButtonDisabled(false);
      }, 15000);
    }
  };

  const handleTextChange = (text) => {
    if (text.length === props.length) {
      setValid(true);
    } else {
      setValid(false);
    }
    setValue(text);
  };

  return (
    <>
      <View style={styles.container}>
        <CodeField
          ref={ref}
          value={value}
          onChangeText={handleTextChange}
          cellCount={props.length}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View>
        <TouchableOpacity 
          onPress={() => {
            if (canResend) {
              setCanResend(false);
              setResendTimer(30);
              props.handleResend();
            }
          }}
          disabled={!canResend}
        >
          <Text style={[styles.resend, { opacity: canResend ? 1 : 0.5 }]}>
            {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
          </Text>
        </TouchableOpacity>
        <Button
          title={timer > 0 ? `Wait ${timer}s` : 'Verify and Continue'}
          isDisabled={!isValid || isButtonDisabled}
          onPress={handleVerify}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  codeFiledRoot: { marginTop: 20 },
  cell: {
    backgroundColor: '#1F2122',
    width: 54,
    height: 71,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 30,
    lineHeight: 37,
    color: '#FFFFFF',
    marginHorizontal: 17,
    paddingTop: 15,
  },
  resend: {
    fontSize: 15,
    lineHeight: 18,
    color: '#FFE100',
    textAlign: 'right',
    paddingRight: 10,
    paddingTop: 10,
  },
});
