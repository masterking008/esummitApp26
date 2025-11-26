import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";
// import { TextInput } from "../../components/form";
import Logo from "../../components/svgs/logo";
import { ADMIN_EMAIL, FLOW_STAGES, Validator } from "../../contants";
import { useaddInterestMutation, usebuildStudent } from "../../hooks/mutation/user-action-mutation";
import { useFlowStore } from "../../store/flow-store";
import { useProfileStore } from "../../store/profile-store";
import MultiSelect from "react-native-multiple-select";
import { MultiSelectBox } from "../../components/form";
import { Footer } from "../../components/shared";
import { Checkbox } from "react-native-paper";
import { Button } from "../../components/form";

export const StudentProfile = () => {
  const email = useProfileStore((state) => state.email);

  const toast = useToast();

  const { mutateAsync: buildstudent } = usebuildStudent();

  const navigation = useNavigation();

  // const setProfile = useProfileStore(state => state.setProfile);

  const setFlow = useFlowStore((state) => state.setFlow);

  const handleSubmit = () => {
    // const formattedInterest = selectedItems.map(item => ({ id: item }));
    buildstudent({ email, school: selectedSchool, achievements: achievements, skills: skills }).then(data => {
      if (data.success) {
        toast.show('Profile is Built', { type: 'success' });
        setFlow(FLOW_STAGES.MAIN)
        navigation.navigate('Home' as never);
      } else {
        toast.show('Some error has occured. Try again later', {
          type: 'danger',
        });
      }
    });
  };

  const [selectedSchool, setSelectedSchool] = useState("");
  const [achievements, setAchievements] = useState("");
  const [skills, setSkills] = useState("");

  const onChangeSchool = (text: string) => {
    setSelectedSchool(text)
  }

  const onChangeAchievements = (text: string) => {
    setAchievements(text)
  }

  const onChangeSkills = (text: string) => {
    setSkills(text)
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.containerx}>
        <View style={styles.section}>
        <Text style={styles.heading}>Profile for Student</Text>
          <View>
            <Text style={styles.label}>College/School Name</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={selectedSchool} onChangeText={onChangeSchool} placeholder="College/School Name" placeholderTextColor={'white'} />
            </View>

            <Text style={styles.label}>Your Achievement</Text>
            <View style={styles.textAreaContainer}>
              <TextInput multiline={true} numberOfLines={5} textAlignVertical="top" style={styles.textAreaInput} value={achievements} onChangeText={onChangeAchievements} placeholder="Write your achievements here" placeholderTextColor={'white'} />
            </View>

            <Text style={styles.label}>Your Skills</Text>
            <View style={styles.textAreaContainer}>
              <TextInput multiline={true} numberOfLines={5} textAlignVertical="top" style={styles.textAreaInput} value={skills} onChangeText={onChangeSkills} placeholder="Write your skills here" placeholderTextColor={'white'} />
            </View>
            <Text style={styles.warning}>Note: Your contact details will be shared with person you connect with for better communication</Text>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#05020E",
    width: "100%",
    height: "100%",
  },
  containerx: {
    height: "100%",
  },
  section: {
    padding: 20,
  },
  heading: {
    fontSize: 23,
    lineHeight: 28,
    color: "#FFFFFF",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 14,
    lineHeight: 17,
    color: "#A2A2A2",
    textTransform: "capitalize",
  },
  label: {
    color: '#fff',
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  textAreaContainer: {
    width: '100%',
    marginBottom: 15,
  },
  scrollView: {
    marginTop: 80,
  },
  optionCont: {
    width: "45%",
    margin: 5,
  },
  checkedcont: {
    borderColor: '#FFE100',
    borderWidth: 2,
    backgroundColor: '#FFE100',
    padding: 12,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  notcheckedcont: {
    borderColor: '#ffffff',
    borderWidth: 2,
    padding: 12,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.02)",
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    marginTop: 2,
    padding: 12,
    width: '100%',
  },
  textAreaInput: {
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.02)",
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    marginTop: 2,
    padding: 12,
    width: '100%',
    minHeight: 100,
  },
  warning: {
    color: 'red',
    fontFamily: 'Proxima'
  }
});