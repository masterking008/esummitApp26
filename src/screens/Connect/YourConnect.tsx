import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import { Button } from 'react-native-paper';
// import { ScrollView, NativeViewGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import {
  ActivityIndicator,
  Divider,
  List,
  Modal,
  Portal,
  RadioButton,
} from 'react-native-paper';
// import 'react-native-gesture-handler';
import { Event, Highlight } from '../../components/home';
import { Footer } from '../../components/shared';
import FilterSvg from '../../components/svgs/filter';
import { useGetConnectQuery, useGetYourConnectQuery } from '../../hooks/query/user-query';
import { useEventStore } from '../../store/events-store';
import { filterData } from '../../utils/helper';
import { useProfileStore } from '../../store/profile-store';
// import { Button } from '../../components/form';
import { ConnectCard } from '../../components/connect';

export const YourConnect = () => {
  const email = useProfileStore(state => state.email);
  const { data: ConnectData, isLoading, refetch } = useGetYourConnectQuery(email);

  const Accepeted = ConnectData?.accepted
  const Waiting = ConnectData?.waiting
  const Received = ConnectData?.received

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const navigation = useNavigation();
  const [value, setValue] = useState('');

  const [page, setpage] = useState('accepted');

  const [categories, setCategories] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);

  const [filterCategory, setFilterCategory] = useState('');
  const [filterDay, setFilterDay] = useState<string[]>(['1', '2']);
  const [filterVenue, setFilterVenue] = useState('');

  const onGoingEvents = useEventStore(state => state.onGoing);
  const upcommingEvents = useEventStore(state => state.upcoming);
  const completedEvents = useEventStore(state => state.completed);
  const setOnGoingEvents = useEventStore(state => state.setOnGoing);
  const setUpcommingEvents = useEventStore(state => state.setUpcoming);
  const setCompletedEvents = useEventStore(state => state.setCompleted);

  const handleTextChange = (text: string) => {
    setValue(text)
  }

  const handleFilter = () => {
    setFilterCategory(value)
    setFilterDay(['1', '2']);
    setFilterVenue('');
  }

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
    setFilterCategory('');
    setFilterDay(['1', '2']);
    setFilterVenue('');
  };

  const handleSubmit = () => {
    console.log('Submitted')
  }

  const handleDayFilter = day => {
    if (filterDay.includes(day)) {
      setFilterDay(filterDay.filter(item => item !== day));
    } else {
      setFilterDay([...filterDay, day]);
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/homeBg.png')}
        style={styles.container}
        resizeMode="cover">
        {/* <Modal
            visible={visible}
            // onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <ScrollView>
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
            </ScrollView>
            <View style={styles.modalFooter}>
              <Button mode="contained" onPress={handleResetModal}>
                Reset
              </Button>
              <Button mode="contained" onPress={hideModal}>
                Done
              </Button>
            </View>
          </Modal> */}
        <ScrollView
          style={[styles.container, { marginBottom: 80, marginTop: 80 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color="#FFE100"
              size="large"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
              <View style={styles.header}>
                <View style={styles.headcont}>
                  <View style={styles.headcont}>
                    <Button style={page === 'accepted' ? styles.daybuttonSelected : styles.daybuttonUnselected} onPress={() => setpage('accepted')}>
                      <Text style={page === 'accepted' ? styles.daybuttonTextSelected : styles.daybuttonTextUnselected}>Connections</Text>
                    </Button>
                    <Button style={page === 'sent' ? styles.daybuttonSelected : styles.daybuttonUnselected} onPress={() => setpage('sent')}>
                      <Text style={page === 'sent' ? styles.daybuttonTextSelected : styles.daybuttonTextUnselected}>Sent</Text>
                    </Button>
                    <Button style={page === 'received' ? styles.daybuttonSelected : styles.daybuttonUnselected} onPress={() => setpage('received')}>
                      <Text style={page === 'received' ? styles.daybuttonTextSelected : styles.daybuttonTextUnselected}>Received</Text>
                    </Button>
                  </View>
                </View>
              </View>

              {page === 'accepted' ? (
                <>
                  <Text style={styles.heading}>Your Connections</Text>
                  <View style={styles.section}>
                    {Accepeted?.map((item, index) => (
                      <TouchableOpacity key={index}>
                        <ConnectCard id={item.id} name={item.name} company_name={item.company_name} url='https://ecell.in' persontype={item.persontype} description='This is the description' navigation={navigation} btnText='Know more' />
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              ) : page === 'received' ? (
                <>
                  <Text style={styles.heading}>Request Received</Text>
                  <View style={styles.section}>
                    {Received?.map((item, index) => (
                      <TouchableOpacity key={index}>
                        <ConnectCard id={item.id} name={item.name} company_name={item.company_name} url='https://ecell.in' persontype={item.persontype} description='This is the description' navigation={navigation} btnText='Accept' />
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.heading}>Sent Request</Text>
                  <View style={styles.section}>
                    {Waiting?.map((item, index) => (
                      <TouchableOpacity key={index}>
                        <ConnectCard id={item.id} name={item.name} company_name={item.company_name} url='https://ecell.in' persontype={item.persontype} description='This is the description' navigation={navigation} btnText='Requested' />
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
              {/* <View style={{marginHorizontal: 30}}>
            <Button title='Search More'/>
            </View> */}
            </>
          )}
        </ScrollView>
      </ImageBackground>
      {/* <View style={styles.fab}>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('1')
                ? '#46B1EE'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('1')}>
          <Text style={styles.fabButtonText}>Day 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('2')
                ? '#46B1EE'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('2')}>
          <Text style={styles.fabButtonText}>Day 2</Text>
        </TouchableOpacity>
      </View> */}
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    marginBottom: 10
  },
  headcont: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    width: '100%'
  },
  profileIcon: {
    borderRadius: 50,
    backgroundColor: '#A6CE3B',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  daybuttonSelected: {
    backgroundColor: '#FFE100',
    width: '30%',
    marginHorizontal: 5,
    borderRadius: 20,
  },
  daybuttonUnselected: {
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#FFE100',
    width: '30%',
    marginHorizontal: 5,
    borderRadius: 20,
  },
  daybuttonTextSelected: {
    fontFamily: 'ProximaBold',
    color: '#1e1e1e',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  daybuttonTextUnselected: {
    fontFamily: 'Proxima',
    color: '#FFE100',
    fontWeight: '600',
    fontSize: 11,
    letterSpacing: 0.2,
  },
  profileiconText: {
    fontFamily: 'ProximaBold',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 20
  },
  input: {
    backgroundColor: 'hsla(0, 0.00%, 100.00%, 0.02)',
    color: '#FFFFFF',
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    marginTop: 2,
    padding: 12,
  },
  container: {
    height: '100%',
    flex: 1,
  },
  containerStyle: {
    backgroundColor: '#BBD4E2',
    width: '70%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    maxHeight: Dimensions.get('window').width,
  },
  section: {
    paddingTop: 5,
    paddingHorizontal: 12,
    paddingBottom: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  heading: {
    fontFamily: 'ProximaBold',
    fontSize: 23,
    lineHeight: 28,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginLeft: 25,
    marginBottom: 10,
  },
  pagerView: {
    height: 180,
  },
  events: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    justifyContent: 'center',
  },
  itemList: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  accordion: {
    backgroundColor: '#DCE9F0',
  },
  accordionTitle: {
    fontFamily: 'Proxima',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#141415',
  },
  divider: {
    height: 3,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  itemText: {
    fontFamily: 'Proxima',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  fab: {
    position: 'absolute',
    right: 0,
    top: '45%',
    transform: [{ rotate: '270deg' }, { translateY: 30 }],
    flexDirection: 'row',
    backgroundColor: '#161616',
  },
  fabButton: {
    backgroundColor: '#46B1EE',
    borderColor: '#46B1EE',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderRadius: 0,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  fabButtonText: {
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    fontSize: 10,
    lineHeight: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  card: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    backgroundColor: '#000000',
    width: 150,
    borderRadius: 20,
    height: 200
  }
});
