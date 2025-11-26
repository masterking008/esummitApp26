import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Divider, List, Modal, Portal, ActivityIndicator } from 'react-native-paper';
import { ProfileSection } from '../../components/profile';
import { Navbar } from '../../components/shared';
import { useProfileStore } from '../../store/profile-store';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import CrossSvg from '../../components/svgs/cross';
import QRCode from 'react-native-qrcode-svg';
import { FLOW_STAGES } from '../../contants';
import { useFlowStore } from '../../store/flow-store';

export const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showLogoutModal = () => setLogoutVisible(true);
  const hideLogoutModal = () => setLogoutVisible(false);

  const name = useProfileStore(state => state.name);
  const email = useProfileStore(state => state.email);
  const image = useProfileStore(state => state.image);
  const pass = useProfileStore(state => state.pass);
  const qrcode = useProfileStore(state => state.qrcode);
  const setFlow = useFlowStore(state => state.setFlow);
  const isAdmin = useProfileStore(state => state.isAdmin);
  const reset = useProfileStore(state => state.reset);

  const isguest = useProfileStore(state => state.isGuest)

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      setFlow(FLOW_STAGES.AUTH);
      reset();
      await AsyncStorage.removeItem('Esummit24email');
      hideLogoutModal();
      navigation.navigate('SignIn' as never);
    } catch (error) {
      console.error('Logout error:', error);
      hideLogoutModal();
    }
  };

  return (
    <ImageBackground
    // source={{ uri: 'https://res.cloudinary.com/dcqw5mziu/image/upload/v1737490960/profileBg_d5g0le.png' }}

      source={require('../../assets/images/profileBg.png')} // Replace with your image path
      style={StyleSheet.absoluteFill}
      resizeMode="cover" // Adjust the image scaling ('cover', 'contain', or 'stretch')
    >
      <View
        //   useAngle
        //   angle={-128.06}
        style={styles.container}>
        <Navbar navigation={navigation} />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.qrModalStyle}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={hideModal}>
              <CrossSvg />
            </TouchableOpacity>
            
            <View style={styles.qrContainer}>
              {qrcode ? (
                <>
                  <ActivityIndicator
                    animating={true}
                    color="#FFE100"
                    size="large"
                    style={{ marginBottom: 20 }}
                  />
                  <Image source={{ uri: qrcode }} style={styles.qrImage} />
                </>
              ) : (
                <>
                  <ActivityIndicator
                    animating={true}
                    color="#FFE100"
                    size="large"
                    style={{ marginBottom: 20 }}
                  />
                  <View style={styles.qrCodeWrapper}>
                    <QRCode value={email} size={180} />
                  </View>
                </>
              )}
            </View>

            <Text style={styles.qrText}>
              Scan this QR code at the registration desk to get your pass.
            </Text>
          </Modal>

          <Modal
            visible={logoutVisible}
            onDismiss={hideLogoutModal}
            contentContainerStyle={styles.logoutModalStyle}
          >
            <Text style={styles.modalTitle}>LOGOUT</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalActions}>
              <Button
                mode="outlined"
                onPress={hideLogoutModal}
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonText}
              >
                CANCEL
              </Button>
              <Button
                mode="contained"
                onPress={handleLogout}
                style={styles.logoutButton}
                labelStyle={styles.logoutButtonText}
              >
                LOGOUT
              </Button>
            </View>
          </Modal>
        </Portal>

        <ProfileSection name={name} email={email} image={image as string} />

        <View style={styles.passContainer}>
          <View style={styles.passContent}>
            <Text style={styles.boldSmallText}>Pass : </Text>
            {pass === null || pass === undefined || pass === 'unknown' || pass === 'none' ? (
              <Text style={styles.boldSmallText}>Not Purchased</Text>
            ) : (
              <Text style={styles.boldSmallText}>{pass}</Text>
            )}
          </View>
        </View>

        {/* {isguest? (
        <>
        <TouchableOpacity onPress={() => {navigation.navigate('EditProfile' as never)}}>
        <View style={styles.section}>
          <Text style={styles.text}>Register Now</Text>
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />
      </>
      ) : (
        <>
        <TouchableOpacity onPress={() => {navigation.navigate('EditProfile' as never)}}>
        <View style={styles.section}>
          <Text style={styles.text}>Edit Your Profile</Text>
        </View>
        <List.Icon icon="chevron-right" color="#FFF" />
      </TouchableOpacity>
      <Divider style={styles.divider} />
      </>
      )} */}

        {pass === null || pass === undefined || pass === 'unknown' || pass === 'none' || isguest ? (
          <View style={styles.getPassContainer}>
            <TouchableOpacity
              style={styles.getPassButton}
              onPress={() => Linking.openURL('https://ecell.in/esummit/pass')}
            >
              <Image
                source={require('../../assets/images/gold.png')}
                style={styles.passIcon}
              />
              <Text style={styles.getPassText}>Get Pass</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* <Text style={styles.title}>More</Text> */}

        {isguest ? (
          <>
            <TouchableOpacity onPress={() => Linking.openURL('https://ecell.in/esummit/register/')}>
              <View style={[styles.section, { justifyContent: 'space-between' }]}>
                <Text style={styles.text}>Register Now </Text>
                <List.Icon icon="chevron-right" color="#FFF" />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => { navigation.navigate('EditProfile' as never) }}>
              <View style={[styles.section, { justifyContent: 'space-between' }]}>
                <Text style={styles.text}>Edit Your Profile </Text>
                <List.Icon icon="chevron-right" color="#FFF" />
              </View>
            </TouchableOpacity>
          </>
        )}


        {/* <TouchableOpacity
        onPress={() => navigation.navigate('TimeTable' as never)}>
        <View style={[styles.section, { justifyContent: 'space-between' }]}>
          <Text style={styles.text}>My Schedule </Text>
          <List.Icon icon="chevron-right" color="#FFF" />
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} /> */}

        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}>
          <View style={styles.section}>
            <Text style={styles.text}>Show QR Code </Text>
            <Icon
              name="qr-code"
              size={24}
              style={{ paddingRight: 10 }}
              color="#FFF"
            />
          </View>
        </TouchableOpacity>

        {isAdmin ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('QRCode' as never)}>
              <View style={styles.section}>
                <Icon
                  name="qr-code"
                  size={20}
                  style={{ paddingRight: 10 }}
                  color="#900"
                />
                <Text style={styles.text}>Scan QR Code </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : null}

        <Button
          onPress={showLogoutModal}
          mode={'outlined'}
          textColor={'#FFFFFF'}
          style={styles.logout}>
          <Image
            source={require('../../assets/images/logout.png')}
            style={styles.icon}
          />
          <Text style={[styles.boldSmallText, { textAlign: 'center' }]}> LOGOUT</Text>
        </Button>
      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // backgroundColor: "#05020E",
    paddingTop: 60,
  },
  section: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.05)',
    marginHorizontal: 50,
    marginVertical: 5,
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.02)", // Semi-transparent background
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getPassContainer: {
    width: '100%',
    alignItems: 'center',
    // marginVertical: 5,
    marginBottom: 20,
  },
  getPassButton: {
    backgroundColor: '#05020E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#E5BE52',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  passIcon: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  getPassText: {
    color: '#E5BE52',
    fontFamily: 'ProximaBold',
    fontSize: 14,
  },
  passContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontFamily: 'ProximaBold',
    fontSize: 28,
    color: "#FFFFFF",
    paddingHorizontal: 65,
  },
  text: {
    fontSize: 18,
    fontFamily: 'ProximaBold',
    lineHeight: 22,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  boldSmallText: {
    fontSize: 18,
    fontFamily: 'ProximaBold',
    // fontWeight: 'bold',
    lineHeight: 22,
    color: '#FFFFFF',
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'ProximaBold',
    // fontWeight: 'bold',
    lineHeight: 22,
    color: '#FFFFFF',
  },
  icon: {
    height: 20,
    width: 20,
  },
  logout: {
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.05)", // Semi-transparent background
    width: 200,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 50,
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.1)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 1,
  },
  qrModalStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrCodeWrapper: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalBack: {
    backgroundColor: '#BBD4E2',
    position: 'absolute',
    right: 20,
    top: 0,
  },
  qrImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
  },
  qrText: {
    fontSize: 18,
    fontFamily: 'Proxima',
    lineHeight: 22,
    color: '#FFFFFF',
    padding: 10,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3D3C3C',
  },
  logoutModalStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    marginHorizontal: 30,
    borderRadius: 15,
    padding: 25,
    borderWidth: 1,
    // borderColor: 'rgba(255, 77, 77, 0.3)',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalMessage: {
    color: '#CCCCCC',
    fontFamily: 'Proxima',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    flex: 1,
    marginLeft: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
    fontSize: 14,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
    fontSize: 14,
  },
});
