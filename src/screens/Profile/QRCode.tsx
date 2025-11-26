import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Modal, Portal, RadioButton } from 'react-native-paper';
import { runOnJS } from 'react-native-reanimated';
// import {
//   useCameraDevices,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import { useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
// import { Camera } from 'react-native-vision-camera';
import { Camera, CameraType } from 'expo-camera';
// import {
//   scanBarcodes,
//   BarcodeFormat,
//   Barcode,
// } from 'vision-camera-code-scanner';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { AccomodationResult, EventAttendance, ScanResult } from '../../components/profile';
import { Validator } from '../../contants';
import { useEventByName } from '../../hooks/query/events-query';

export const QRCode = () => {
  const { data: EventName, isLoading } = useEventByName();
  const [permission, requestPermission] = useCameraPermissions();
  const [event, setEvent] = useState('Entry Attendance');

  const [visible, setVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);
  const [lastScannedCode, setLastScannedCode] = useState<string>();

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const [attendee, setAttendee] = useState<string>();

  const handleScan = ({ type, data }: { type: string; data: string }) => {
    if (scanned || data === lastScannedCode) return;
    setScanned(true);
    setActionCompleted(false);
    setLastScannedCode(data);
    setAttendee(data);
  };

  const onClose = async () => {
    setActionCompleted(true);
  };

  const onReset = () => {
    resetScanner();
  };

  const resetScanner = () => {
    setAttendee(undefined);
    setScanned(false);
    setActionCompleted(false);
    setLastScannedCode(undefined);
  };

  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
  //     checkInverted: true,
  //   });
  //   runOnJS(handleScan)(detectedBarcodes);
  // }, []);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Task</Text>
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <RadioButton.Group
              onValueChange={newValue => setEvent(newValue)}
              value={event}>
              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => setEvent('Entry Attendance')}>
                <RadioButton value={'Entry Attendance'} />
                <Text style={styles.radioText}>Entry Attendance</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => setEvent('Accomodation')}>
                <RadioButton value={'Accomodation'} />
                <Text style={styles.radioText}>Accommodation</Text>
              </TouchableOpacity>
              {EventName?.data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.radioItem}
                  onPress={() => setEvent(item.name)}>
                  <RadioButton value={item.name} />
                  <Text style={styles.radioText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
          </ScrollView>
          <View style={styles.modalActions}>
            <Button mode="contained" onPress={hideModal}>
              Done
            </Button>
          </View>
        </Modal>
      </Portal>
      <View
        style={[
          styles.section,
          {
            height: 300,
            backgroundColor: 'black',
          },
        ]}>
        {permission?.granted && (
          <>
            <CameraView
              style={StyleSheet.absoluteFillObject}
              onBarcodeScanned={scanned ? undefined : handleScan}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
            />
            <Text style={styles.barcodeTextURL}>{attendee}</Text>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Button
          mode="contained"
          onPress={showModal}
          style={styles.taskButton}
          labelStyle={styles.taskButtonText}
          icon="format-list-bulleted">
          {event}
        </Button>
      </View>

      
      <View style={styles.section}>
        <Text style={{ color: 'white', fontSize: 20 }}>Status</Text>
        {attendee &&
        Validator.email.test(attendee) &&
        event === 'Entry Attendance' ? (
          <ScanResult key={attendee} email={attendee} close={onClose} />
        ) : (
          <Text style={{ color: 'red', fontSize: 25, textAlign: 'center' }}>
            Please Scan the QR Code
          </Text>
        )}

        {attendee &&
        Validator.email.test(attendee) &&
        event === 'Accomodation' ? (
          <AccomodationResult key={attendee} email={attendee} close={onClose} />
        ) : null}

        {attendee &&
        Validator.email.test(attendee) &&
        event !== 'Entry Attendance' && event !== 'Accomodation' ? (
          <EventAttendance key={`${attendee}-${event}`} email={attendee} event={event} close={onReset} />
        ) : null}
      </View>
      </ScrollView>
                  {(scanned || actionCompleted) && (
        <View style={styles.section}>
          <Button
            mode="contained"
            onPress={resetScanner}
            style={styles.scanAgainButton}
            icon="qrcode-scan">
            Scan Again
          </Button>
        </View>
      )}
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  scrollContent: {
    flexGrow: 1,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalContent: {
    maxHeight: 400,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
  },
  modalActions: {
    marginTop: 15,
    alignItems: 'center',
  },
  taskButton: {
    backgroundColor: '#2196F3',
  },
  scanAgainButton: {
    backgroundColor: '#4CAF50',
  },
});
