import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useProfileStore } from '../../store/profile-store';

export const Accommodation = () => {
  const hostelName = useProfileStore((state) => state.hostelName);
  const roomNumber = useProfileStore((state) => state.roomNumber);
  const pinCode = useProfileStore((state) => state.pinCode);
  const hostelLatitude = useProfileStore((state) => state.hostelLatitude);
  const hostelLongitude = useProfileStore((state) => state.hostelLongitude);
  const roommates = useProfileStore((state) => state.roommates);

  const handleNavigate = () => {
    if (hostelLatitude && hostelLongitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${hostelLatitude},${hostelLongitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Accommodation Details</Text>
        
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Hostel:</Text>
            <Text style={styles.value}>{hostelName || 'Not Assigned'}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Room:</Text>
            <Text style={styles.value}>{roomNumber || 'Not Assigned'}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>PIN:</Text>
            <Text style={styles.value}>{pinCode || 'Not Assigned'}</Text>
          </View>
        </View>

        {hostelLatitude && hostelLongitude && (
          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Text style={styles.buttonText}>Navigate to Hostel</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Roommates</Text>
        {roommates?.length > 0 ? (
          roommates.map((roommate, index) => (
            <View key={index} style={styles.roommateCard}>
              <Text style={styles.roommateName}>👤 {roommate.name || roommate}</Text>
              {roommate.email && <Text style={styles.roommateInfo}>📧 {roommate.email}</Text>}
              {roommate.contact && <Text style={styles.roommateInfo}>📱 {roommate.contact}</Text>}
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No roommates assigned</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    paddingTop: 80,
  },
  section: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'ProximaBold',
    color: '#FED606',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1F2122',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Proxima',
    color: '#FFFFFF',
  },
  value: {
    fontSize: 16,
    fontFamily: 'ProximaBold',
    color: '#FED606',
  },
  button: {
    backgroundColor: '#FED606',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'ProximaBold',
    color: '#161616',
  },
  roommateCard: {
    backgroundColor: '#1F2122',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  roommateName: {
    fontSize: 16,
    fontFamily: 'ProximaBold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  roommateInfo: {
    fontSize: 14,
    fontFamily: 'Proxima',
    color: '#CCC',
    marginBottom: 3,
  },
  noData: {
    fontSize: 14,
    fontFamily: 'Proxima',
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
