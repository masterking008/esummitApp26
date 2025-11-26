import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/form';
import axios from 'axios';
import { PRODUCTION_BASE_URL } from '../../api/base';


export const RegisterScreen = () => {
  const navigation = useNavigation();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profession, setProfession] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const professionOptions = [
    { label: "Student", value: "student" },
    { label: "Professional", value: "professional" },
    { label: "Entrepreneur", value: "entrepreneur" },
    { label: "Other", value: "other" },
  ];

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !contactNumber ||
      !profession
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${PRODUCTION_BASE_URL}/user/register/`, {
        email,
        password,
        firstName,
        lastName,
        contact: contactNumber,
        profession,
        state: "App",
        country: "App",
        pincode: "111111",
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000
      });

      if (response.data.success) {
        Alert.alert("Success", "You have registered successfully!");
        navigation.navigate('SignIn')
      } else {
        Alert.alert("Error", response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.log('Registration error:', error.response?.data);
      
      if (error.response?.status === 500) {
        const errorMessage = error.response?.data?.error || error.response?.data?.message;
        if (errorMessage && errorMessage.includes('duplicate key') && errorMessage.includes('email')) {
          Alert.alert("Error", "This email is already registered. Please use a different email or try signing in.");
        } else {
          Alert.alert("Server Error", errorMessage || "The server is currently experiencing issues. Please try again later.");
        }
      } else if (error.code === 'ECONNABORTED') {
        Alert.alert("Timeout", "Request timed out. Please check your internet connection and try again.");
      } else if (error.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else if (error.response?.data?.error) {
        Alert.alert("Error", error.response.data.error);
      } else {
        Alert.alert("Network Error", "Unable to connect to the server. Please check your internet connection.");
      }
    }
  };

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
        <Image
          source={require('../../assets/images/logowhite.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </LinearGradient>

      <ScrollView style={styles.section} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Register</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.pickerContainer} onPress={() => setShowPicker(true)}>
          <Text style={styles.pickerLabel}>Profession</Text>
          <Text style={styles.pickerValue}>
            {profession ? professionOptions.find(opt => opt.value === profession)?.label : "Select your profession"}
          </Text>
        </TouchableOpacity>

        <Modal visible={showPicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Profession</Text>
              {professionOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.optionItem}
                  onPress={() => {
                    setProfession(option.value);
                    setShowPicker(false);
                  }}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
              <Button
                title="Cancel"
                onPress={() => setShowPicker(false)}
              />
            </View>
          </View>
        </Modal>

        <Button
          title="Register"
          onPress={handleRegister}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    flex: 1,
    width: '100%',
    height: '100%',
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
  scrollContent: {
    paddingBottom: 50,
  },
  heading: {
    fontFamily: 'ProximaBold',
    fontSize: 23,
    lineHeight: 28,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Proxima',
    fontSize: 14,
    lineHeight: 17,
    color: '#A2A2A2',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#161616',
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    borderBottomColor: '#FED606',
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 25,
    marginTop: 2,
    padding: 0,
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 225, 0, 0.3)",
    overflow: "hidden",
  },
  pickerLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontFamily: "Proxima",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  pickerValue: {
    color: "#FFFFFF",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1F2122",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "ProximaBold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#FED606',
    borderRadius: 8,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'ProximaBold',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#FED606',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#FED606',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logo: {
    width: 275,
    height: 125,
  },
});