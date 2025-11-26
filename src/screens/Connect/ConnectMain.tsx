import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Image,
  TextInput,
  ImageBackground
} from 'react-native';
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
  Button
} from 'react-native-paper';
// import 'react-native-gesture-handler';
import { Event, Highlight } from '../../components/home';
import { Footer } from '../../components/shared';
import FilterSvg from '../../components/svgs/filter';
import { useGetConnectQuery } from '../../hooks/query/user-query';
import { useEventStore } from '../../store/events-store';
import { filterConnect, filterData } from '../../utils/helper';
import { useProfileStore } from '../../store/profile-store';
// import { Button } from '../../components/form';
import { ConnectCard } from '../../components/connect';
import IconBadge from 'react-native-icon-badge'

export const ConnectMain = () => {
  const email = useProfileStore(state => state.email);
  const name = useProfileStore(state => state.name);
  const { data: ConnectData, isLoading, refetch } = useGetConnectQuery(email);

  const Connects = ConnectData?.connects

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const navigation = useNavigation();

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

  const handleNavigate = () => {
    console.log('Navigated')
    navigation.navigate('YourConnect' as never)
  }

  // const handleDayFilter = day => {
  //   if (filterDay.includes(day)) {
  //     setFilterDay(filterDay.filter(item => item !== day));
  //   } else {
  //     setFilterDay([...filterDay, day]);
  //   }
  // };

  const [searchText, setSearchText] = useState('')

  const onChangeSearch = (text) => {
    setSearchText(text)
  }

  return (
        <>
      <ImageBackground
        source={require('../../assets/images/homeBg.png')}
        style={styles.container}
        resizeMode="cover">
          <View style={styles.header}>
              <View style={styles.headcont}>
                <View style={styles.profileIcon}>
                  <Button onPress={() => navigation.navigate('Profile' as never)}>
                    <Text style={styles.profileiconText}>{name[0]}</Text>
                  </Button>
                </View>
                <View style={{width: '60%'}}>
                  <TextInput style={styles.input} 
                    selectionColor={'#ffffff'}
                    placeholder='Search'
                    placeholderTextColor={'white'}
                    value={searchText} onChangeText={onChangeSearch} />
                  </View>
                  <View>
                    <IconBadge 
                    MainElement={
                      <Button style={styles.connectbutton} onPress={() => {navigation.navigate('YourConnect' as never)}}>
                      <Text style={styles.connectbtnText}>Connects</Text>
                    </Button>
                    } IconBadgeStyle={
                    {position:'absolute',
                    top:-10,
                    right:0,}
                    } />
                  </View>
              </View>
            </View>
        <ScrollView
          style={[styles.container, { marginTop: 80 }]}
          contentContainerStyle={{ paddingBottom: 100 }}
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
            {/* <Button title='My Connections' onPress={() => handleNavigate()}/>
            <Button title='Edit Profile' onPress={() => navigation.navigate('EditProfile' as never)}/> */}
            <Text style={styles.heading}>People with Similar Interests</Text>
            <View style={styles.section}>
              {Connects === null || Connects === undefined? (
                <>
                <Text style={styles.subheading}>You are a guest user. Sign In with registered email to access to networking feature</Text>
                </>
              ):(
                filterConnect(
                  Connects,
                  searchText
                ).map((item, index) => (
                    <View key={index}>
                      <ConnectCard id={item.id} name={item.name} company_name={item.company_name} url='https://ecell.in' persontype={item.persontype} description='This is the description' navigation={navigation} btnText='Connect' />
                    </View>
                ))
              )}
            </View>
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
      {/* <View style={{backgroundColor: 'rgba(0,0,0,0.9)', borderWidth: 2, borderColor: '#ffffff'}}> */}
      <Footer navigation={navigation} />
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: 20,
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'center'
  },
  headcont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%'
    // paddingHorizontal: 20
  },
  insideheadcont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  profileIcon: {
    borderRadius: 50, 
    backgroundColor: '#FFE100',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFE100',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  daybutton: {
    backgroundColor: '#FFE100',
    color: '#ffffff',
    width: 70,
    marginHorizontal: 5
  },
  daybuttonText: {
    fontFamily: 'Proxima',
    color: '#ffffff'
  },
  profileiconText: {
    fontFamily: 'ProximaBold',
    textTransform: 'uppercase',
    color: '#1e1e1e',
    fontSize: 16,
    padding: 0,
    margin: 0
  },
  inputbox: {
    width: '60%',
  },
  connectbox: {},
  connectbutton: {
    backgroundColor: '#1e1e1e',
    borderWidth: 2,
    borderColor: '#FFE100',
    borderRadius: 20,
    shadowColor: '#FFE100',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  connectbtnText: {
    fontFamily: 'Proxima',
    color: '#FFE100',
    fontSize: 11,
    paddingHorizontal: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#FFFFFF',
        fontSize: 14,
        marginTop: 2,
        paddingHorizontal: 18,
        width: '100%',
        borderRadius: 24,
        height: '100%',
        borderWidth: 1,
        borderColor: '#FFE100',
        shadowColor: '#FFE100',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
  container: {
    // paddingVertical: 5,
    height: '100%',
    flex: 1,
    // backgroundColor: '#05020E',
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
    marginBottom: 20,
  },
  subheading: {
    fontFamily: 'Proxima',
    fontSize: 15,
    color: '#A2A2A2',
    marginLeft: 25,
    marginBottom: 20,
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
    // // fontFamily: 'Poppins',
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
    // fontFamily: 'Poppins',
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
    color: '#FFFFFF',
    // fontFamily: 'Poppins',
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
