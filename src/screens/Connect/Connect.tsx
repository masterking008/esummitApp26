import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  TextInput,
  Image,
  Linking,
  ImageBackground,
} from "react-native";
// import { ScrollView, NativeViewGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PagerView from "react-native-pager-view";
import {
  ActivityIndicator,
  Divider,
  List,
  Modal,
  Portal,
  RadioButton,
  Button
} from "react-native-paper";
// import 'react-native-gesture-handler';
import { Event, Highlight } from "../../components/home";
import { Footer } from "../../components/shared";
import FilterSvg from "../../components/svgs/filter";
import {
  useGetConnectQuery,
  useGetProfileQuery,
} from "../../hooks/query/user-query";
import { useEventStore } from "../../store/events-store";
import { filterData } from "../../utils/helper";
import { useProfileStore } from "../../store/profile-store";
// import { Button } from "../../components/form";
import {
  useaccept,
  usedisconnect,
  usesendRequest,
} from "../../hooks/mutation/user-action-mutation";
import { useToast } from "react-native-toast-notifications";

export const Connect = ({ route }) => {
  const email = useProfileStore((state) => state.email);
  const {
    data: ProfileData,
    isLoading,
    refetch,
  } = useGetProfileQuery(route.params.id, email);

  const Profile = ProfileData?.profile;

  const persontype = Profile?.persontype;

  const { mutateAsync: sendRequest } = usesendRequest();
  const { mutateAsync: disconnect } = usedisconnect();
  const { mutateAsync: accept } = useaccept();

  const [visible, setVisible] = useState(false);

  const [connectsent, setconnectsent] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const navigation = useNavigation();
  const toast = useToast();
  const [value, setValue] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterDay, setFilterDay] = useState<string[]>(["1", "2"]);
  const [filterVenue, setFilterVenue] = useState("");

  const onGoingEvents = useEventStore((state) => state.onGoing);
  const upcommingEvents = useEventStore((state) => state.upcoming);
  const completedEvents = useEventStore((state) => state.completed);
  const setOnGoingEvents = useEventStore((state) => state.setOnGoing);
  const setUpcommingEvents = useEventStore((state) => state.setUpcoming);
  const setCompletedEvents = useEventStore((state) => state.setCompleted);

  const handleTextChange = (text: string) => {
    setValue(text);
  };

  const handleFilter = () => {
    setFilterCategory(value);
    setFilterDay(["1", "2"]);
    setFilterVenue("");
  };

  //   useEffect(() => {
  //     const timeNow = new Date();
  //     EventData?.data?.other.forEach(item => {
  //       if (!categories.includes(item.category)) {
  //         setCategories([...categories, item.category]);
  //       }
  //       if (!days.includes(item.day)) {
  //         setDays([...days, item.day]);
  //       }
  //       if (!venues.includes(item.venue)) {
  //         setVenues([...venues, item.venue]);
  //       }

  //       if (
  //         new Date(item.startTime) < timeNow &&
  //         new Date(item.endTime) > timeNow
  //       ) {
  //         setOnGoingEvents(item);
  //       } else if (new Date(item.startTime) > timeNow) {
  //         setUpcommingEvents(item);
  //       } else if (new Date(item.endTime) < timeNow) {
  //         setCompletedEvents(item);
  //       }
  //     });

  //     EventData?.data?.highlights.forEach(item => {
  //       if (!categories.includes(item.category)) {
  //         setCategories([...categories, item.category]);
  //       }
  //       if (!days.includes(item.day)) {
  //         setDays([...days, item.day]);
  //       }
  //       if (!venues.includes(item.venue)) {
  //         setVenues([...venues, item.venue]);
  //       }
  //     });
  //   }, [EventData]);

  const handleResetModal = async () => {
    setFilterCategory("");
    setFilterDay(["1", "2"]);
    setFilterVenue("");
  };

  const handleSubmit = () => {
    console.log("Submitted");
    const id = Profile?.id;
    sendRequest({ email, id: id }).then((data) => {
      if (data.success) {
        toast.show("Connection Request Sent!", { type: "success" });
        setconnectsent(true);
        navigation.navigate("YourConnect" as never);
      } else {
        toast.show("Some error occqured. Try Later", { type: "danger" });
        setconnectsent(false);
      }
    });
  };

  const handleAccept = () => {
    console.log("Submitted");
    const id = Profile?.id;
    accept({ id: route.params.id, email: email }).then((data) => {
      if (data.success) {
        toast.show("Success!", { type: "success" });
        setconnectsent(true);
        navigation.navigate("YourConnect" as never);
      } else {
        toast.show("Some error occqured. Try Later", { type: "danger" });
        setconnectsent(false);
      }
    });
  };

  const handleDisconnect = () => {
    disconnect({ id: Profile?.id }).then((data) => {
      if (data.success) {
        toast.show("Succesfull!", { type: "success" });
        navigation.navigate("ConnectMain" as never);
        // setconnectsent(true)
      } else {
        console.log(data);
        toast.show("Some error occqured. Try Later", { type: "danger" });
        // setconnectsent(false)
      }
    });
  };

  const handleDayFilter = (day) => {
    if (filterDay.includes(day)) {
      setFilterDay(filterDay.filter((item) => item !== day));
    } else {
      setFilterDay([...filterDay, day]);
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/homeBg.png")}
        style={styles.container}
        resizeMode="cover"
      >
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
          >
            {/* <ScrollView>
              <List.Accordion
                title="Categories"
                style={styles.accordion}
                titleStyle={styles.accordionTitle}>
                <View>
                  <RadioButton.Group
                    onValueChange={newValue => setFilterCategory(newValue)}
                    value={filterCategory}>
                    {categories.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            if (filterCategory === item) {
                              setFilterCategory('');
                            } else {
                              setFilterCategory(item);
                            }
                          }}>
                          <View style={styles.itemList}>
                            <RadioButton value={item} />
                            <Text style={styles.itemText}>{item}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </RadioButton.Group>
                </View>
              </List.Accordion>

              <Divider style={styles.divider} />

              <List.Accordion
                title="Venue"
                style={styles.accordion}
                titleStyle={styles.accordionTitle}>
                <View>
                  <RadioButton.Group
                    onValueChange={newValue => setFilterVenue(newValue)}
                    value={filterVenue}>
                    {venues.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            if (filterVenue === item) {
                              setFilterVenue('');
                            } else {
                              setFilterVenue(item);
                            }
                          }}>
                          <View style={styles.itemList}>
                            <RadioButton value={item} />
                            <Text style={styles.itemText}>{item}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </RadioButton.Group>
                </View>
              </List.Accordion>
            </ScrollView> */}
            <View>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                Are you sure you want to disconnect?
              </Text>
            </View>
            <View style={styles.modalFooter}>
              <Button onPress={handleDisconnect}>
                <Text>Yes</Text>
              </Button>
              <Button onPress={hideModal}>
                <Text>No</Text>
              </Button>
            </View>
          </Modal>
        </Portal>
        <ScrollView
          style={[styles.containerx, { marginTop: 80 ,marginBottom: 100 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        >
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color="#FFE100"
              size="large"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
              <View style={styles.section}>
                <View style={styles.image}>
                  {persontype === "Founder" ? (
                    <Image
                      source={require("../../assets/images/founder.png")}
                      style={{ width: "70%" }}
                    />
                  ) : persontype === "Mentor" ? (
                    <Image source={require("../../assets/images/mentor.png")} />
                  ) : persontype === "Professional" ? (
                    <Image source={require("../../assets/images/prof.png")} />
                  ) : persontype === "Student" ? (
                    <Image
                      source={require("../../assets/images/student.png")}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/images/investor.png")}
                    />
                  )}
                </View>
                <View style={styles.details}>
                  {Profile?.name === null || Profile?.name === undefined ? (
                    <Text style={styles.nameText}>Field is empty</Text>
                  ) : (
                    <Text style={styles.nameText}>{Profile?.name}</Text>
                  )}

                  {Profile?.company_name === null || Profile?.company_name === undefined ? (
                    <Text style={styles.companyText}>
                      Field is empty
                    </Text>
                  ) : (
                    <Text style={styles.companyText}>
                      {Profile?.company_name}
                    </Text>
                  )}

                  {Profile?.persontype === null || Profile?.persontype === undefined ? (
                    <Text style={styles.persontype}>{'\u2B24'} Field is empty</Text>
                  ) : (
                    <Text style={styles.persontype}>{'\u2B24'} {Profile?.persontype}</Text>
                  )}

                  <View style={styles.actions}>
                    {ProfileData?.isconnected ? (
                      <Button style={styles.button} onPress={showModal}>
                        <Text style={styles.buttonText}>Disconnect</Text>
                      </Button>
                    ) : ProfileData?.status ? (
                      ProfileData?.isreceived ? (
                        <Button
                          style={styles.button}
                          onPress={handleAccept}
                        >
                          <Text style={styles.buttonText}>Accept</Text>
                        </Button>
                      ) : (
                        <Button
                          style={styles.button}
                          onPress={handleSubmit}
                          disabled={true}
                        >
                          <Text style={styles.buttonText}>Request Sent!</Text>
                        </Button>
                      )
                    ) : (
                      <Button
                        style={styles.button}
                        onPress={handleSubmit}
                      >
                        <Text style={styles.buttonText}>Connect</Text>
                      </Button>
                    )}
                    {ProfileData?.isconnected ? (
                      <Button style={styles.buttonfilled} onPress={() => { Linking.openURL('https://wa.me/91' + String(Profile?.contact)) }}>
                        <Text style={styles.buttonFilledText}>Message</Text>
                      </Button>
                    ) : (
                      <Button style={styles.buttonfilled} onPress={() => { toast.show('Please connect to unlock message') }}>
                        <Text style={styles.buttonFilledText}>Message</Text>
                      </Button>
                    )}
                  </View>
                </View>
                {persontype === "Student" ? (
                  <>
                    <Text style={styles.heading}>
                      Skills
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.skills}
                    </Text>

                    <Text style={styles.heading}>
                      Achievements
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.achievements}
                    </Text>
                  </>
                ) : persontype === "Founder" ? (
                  <>
                    <Text style={styles.heading}>
                      Sector
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.sector}
                    </Text>

                    <Text style={styles.heading}>
                      Stage
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.stage}
                    </Text>

                    <Text style={styles.heading}>
                      Description
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.description}
                    </Text>

                    <Text style={styles.heading}>
                      Achievements
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.achievements}
                    </Text>
                  </>
                ) : persontype === "Investor" ? (
                  <>
                    <Text style={styles.heading}>
                      Sector
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.sector}
                    </Text>

                    <Text style={styles.heading}>
                      Designation
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.designation}
                    </Text>

                    <Text style={styles.heading}>
                      Portfolio
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.portfolio}
                    </Text>

                    <Text style={styles.heading}>
                      Description
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.description}
                    </Text>
                  </>
                ) : persontype === "Mentor" ? (
                  <>
                    <Text style={styles.heading}>
                      Sector
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.sector}
                    </Text>

                    <Text style={styles.heading}>
                      Designation
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.designation}
                    </Text>

                    <Text style={styles.heading}>
                      Achievements
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.achievements}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.heading}>
                      Designation
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.designation}
                    </Text>

                    <Text style={styles.heading}>
                      Skills
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.skills}
                    </Text>

                    <Text style={styles.heading}>
                      Achievements
                    </Text>
                    <Text style={styles.para}>
                      {Profile?.achievements}
                    </Text>
                  </>
                )}
                <View>
                  <Text style={styles.heading}>Interests</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {Profile?.interests.length === 0 ? (
                      <Text style={styles.para}>No Interests</Text>
                    ) : (
                      Profile?.interests.map((item, index) => (
                        <Text
                          style={styles.interestbox}
                          key={index}
                        >
                          {item.viewValue}
                        </Text>
                      ))
                    )}
                  </View>
               
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </ImageBackground>
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#161616",
    // fontFamily: 'Poppins',
    color: "#FFFFFF",
    borderBottomColor: "#46B1EE",
    borderBottomWidth: 2,
    fontSize: 14,
    lineHeight: 17,
    marginTop: 2,
    padding: 0,
  },
  container: {
    height: "100%",
    flex: 1,
  },
  containerx: {
    // backgroundColor: "#05020E",
  },
  containerStyle: {
    backgroundColor: "#BBD4E2",
    width: "70%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    maxHeight: Dimensions.get("window").width,
  },
  section: {
    padding: 20,
    paddingHorizontal: 24,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  heading: {
    fontFamily: 'ProximaBold',
    fontSize: 23,
    lineHeight: 28,
    color: "#FFFFFF",
    textTransform: "uppercase",
    marginBottom: 5
  },
  nameText: {
    fontFamily: 'ProximaBold',
    color: "#ffffff",
    fontSize: 20,
    margin: 5
  },
  companyText: {
    fontFamily: 'Proxima',
    color: "#ffffff",
    fontSize: 15,
    margin: 5
  },
  para: {
    fontFamily: 'Proxima',
    fontSize: 13,
    borderRadius: 12,
    backgroundColor: '#1e1e1e',
    borderColor: '#FFE100',
    borderWidth: 1,
    padding: 16,
    marginVertical: 12,
    color: '#ffffff',
    lineHeight: 20,
    shadowColor: '#FFE100',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pagerView: {
    height: 180,
  },
  events: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    justifyContent: "center",
  },
  itemList: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  accordion: {
    backgroundColor: "#DCE9F0",
  },
  accordionTitle: {
    // // fontFamily: 'Poppins',
    fontSize: 16,
    textTransform: "uppercase",
    color: "#141415",
  },
  divider: {
    height: 3,
  },
  image: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  details: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10
  },
  interestbox: {
    fontFamily: 'Proxima',
    backgroundColor: '#FFE100',
    borderRadius: 16,
    marginHorizontal: 6,
    marginVertical: 6,
    color: '#1e1e1e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
    shadowColor: '#FFE100',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  actions: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingRight: 10,
    paddingTop: 10,
  },
  itemText: {
    // fontFamily: 'Poppins',
    fontSize: 14,
    textTransform: "uppercase",
  },
  fab: {
    position: "absolute",
    right: 0,
    top: "45%",
    transform: [{ rotate: "270deg" }, { translateY: 30 }],
    flexDirection: "row",
    backgroundColor: "#161616",
  },
  button: {
    margin: 8,
    borderWidth: 2,
    borderColor: '#FFE100',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#FFE100',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonfilled: {
    margin: 8,
    borderWidth: 2,
    backgroundColor: '#FFE100',
    borderColor: '#FFE100',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#FFE100',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Proxima',
    color: '#FFE100',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  buttonFilledText: {
    fontFamily: 'Proxima',
    color: '#1e1e1e',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  fabButton: {
    backgroundColor: "#46B1EE",
    borderColor: "#46B1EE",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderRadius: 0,
    marginHorizontal: 2,
    alignItems: "center",
  },
  fabButtonText: {
    color: "#FFFFFF",
    // fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  card: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    backgroundColor: "#000000",
    width: "100%",
    borderRadius: 20,
  },
  persontype: {
    fontFamily: 'Proxima',
    color: '#A6CE3B',
    fontSize: 15
  },
});
