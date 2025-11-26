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
import {
  useaddInterestMutation,
  usebuildStartup,
} from "../../hooks/mutation/user-action-mutation";
import { useFlowStore } from "../../store/flow-store";
import { useProfileStore } from "../../store/profile-store";
import MultiSelect from "react-native-multiple-select";
import { MultiSelectBox } from "../../components/form";
import { Footer } from "../../components/shared";
import { Checkbox } from "react-native-paper";
import { Button } from "../../components/form";

export const StartupProfile = () => {
  const email = useProfileStore((state) => state.email);

  const toast = useToast();

  const { mutateAsync: buildstartup } = usebuildStartup();

  const navigation = useNavigation();

  // const setProfile = useProfileStore(state => state.setProfile);

  const setFlow = useFlowStore((state) => state.setFlow);

  //   this.state = {
  //     options: [{name: 'Option 1️⃣', id: 1},{name: 'Option 2️⃣', id: 2}]
  // };

  const handleSubmit = () => {
    buildstartup({ email, startup_name: name, sector: sector, description: desc, stage: stage, achievements: achievements }).then(data => {
      if (data.success) {
        toast.show('Profile Built Succesfully!', { type: 'success' });
        setFlow(FLOW_STAGES.MAIN)
        navigation.navigate('Home' as never);
      } else {
        toast.show('Some error has occured. Try again later', {
          type: 'danger',
        });
      }
    });
  };

  const sectors = [
    "Agriculture",
    "Automotive",
    "B2B Software",
    "Blockchain",
    "Consumer goods and services",
    "Deep Tech (i.e Al / IoT / ML / DL)",
    "Education",
    "Energy and Environment",
    "Fintech",
    "Government",
    "Healthcare",
    "Industrial",
    "Media/Media Tech",
    "Real Estate and Construction",
    "HR Tech",
    "Marketplace",
    "Web3",
    "Other",
  ];

  const stages = ["Ideation/Early Stage", "Pre-Seed", "Seed", "Series-A", "Series-B", "Series-C", "Series-D"];

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");
  const [achievements, setAchievements] = useState("");

  const onChangeName = (text: string) => {
    setName(text)
  }

  const onChangeDesc = (text: string) => {
    setDesc(text)
  }

  const onChangeAchievements = (text: string) => {
    setAchievements(text)
  }

  return (
   <View style={styles.container}>
     <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.containerx}>
        <View style={styles.section}>
          <Text style={styles.heading}>Startup Details:</Text>
          <View>
          <Text style={styles.label}>Your Startup Name</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={name} onChangeText={onChangeName} placeholder="Startup Name" placeholderTextColor={'white'} />
            </View>

            <Text style={styles.label}>Select your Sector</Text>
            <View style={styles.sectorContainer}>
              {sectors.map((sec) => (
                <View key={sec} style={styles.optionCont}>
                  <TouchableOpacity
                    onPress={() => setSector(sec)}
                    style={
                      sector === sec
                        ? styles.checkedcont
                        : styles.notcheckedcont
                    }
                  >
                    <Text style={[styles.optionText, sector === sec && styles.selectedOptionText]}>{sec}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <Text style={styles.label}>Select your Stage</Text>
            <View style={styles.sectorContainer}>
              {stages.map((stag) => (
                <View key={stag} style={styles.optionCont}>
                  <TouchableOpacity
                    onPress={() => setStage(stag)}
                    style={
                      stage === stag
                        ? styles.checkedcont
                        : styles.notcheckedcont
                    }
                  >
                    <Text style={[styles.optionText, stage === stag && styles.selectedOptionText]}>{stag}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <Text style={styles.label}>Your Startup Description</Text>
            <View style={styles.textAreaContainer}>
                <TextInput multiline={true} numberOfLines={5} textAlignVertical="top" style={styles.textAreaInput} value={desc} onChangeText={onChangeDesc} placeholder="Write your description here" placeholderTextColor={'white'} />
            </View>

            <Text style={styles.label}>Your Startup Achievements</Text>
            <View style={styles.textAreaContainer}>
                <TextInput multiline={true} numberOfLines={5} textAlignVertical="top" style={styles.textAreaInput} value={achievements} onChangeText={onChangeAchievements} placeholder="Write your achievements here" placeholderTextColor={'white'} />
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
    height: '100%',
  },
  section: {
    padding: 20,
  },
  heading: {
    fontSize: 23,
    lineHeight: 28,
    color: "#FFFFFF",
    textTransform: "uppercase",
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
  sectorContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
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
  optionText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#000',
  },
  scrollView: {
    marginTop: 80,
  },
  warning: {
    color: 'red',
    fontFamily: 'Proxima'
  }
});