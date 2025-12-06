import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { AccomodationResult } from '../../components/profile';
import { Validator } from '../../contants';

export const AccoQRCode = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);
  const [lastScannedCode, setLastScannedCode] = useState<string>();
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

  const resetScanner = () => {
    setAttendee(undefined);
    setScanned(false);
    setActionCompleted(false);
    setLastScannedCode(undefined);
  };

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { height: 300, backgroundColor: 'black' }]}>
          {permission?.granted && (
            <>
              <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleScan}
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              />
              <Text style={styles.barcodeTextURL}>{attendee}</Text>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={{ color: 'white', fontSize: 20 }}>Accommodation Status</Text>
          {attendee && Validator.email.test(attendee) ? (
            <AccomodationResult key={attendee} email={attendee} close={onClose} />
          ) : (
            <Text style={{ color: 'red', fontSize: 25, textAlign: 'center' }}>
              Please Scan the QR Code
            </Text>
          )}
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
  scanAgainButton: {
    backgroundColor: '#4CAF50',
  },
});
