import { useNavigation } from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
  ImageBackground,
} from 'react-native';
import { ScrollView } from 'react-native';
import { Divider, List, Modal, Portal, Button } from 'react-native-paper';
import {
  Contact,
  Faq,
  Follow,
} from '../../components/others';
import { Footer, Navbar } from '../../components/shared';
import CrossSvg from '../../components/svgs/cross';
import { useSchedule } from '../../hooks/query/other-query';
import { FLOW_STAGES } from '../../contants';
import { useFlowStore } from '../../store/flow-store';
import { PRODUCTION_BASE_URL } from '../../api/base';


export const More = () => {
  const [visible, setVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = React.useState(false);
  const [source, setSource] = React.useState('');

  const { data: Others, isLoading, refetch } = useSchedule();

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const showDeleteModal = () => setDeleteVisible(true);
  const hideDeleteModal = () => setDeleteVisible(false);

  const navigation = useNavigation();

  const setFlow = useFlowStore(state => state.setFlow);



  const handleDeleteAccount = async () => {
    try {
      const email = await AsyncStorage.getItem('Esummit24email'); // Ensure you retrieve the email
      if (email) {
        await fetch(`${PRODUCTION_BASE_URL}/delete-profile/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        // await AsyncStorage.removeItem('Esummit24email');
        // hideDeleteModal();
        handleLogout();
      } else {
        console.error('Email not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/homeBg.png')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Navbar navigation={navigation} />
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Portal>
              {/* Modal for PDFs */}
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}
              >
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-end',
                    marginVertical: 15,
                  }}
                  onPress={hideModal}
                >
                  <CrossSvg />
                </TouchableOpacity>
              </Modal>

              {/* Modal for Delete Account Confirmation */}
              <Modal
                visible={deleteVisible}
                onDismiss={hideDeleteModal}
                contentContainerStyle={styles.deleteContainerStyle}
              >
                <Text style={styles.modalTitle}>Delete Account</Text>
                <Text style={styles.modalMessage}>
                  This action will delete your account, and you will lose all data associated with 21st E-Summit.
                </Text>
                <View style={styles.modalActions}>
                  <Button
                    mode="outlined"
                    onPress={hideDeleteModal}
                    style={styles.noButton}
                    labelStyle={styles.buttonText}
                  >
                    No
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleDeleteAccount}
                    style={styles.yesButton}
                    labelStyle={styles.buttonText}
                  >
                    Yes
                  </Button>
                </View>
              </Modal>


            </Portal>

            <Faq />

            <Divider style={styles.divider} />
            <Contact />
            <Divider style={styles.divider} />

            <View style={styles.content1}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 16,
                }}
                onPress={() => Linking.openURL('https://ecell.in/')}
              >
                <Text style={styles.follow}>ABOUT E-CELL</Text>
                <List.Icon icon="chevron-right" color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Divider style={styles.divider} />

            {/* New Delete Account Button */}
            <View style={styles.content1}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 16,
                }}
                onPress={showDeleteModal}
              >
                <Text style={styles.follow}>DELETE ACCOUNT</Text>
                <List.Icon icon="chevron-right" color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Divider style={styles.divider} />

            {Others === undefined || Others === null ? (
              <></>
            ) : (
              Others?.data.map((item, index) => (
                <View style={styles.content1} key={index}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 16,
                    }}
                    onPress={() => Linking.openURL(item.link)}
                  >
                    <Text style={styles.follow}>{item.name}</Text>
                    <List.Icon icon="chevron-right" color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))
            )}


            <Follow />
          </ScrollView>
        </View>
        <Footer navigation={navigation} />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  content1: {},
  follow: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
    fontSize: 16,
    lineHeight: 18,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'hsla(0, 0.00%, 100.00%, 0.05)',
  },
  containerStyle: {
    backgroundColor: 'hsla(0, 0.00%, 0.00%, 0.9)',
    borderWidth: 0.5,
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.1)',
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignSelf: 'center',
    borderRadius: 15,
    height:
      Dimensions.get('window').height > Dimensions.get('window').width
        ? '75%'
        : '80%',
    width: '90%',
  },
  deleteContainerStyle: {
    backgroundColor: 'hsla(0, 0.00%, 0.00%, 0.9)',
    borderWidth: 0.5,
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.1)',
    padding: 20,
    borderRadius: 15,
    alignSelf: 'center',
    width: '90%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
    fontSize: 20,
    marginBottom: 10,
  },
  modalMessage: {
    color: '#CCCCCC',
    fontFamily: 'Proxima',
    fontSize: 14,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noButton: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    width: '45%',
  },
  yesButton: {
    backgroundColor: '#FF4D4D',
    width: '45%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
  },

});
