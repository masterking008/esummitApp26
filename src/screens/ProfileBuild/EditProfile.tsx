import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
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
import { useaddInterestMutation, usebuildStudent, useeditprofile } from "../../hooks/mutation/user-action-mutation";
import { useFlowStore } from "../../store/flow-store";
import { useProfileStore } from "../../store/profile-store";
import MultiSelect from "react-native-multiple-select";
import { MultiSelectBox } from "../../components/form";
import { Footer } from "../../components/shared";
import { Checkbox } from "react-native-paper";
import { Button } from "../../components/form";
import { useGetPersonalProfileQuery } from "../../hooks/query/user-query";

export const EditProfile = () => {
  const email = useProfileStore((state) => state.email);

  const { data: ProfileData, isLoading, refetch } = useGetPersonalProfileQuery(email);

  const profile = ProfileData?.profile

  const toast = useToast();

  const { mutateAsync: editprofile } = useeditprofile();

  const navigation = useNavigation();

  // const setProfile = useProfileStore(state => state.setProfile);

  const setFlow = useFlowStore((state) => state.setFlow);

  const handleSubmit = () => {
    // const formattedInterest = selectedItems.map(item => ({ id: item }));
    editprofile({ email, company_name: selectedSchool, description: desc, designation: designation, portfolio: portfolio, sector: sector, stage: stage, achievements: achievements, skills: skills }).then(data => {
      if (data.success) {
        refetch();
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

  const [selectedSchool, setSelectedSchool] = useState('');
  const [achievements, setAchievements] = useState('');
  const [skills, setSkills] = useState('');
  const [desc, setDesc] = useState('');
  const [designation, setDesignation] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [sector, setsector] = useState('');
  const [stage, setstage] = useState('');

  useEffect(() => {
    if (profile) {
      setSelectedSchool(profile.company_name || '');
      setAchievements(profile.achievements || '');
      setSkills(profile.skills || '');
      setDesc(profile.description || '');
      setDesignation(profile.designation || '');
      setPortfolio(profile.portfolio || '');
      setsector(profile.sector || '');
      setstage(profile.stage || '');
    }
  }, [profile]);

  const onChangeSchool = (text: string) => {
    setSelectedSchool(text)
  }

  const onChangeAchievements = (text: string) => {
    setAchievements(text)
  }

  const onChangeSkills = (text: string) => {
    setSkills(text)
  }

  const onChangeDesc = (text: string) => {
    setDesc(text)
  }

  const onChangeDesignation = (text: string) => {
    setDesignation(text)
  }

  const onChangePortfolio = (text: string) => {
    setPortfolio(text)
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.containerx}>
        <View style={styles.section}>
          <View>
            {profile?.persontype === "Student" ? (
                <>
                <Text style={styles.label}>College/School Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={selectedSchool} onChangeText={onChangeSchool} />
                </View>
    
                <Text style={styles.label}>Your Achievement:</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput multiline={true} numberOfLines={5} style={styles.textAreaInput} value={achievements} onChangeText={onChangeAchievements} textAlignVertical="top"/>
                </View>
    
                <Text style={styles.label}>Your Skills:</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput multiline={true} numberOfLines={5} style={styles.textAreaInput} value={skills} onChangeText={onChangeSkills} textAlignVertical="top"/>
                </View>
                </>
            ): profile?.persontype === 'Mentor'? (<>
            <>
                <Text style={styles.label}>Company Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={selectedSchool} onChangeText={onChangeSchool} />
                </View>
    
                <Text style={styles.label}>Your Achievements:</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput multiline={true} numberOfLines={5} style={styles.textAreaInput} value={achievements} onChangeText={onChangeAchievements} textAlignVertical="top"/>
                </View>
    
                <Text style={styles.label}>Select your Sector:</Text>
            <View style={styles.sectorContainer}>
              {sectors.map((sec) => (
                <View key={sec} style={styles.optionCont}>
                  <TouchableOpacity
                    onPress={() => setsector(sec)}
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

                <Text style={styles.label}>Your Designation</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={designation} onChangeText={onChangeDesignation} />
                </View>
                </>
            </>): profile?.persontype === 'Investor' ? (
                <>
                <Text style={styles.label}>Firm Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={selectedSchool} onChangeText={onChangeSchool} />
                </View>
    
                <Text style={styles.label}>Your Portfolio:</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput multiline={true} numberOfLines={5} style={styles.textAreaInput} value={portfolio} onChangeText={onChangePortfolio} textAlignVertical="top"/>
                </View>

                <Text style={styles.label}>Your Description:</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput multiline={true} numberOfLines={5} style={styles.textAreaInput} value={desc} onChangeText={onChangeDesc} textAlignVertical="top"/>
                </View>
    
                <Text style={styles.label}>Select your Sector:</Text>
            <View style={styles.sectorContainer}>
              {sectors.map((sec) => (
                <View key={sec} style={styles.optionCont}>
                  <TouchableOpacity
                    onPress={() => setsector(sec)}
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

                <Text style={styles.label}>Your Designation</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={designation} onChangeText={onChangeDesignation} />
                </View>
                </>
            ): profile?.persontype === 'Founder'? (
              <>
              <Text style={styles.label}>Startup Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={selectedSchool} onChangeText={onChangeSchool} />
                </View>
    
                <Text style={styles.label}>Your Achievements:</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput multiline={true} numberOfLines={5} style={styles.textAreaInput} value={achievements} onChangeText={onChangeAchievements} textAlignVertical="top"/>
                </View>

                <Text style={styles.label}>Your Description:</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput multiline={true} numberOfLines={5} style={styles.textAreaInput} value={desc} onChangeText={onChangeDesc} textAlignVertical="top"/>
                </View>
    
                <Text style={styles.label}>Select your Sector:</Text>
            <View style={styles.sectorContainer}>
              {sectors.map((sec) => (
                <View key={sec} style={styles.optionCont}>
                  <TouchableOpacity
                    onPress={() => setsector(sec)}
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

            <Text style={styles.label}>Select your Stage:</Text>
            <View style={styles.sectorContainer}>
              {stages.map((sec) => (
                <View key={sec} style={styles.optionCont}>
                  <TouchableOpacity
                    onPress={() => setstage(sec)}
                    style={
                      stage === sec
                        ? styles.checkedcont
                        : styles.notcheckedcont
                    }
                  >
                    <Text style={[styles.optionText, stage === sec && styles.selectedOptionText]}>{sec}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
                </>
            ):(<>
            <Text style={styles.label}>Company Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={selectedSchool} onChangeText={onChangeSchool} />
                </View>

                <Text style={styles.label}>Your Desingation</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={designation} onChangeText={onChangeDesignation} />
                </View>
    
                <Text style={styles.label}>Your Achievements:</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput multiline={true} numberOfLines={5} style={styles.textAreaInput} value={achievements} onChangeText={onChangeAchievements} textAlignVertical="top"/>
                </View>

                <Text style={styles.label}>Your Skills:</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput multiline={true} numberOfLines={5} style={styles.textAreaInput} value={skills} onChangeText={onChangeSkills} textAlignVertical="top"/>
                </View>
            </>)}
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
    // marginBottom: 100,
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
  optionCont: {
    width: "45%",
    margin: 5,
  },
  label:{
    color: '#fff',
    marginVertical: 10,
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
  scrollView: {
    marginTop: 80,
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
  warning: {
    color: 'red',
    fontFamily: 'Proxima'
  }
});