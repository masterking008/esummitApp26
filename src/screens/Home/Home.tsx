import { useNavigation, useScrollToTop } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
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
  Button,
  Divider,
  List,
  Modal,
  Portal,
  RadioButton,
} from "react-native-paper";
// import 'react-native-gesture-handler';
import { Event, Highlight } from "../../components/home";
import { Footer, GetEntry, Navbar } from "../../components/shared";
import FilterSvg from "../../components/svgs/filter";
import { useEvent } from "../../hooks/query/events-query";
import { useEventStore } from "../../store/events-store";
import { filterData } from "../../utils/helper";
import UserSvg from "../../components/svgs/user";
import { useProfileStore } from "../../store/profile-store";
import * as Notifications from 'expo-notifications'
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";
import { useStoreToken } from "../../hooks/mutation/user-action-mutation";
import EcellSvg from "../../components/svgs/ecell";

export const Home = () => {
  const { data: EventData, isLoading, refetch } = useEvent();

  const name = useProfileStore((state) => state.name);

  const isguest = useProfileStore((state) => state.isGuest)

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const navigation = useNavigation();

  const [categories, setCategories] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterDay, setFilterDay] = useState<string[]>(["0", "1", "2"]);
  const [filterVenue, setFilterVenue] = useState("");

  const onGoingEvents = useEventStore((state) => state.onGoing);
  const upcommingEvents = useEventStore((state) => state.upcoming);
  const completedEvents = useEventStore((state) => state.completed);
  const setOnGoingEvents = useEventStore((state) => state.setOnGoing);
  const setUpcommingEvents = useEventStore((state) => state.setUpcoming);
  const setCompletedEvents = useEventStore((state) => state.setCompleted);

  const togglefilter = (filtername) => {
    if (filterCategory === filtername) {
      setFilterCategory("");
    } else {
      setFilterCategory(filtername);
    }
    // if(filtername=='startup'){
    //   if(filterCategory=='startup'){
    //     setFilterCategory('')
    //   }
    //   else{
    //     setFilterCategory('startup')
    //   }
    // }
    // else if(filtername=='student'){
    //   if(filterCategory=='student'){
    //     setFilterCategory('')
    //   }
    //   else{
    //     setFilterCategory('student')
    //   }
    // }
    // else{
    //   if(filterVenue==filtername){
    //     setFilterVenue('')
    //   }
    //   else{
    //     setFilterVenue(filtername)
    //   }
    // }
    // console.log(venues)
    // console.log(categories)
  };

  useEffect(() => {
    const timeNow = new Date();
    EventData?.data?.other.forEach((item) => {
      if (!categories.includes(item.category)) {
        setCategories([...categories, item.category]);
      }
      if (!days.includes(item.day)) {
        setDays([...days, item.day]);
      }
      if (!venues.includes(item.venue.name)) {
        setVenues([...venues, item.venue.name]);
      }

      if (
        new Date(item.startTime) < timeNow &&
        new Date(item.endTime) > timeNow
      ) {
        setOnGoingEvents(item);
      } else if (new Date(item.startTime) > timeNow) {
        setUpcommingEvents(item);
      } else if (new Date(item.endTime) < timeNow) {
        setCompletedEvents(item);
      }
    });

    EventData?.data?.highlights?.forEach((item) => {
      if (!categories.includes(item.category)) {
        setCategories([...categories, item.category]);
      }
      if (!days.includes(item.day)) {
        setDays([...days, item.day]);
      }
      if (!venues.includes(item.venue.name)) {
        setVenues([...venues, item.venue.name]);
      }
    });
  }, [EventData]);

  const handleResetModal = async () => {
    setFilterCategory("");
    setFilterDay(["0", "1", "2"]);
    setFilterVenue("");
  };

  const handleDayFilter = (day) => {
    if (filterDay.includes(day)) {
      setFilterDay(filterDay.filter((item) => item !== day));
    } else {
      setFilterDay([...filterDay, day]);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const highlights = EventData?.data.highlights;

  useEffect(() => {
    const totalpages = highlights?.length || 0;
    const autoSlideInterval = setInterval(() => {
      const nextPage = (currentPage + 1) % totalpages;
      setCurrentPage(nextPage);
      pagerRef.current.setPage(nextPage);
    }, 3000); // Adjust the interval (in milliseconds) based on your preference

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(autoSlideInterval);
    };
  }, [currentPage, highlights]);

  return (
    <>
      <ImageBackground
        // source={{ uri: 'https://res.cloudinary.com/dcqw5mziu/image/upload/v1737490960/homeBg_kaktwp.png' }}
        source={require('../../assets/images/homeBg.png')} // Replace with your image path
        style={StyleSheet.absoluteFill}
        resizeMode="cover" // Adjust the image scaling ('cover', 'contain', or 'stretch')
      >
        <View
          // useAngle
          // angle={-128.06}
          style={[styles.container]}
        >

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.containerStyle}
            >
              <ScrollView>
                <List.Accordion
                  title="Categories"
                  style={styles.accordion}
                  titleStyle={styles.accordionTitle}
                >
                  <View>
                    <RadioButton.Group
                      onValueChange={(newValue) => setFilterCategory(newValue)}
                      value={filterCategory}
                    >
                      {categories.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              if (filterCategory === item) {
                                setFilterCategory("");
                              } else {
                                setFilterCategory(item);
                              }
                            }}
                          >
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
                  titleStyle={styles.accordionTitle}
                >
                  <View>
                    <RadioButton.Group
                      onValueChange={(newValue) => setFilterVenue(newValue)}
                      value={filterVenue}
                    >
                      {venues.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              if (filterVenue === item) {
                                setFilterVenue("");
                              } else {
                                setFilterVenue(item);
                              }
                            }}
                          >
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
              </ScrollView>
              <View style={styles.modalFooter}>
                <Button mode="contained" onPress={handleResetModal}>
                  Reset
                </Button>
                <Button mode="contained" onPress={hideModal}>
                  Done
                </Button>
              </View>
            </Modal>
          </Portal>

          <Navbar navigation={navigation} />


          <ScrollView
            style={[styles.container, { marginTop: 80 }]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
          >
            {isLoading ? (
              <ActivityIndicator
                animating={true}
                color="#5443ab"
                size="large"
                style={{ marginTop: 20 }}
              />
            ) : (
              <>
                {isguest ? (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL("https://ecell.in/esummit/register");
                    }}
                  >
                    <View
                      style={[
                        styles.section,
                        { backgroundColor: "red", padding: 25, paddingBottom: 7 },
                      ]}
                    >
                      <Text style={{ color: "#fff", fontFamily: "Proxima" }}>
                        You are Signed in as guest user
                      </Text>
                      <Text style={{ color: "#fff", fontFamily: "Proxima" }}>
                        Register Now and Relogin to get entry in E-Summit
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 20,
                          fontFamily: "ProximaBold",
                        }}
                      >
                        Click here!
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <View style={styles.section}>
                  <Text style={styles.heading}>HIGHLIGHT SESSIONS</Text>

                  <PagerView
                    style={styles.pagerView}
                    initialPage={0}
                    onPageSelected={(event) =>
                      setCurrentPage(event.nativeEvent.position)
                    }
                    ref={pagerRef}
                  >
                    {EventData?.data?.highlights?.map((item, index) => (
                      <View key={index}>
                        <Highlight
                          url={item.image}
                          alt={item.name}
                          id={item.id}
                          index={index}
                          length={EventData?.data?.highlights?.length || 0}
                          venue={item.venue.name}
                          day={item.day}
                          startTime={item.startTime}
                          isLive={
                            new Date(item.startTime) < new Date() &&
                            new Date(item.endTime) > new Date()
                          }
                          navigation={navigation}
                        />
                      </View>
                    )) || []}
                  </PagerView>
                  <View style={styles.dots}>
                    {Array(EventData?.data?.highlights?.length || 0).fill(0).map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.dot,
                          {
                            backgroundColor: currentPage === index ? '#ffe100' : '#fff',
                          }
                        ]}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.headcont2}>
                  <Button
                    style={[
                      styles.daybutton,
                      {
                        backgroundColor:
                          filterDay.length === 3 ? "#FFE100" : "hsla(0, 0.00%, 100.00%, 0.05)",
                      },
                    ]}
                    onPress={() => setFilterDay(["0","1", "2"])}
                  >
                    <Text style={[styles.daybuttonText, { color: filterDay.length === 3 ? "#000000" : "#ffffff" }]}>ALL</Text>
                  </Button>
                  <Button
                    style={[
                      styles.daybutton,
                      {
                        backgroundColor:
                          filterDay.includes("0") && filterDay.length === 1
                            ? "#FFE100"
                            : "hsla(0, 0.00%, 100.00%, 0.05)",
                      },
                    ]}
                    onPress={() => setFilterDay(["0"])}
                  >
                    <Text style={[styles.daybuttonText, { color: filterDay.includes("0") && filterDay.length === 1 ? "#000000" : "#ffffff" }]}>DAY 0</Text>
                  </Button>
                  <Button
                    style={[
                      styles.daybutton,
                      {
                        backgroundColor:
                          filterDay.includes("1") && filterDay.length === 1
                            ? "#FFE100"
                            : "hsla(0, 0.00%, 100.00%, 0.05)",
                      },
                    ]}
                    onPress={() => setFilterDay(["1"])}
                  >
                    <Text style={[styles.daybuttonText, { color: filterDay.includes("1") && filterDay.length === 1 ? "#000000" : "#ffffff" }]}>DAY 1</Text>
                  </Button>
                  <Button
                    style={[
                      styles.daybutton,
                      {
                        backgroundColor:
                          filterDay.includes("2") && filterDay.length === 1
                            ? "#FFE100"
                            : "hsla(0, 0.00%, 100.00%, 0.05)",
                      },
                    ]}
                    onPress={() => setFilterDay(["2"])}
                  >
                    <Text style={[styles.daybuttonText, { color: filterDay.includes("2") && filterDay.length === 1 ? "#000000" : "#ffffff" }]}>DAY 2</Text>
                  </Button>
                </View>

                <View style={styles.section}>
                  {/* <Text style={styles.heading}>CATEGORIES</Text> */}

                  <View style={styles.iconsContainer}>
                    <TouchableOpacity
                      onPress={() => togglefilter("oat")}
                      style={
                        filterCategory === "oat" ? styles.icon2 : styles.icon
                      }
                    >
                      {/* <Image
                      source={require("../../assets/images/oaticon.png")}
                      style={{ width: 40, height: 40 }}
                    /> */}
                      <Text style={[styles.iconText, { color: filterCategory === "oat" ? "#000000" : "#ffffff" }]}>OAT Event</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => togglefilter("ltpcsa")}
                      style={
                        filterCategory === "ltpcsa" ? styles.icon2 : styles.icon
                      }
                    >
                      {/* <Image
                      source={require("../../assets/images/pcsaicon.png")}
                      style={{ width: 40, height: 40 }}
                    /> */}
                      <Text style={[styles.iconText, { color: filterCategory === "ltpcsa" ? "#000000" : "#ffffff" }]}>LT-PCSA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => togglefilter("lhc")}
                      style={
                        filterCategory === "lhc" ? styles.icon2 : styles.icon
                      }
                    >
                      {/* <Image
                      source={require("../../assets/images/workshop.png")}
                    /> */}
                      <Text style={[styles.iconText, { color: filterCategory === "lhc" ? "#000000" : "#ffffff" }]}>LHC Sessions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => togglefilter("convo")}
                      style={
                        filterCategory === "convo" ? styles.icon2 : styles.icon
                      }
                    >
                      {/* <Image
                      source={require("../../assets/images/convoicon.png")}
                      style={{ width: 40, height: 40 }}
                    /> */}
                      <Text style={[styles.iconText, { color: filterCategory === "convo" ? "#000000" : "#ffffff" }]}>Convocation Hall</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => togglefilter("startup events")}
                      style={
                        filterCategory === "startup events"
                          ? styles.icon2
                          : styles.icon
                      }
                    >
                      {/* <Image
                      source={require("../../assets/images/startupicon.png")}
                    /> */}
                      <Text style={[styles.iconText, { color: filterCategory === "startup events" ? "#000000" : "#ffffff" }]}>Startup Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => togglefilter("student events")}
                      style={
                        filterCategory === "student events"
                          ? styles.icon2
                          : styles.icon
                      }
                    >
                      {/* <Image
                      source={require("../../assets/images/studenticon.png")}
                    /> */}
                      <Text style={[styles.iconText, { color: filterCategory === "student events" ? "#000000" : "#ffffff" }]}>Student Events</Text>
                    </TouchableOpacity>
                  </View>
                </View>


                {onGoingEvents.length > 0 && (
                  <View style={styles.section}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={[styles.heading, { alignSelf: "center" }]}>
                        ONGOING EVENTS
                      </Text>
                      {/* <TouchableOpacity onPress={showModal}>
                      <FilterSvg />
                    </TouchableOpacity> */}
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <View style={styles.events}>
                        {filterData(
                          onGoingEvents,
                          filterCategory,
                          filterDay,
                          filterVenue
                        ).map((item, index) => (
                          <Event
                            key={index}
                            id={item.id}
                            url={item.image}
                            event={item.name}
                            description={item.description}
                            venue={item.venue.name}
                            latitude={item.venue.latitude}
                            longitude={item.venue.longitude}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            navigation={navigation}
                            tag="ongoing"
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                )}

                {upcommingEvents.length > 0 && (
                  <View style={styles.section}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.heading}>UPCOMING EVENTS</Text>
                      {/* <TouchableOpacity onPress={showModal}>
                      <FilterSvg />
                    </TouchableOpacity> */}
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <View style={styles.events}>
                        {filterData(
                          upcommingEvents,
                          filterCategory,
                          filterDay,
                          filterVenue
                        ).map((item, index) => (
                          <Event
                            key={index}
                            id={item.id}
                            url={item.image}
                            event={item.name}
                            description={item.description}
                            venue={item.venue.name}
                            latitude={item.venue.latitude}
                            longitude={item.venue.longitude}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            navigation={navigation}
                            tag="upcoming"
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                )}

                {completedEvents.length > 0 && (
                  <View style={styles.eventsCont}>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.heading}>COMPLETED EVENTS</Text>
                      {/* <TouchableOpacity onPress={showModal}>
                      <FilterSvg />
                    </TouchableOpacity> */}
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <View style={styles.events}>
                        {filterData(
                          completedEvents,
                          filterCategory,
                          filterDay,
                          filterVenue
                        ).map((item, index) => (
                          <Event
                            key={index}
                            id={item.id}
                            url={item.image}
                            event={item.name}
                            description={item.description}
                            venue={item.venue.name}
                            latitude={item.venue.latitude}
                            longitude={item.venue.longitude}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            navigation={navigation}
                            tag="completed"
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                )}

                <View style={{ marginBottom: 70 }}></View>
              </>
            )}
          </ScrollView>
        </View>
        {/* <View style={styles.fab}>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('1')
                ? '#9fc43a'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('1')}>
          <Text style={[styles.fabButtonText, {
              color: filterDay.includes('1')
                ? '#000000'
                : '#FFFFFF',
            },]}>Day 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('2')
                ? '#9fc43a'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('2')}>
          <Text style={[styles.fabButtonText, {
              color: filterDay.includes('2')
                ? '#000000'
                : '#FFFFFF',
            },]}>Day 2</Text>
        </TouchableOpacity>
      </View> */}
        <View style={{ backgroundColor: "rgba(255,255,255,0)" }}>
          <GetEntry navigation={navigation} />
        </View>
        <Footer navigation={navigation} />
      </ImageBackground>

    </>
  );
};

const styles = StyleSheet.create({

  headcont2: {
    // width: '95%',
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
    marginVertical: 10,
    // marginLeft: -1,
    // paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1, // Thickness of the border
    borderColor: "hsla(0, 0.00%, 100.00%, 0.1)", // Color of the border
    borderRadius: 25,
    // borderTopRightRadius: 25,
    // borderBottomRightRadius: 25,
  },
  innerheadcont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    // backgroundColor: "#05020E",
    width: '100%',
    marginRight: 10,
  },
  profileIcon: {
    borderRadius: 50,
    backgroundColor: '#FFE100',
    width: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileiconText: {
    fontFamily: 'ProximaBold',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
  },
  daybutton: {
    backgroundColor: "#FFE100",
    color: "#ffffff",
    width: 70,
    marginHorizontal: 5,
  },
  daybuttonText: {
    // fontFamily: "Proxima",
    fontFamily: 'ProximaBold',
    color: "#ffffff",
  },
  container: {
    height: "100%",
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
    margin: 3,
    // paddingVertical: 5,
    paddingHorizontal: 10,
  },
  heading: {
    fontFamily: "ProximaExtraBold",
    fontSize: 20,
    fontWeight: "normal",
    letterSpacing: 0.8,
    lineHeight: 24,
    color: "#FFFFFF",
    margin: 15,
    marginBottom: 0,
  },
  pagerView: {
    height: 210,
  },
  eventsCont: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.05)", // Semi-transparent background
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 80,
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
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
    paddingTop: 10,
  },
  itemText: {
    // fontFamily: 'Poppins',
    fontSize: 14,
    textTransform: "uppercase",
    color: "#000",
  },
  fab: {
    position: "absolute",
    right: 0,
    top: "45%",
    transform: [{ rotate: "270deg" }, { translateY: 30 }],
    flexDirection: "row",
    backgroundColor: "#161616",
  },
  fabButton: {
    backgroundColor: "#9fc43a",
    borderColor: "#9fc43a",
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
    color: "#000000",
    // fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  iconsContainer: {
    // margin: 5,
    // padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    margin: 5,
    padding: 5,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.07)", // Semi-transparent background
    aspectRatio: 2,
  },
  icon2: {
    margin: 5,
    padding: 5,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE100",
    borderRadius: 12,
    aspectRatio: 2,
  },
  iconText: {
    color: "#ffffff",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "ProximaBold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
