import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { TransitionSpecs } from '@react-navigation/stack';
import { Otp, SignIn } from '../screens/AuthScreen';
import { HomePage } from '../screens/Home';
import { Maps } from '../screens/Map';
import { Profile, QRCode } from '../screens/Profile';
import { More, Sponsors } from '../screens/Other';
import { Event } from '../screens/Event';
import { useNavigation } from '@react-navigation/native';
import { Navbar } from '../components/shared';
import { SplashPage } from '../screens/Splash';
import { useFlowStore } from '../store/flow-store';
import { FLOW_STAGES } from '../contants';
import { useProfileStore } from '../store/profile-store';
import { OTPScreen } from '../screens/AuthScreen/OTP';
import { ConnectMain, YourConnect } from '../screens/Connect';
import { BuildProfileScreen, EditProfile, InvestorProfile, MentorProfile, ProfessionalProfile, StartupProfile, StudentProfile } from '../screens/ProfileBuild';
import { Agenda } from '../screens/Agenda';
import { Connect } from '../screens/Connect';
import { ShowQr } from '../screens/ShowQr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications'
import { useStoreToken } from '../hooks/mutation/user-action-mutation';
import { RegisterScreen } from '../screens/AuthScreen/Register';

const Stack = createStackNavigator();

export default function AppScreen() {
  const navigation = useNavigation();
  const flow = useFlowStore(state => state.flow);
  const setFlow = useFlowStore(state => state.setFlow)
  const isAdmin = useProfileStore(state => state.isAdmin);
  const email = useProfileStore(state => state.email)

  const { mutateAsync: storeToken } = useStoreToken();

  async function getPushToken() {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("expo token:", token);
    storeToken({ expotoken: token, email: email }).then(data => {
      if (data.success) {
        console.log('Token Stored')
      } else {
        console.log('Some error occured')
      }
    });
  }

  useEffect(() => {
    getPushToken()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        header: () => <Navbar navigation={navigation} />,
      }}>
      {flow == FLOW_STAGES.SPLASH ? (
        <Stack.Screen
          name="Splash"
          component={SplashPage}
          options={{
            headerShown: false,
          }}
        />
      ) : flow == FLOW_STAGES.AUTH ? (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : flow == FLOW_STAGES.MAIN ? (
        <>
          <Stack.Screen name="Home" component={HomePage}/>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen name="Map" component={Maps} />
          <Stack.Screen name="More" component={More} />
          <Stack.Screen name="Event" component={Event} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Sponsors" component={Sponsors} />
          <Stack.Screen name="Agenda" component={Agenda} />
          <Stack.Screen name="ConnectMain" component={ConnectMain} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="SingleConnect" component={Connect} />
          <Stack.Screen name="YourConnect" component={YourConnect} />
          <Stack.Screen name="ShowQr" component={ShowQr} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          {/* <Stack.Screen name="TimeTable" component={TimeTable} /> */}
        </>
      ) : (
        <>
          <Stack.Screen name="Connect" component={BuildProfileScreen} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="StartupProfile" component={StartupProfile} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="StudentProfile" component={StudentProfile} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfile} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="MentorProfile" component={MentorProfile} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="InvestorProfile" component={InvestorProfile} options={{
            headerShown: false,
          }} />
        </>
      )}

      {isAdmin && <Stack.Screen name="QRCode" component={QRCode} options={{
            headerShown: false,
          }}/>}
    </Stack.Navigator>
  );
}
