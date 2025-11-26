import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useProfileStore } from '../../store/profile-store';
import QRCode from 'react-native-qrcode-svg';
import { Footer } from '../../components/shared';

export const ShowQr = () => {
  const email = useProfileStore(state => state.email);
  const qrcode = useProfileStore(state => state.qrcode);
  const navigation = useNavigation();

  return (
    // <ImageBackground
    //   style={StyleSheet.absoluteFill}
    //   resizeMode="cover"
    // >
      <View style={styles.container}>
        <View style={styles.qrContainer}>
          <Text style={styles.title}>QR CODE</Text>
          
          <View style={styles.qrWrapper}>
            {qrcode ? (
              <>
                <ActivityIndicator
                  animating={true}
                  color="#FFE100"
                  size="large"
                  style={styles.loader}
                />
                <Image source={{ uri: qrcode }} style={styles.qrImage} />
              </>
            ) : (
              <>
                <ActivityIndicator
                  animating={true}
                  color="#FFE100"
                  size="large"
                  style={styles.loader}
                />
                <View style={styles.qrCodeWrapper}>
                  <QRCode value={email} size={200} />
                </View>
              </>
            )}
          </View>

          <Text style={styles.qrText}>
            Scan this QR code at the registration desk to get your pass.
          </Text>
        </View>

        <Footer navigation={navigation} />
      </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    // paddingTop: 60,
  },
  qrContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'ProximaBold',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  qrWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 30,
  },
  loader: {
    marginBottom: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrCodeWrapper: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
  },
  qrText: {
    fontSize: 16,
    fontFamily: 'Proxima',
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});
