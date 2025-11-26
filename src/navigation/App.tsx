import React, { useEffect } from 'react';
import { NativeViewGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler'; 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, SafeAreaView } from 'react-native';
import AppScreen from './Screen';
// import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from 'react-native-toast-notifications';
import 'react-native-gesture-handler';

const queryClient = new QueryClient();

export default function AppNavigation() {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  // useEffect(() => {
  //   SplashScreen.hide()
  // }, []);

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider
          placement={'top'}
          duration={2000}
          textStyle={{
            // fontFamily: 'Poppins',
            fontSize: 12,
            color: '#fff',
          }}
          animationType={'slide-in'}
          successColor={'#00812F'}
          dangerColor={'#D10000'}>
          <NavigationContainer>
            {/* <GestureHandlerRootView> */}
            <SafeAreaProvider>
              <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
              <StatusBar barStyle={'light-content'} backgroundColor="#05020E" />
              {/* <StatusBar barStyle={'light-content'} backgroundColor="#141415" hidden /> */}
              <AppScreen />
              </SafeAreaView>
            {/* <SafeAreaView> */}
            {/* </SafeAreaView> */}
            </SafeAreaProvider>
            {/* </GestureHandlerRootView> */}
          </NavigationContainer>
        </ToastProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
