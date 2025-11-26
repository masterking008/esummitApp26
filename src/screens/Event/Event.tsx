import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, FAB, SegmentedButtons, Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { SegmentButton } from '../../components/form';
import { Footer } from '../../components/shared';
import {
  useGetCoordinatesMutation,
  useSetReminderMutation,
  useSetTagMutation,
} from '../../hooks/mutation/user-action-mutation';
import { useEventById } from '../../hooks/query/events-query';
import { useGetTagsAndReminder } from '../../hooks/query/user-query';
import { useProfileStore } from '../../store/profile-store';
import { getTime, mapUrl } from '../../utils/helper';
// import PushNotification from 'react-native-push-notification';
import * as Notifications from 'expo-notifications';
import { LocationIcon, CalendarIcon, ClockIcon, BellIcon, BellOffIcon } from '../../components/Icons.tsx';

export const Event = ({ route }) => {
  const { data: EventData, isLoading } = useEventById(route.params.id);

  const [value, setValue] = useState('');
  const [isNotified, setIsNotified] = useState(false);

  const email = useProfileStore(state => state.email);
  const name = useProfileStore(state => state.name);

  const { data: ReminderAndTagData, isLoading: ReminderAndTagLoading } =
    useGetTagsAndReminder(email, route.params.id);

  const { mutateAsync: coordinates } = useGetCoordinatesMutation();

  const handleVenueClick = async () => {
    // coordinates({ venue: EventData?.data.venue.name as string }).then(res => {
    //   if (res.success) {
    //     const url = mapUrl(res.data.latitude, res.data.longitude);
    //     return Linking.openURL(url as string);
    //   }
    // });
    // console.log(EventData?.data.venue)
    const url = mapUrl(EventData?.data.venue.latitude, EventData?.data.venue.longitude);
    return Linking.openURL(url as string)
  };

  const { mutateAsync: setReminder } = useSetReminderMutation();

  const { mutateAsync: setTag } = useSetTagMutation();

  const navigation = useNavigation();
  const toast = useToast();
  const startTime: any = EventData?.data.startTime
  const endTime: any = EventData?.data.endTime

  useEffect(() => {
    if (!ReminderAndTagLoading) {
      if (ReminderAndTagData?.data.tag) {
        setValue(ReminderAndTagData?.data.tag);
      }
      setIsNotified(ReminderAndTagData?.data.reminders || false);
    }
  }, [ReminderAndTagLoading]);

  const handleScheduleNotification = async () => {
    const description =
      EventData?.data.name +
      ' is starting in 15 minutes at ' +
      EventData?.data.venue +
      '.';

    const notificationcontent = {
      title: EventData?.data.name,
      body: description
    }

    const triggerDate = new Date(new Date(EventData?.data.startTime as string).getTime() - 15 * 60 * 1000);
    Notifications.scheduleNotificationAsync({
      content: notificationcontent,
      trigger: { type: 'date', date: triggerDate }
    })
    // PushNotification.localNotificationSchedule({
    //   channelId: 'fcm_fallback_notification_channel',
    //   title: EventData?.data.name,
    //   f: description,
    //   date: new Date(
    //     new Date(EventData?.data.startTime as string).getTime() +
    //       15 * 50 * 1000,
    //   ),
    //   allowWhileIdle: true,
    //   picture: EventData?.data.image,
    //   playSound: true,
    //   soundName: 'default',
    //   id: EventData?.data.id,
    // });
  };

  const handleNotify = async () => {
    setReminder({ id: route.params.id, email: email }).then(data => {
      if (data.success) {
        handleScheduleNotification();
        toast.show('We will notify 15 minutes before the event', {
          type: 'success',
        });
        isNotified ? setIsNotified(false) : setIsNotified(true);
      } else {
        toast.show('Some Error has occured. Please try again later.', {
          type: 'danger',
        });
      }
    });
  };

  const handleTag = async (val: string) => {
    setTag({ id: route.params.id, email: email, tag: val }).then(data => {
      if (data.success) {
        if (val !== 'not going') {
          handleScheduleNotification();
        }
        toast.show('Response has been recorded', {
          type: 'success',
        });
        setValue(val);
      } else {
        if (data.isdeleted) {
          toast.show('Response Deleted', {
            type: 'danger',
          });
          setValue('')
        }
        else {
          toast.show('All seats are full', {
            type: 'danger',
          });
          setValue('')
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.profileIcon}
          onPress={() => navigation.navigate('Profile' as never)}
        >
          <Text style={styles.profileiconText}>{name[0]}</Text>
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFE100" />
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.imageContainer}>
            <Image
              source={EventData?.data.image ? { uri: EventData.data.image } : require('../../assets/images/user_image.jpg')}
              style={styles.eventImage}
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.eventTitle}>{EventData?.data.name}</Text>
            
            <View style={styles.actionContainer}>
              <SegmentButton
                value={value}
                onValueChange={handleTag}
                buttons={value === 'reserve a seat' ? ['seat reserved'] : ['reserve a seat']}
              />
            </View>

            <View style={styles.detailsContainer}>
              <TouchableOpacity style={styles.detailItem} onPress={handleVenueClick}>
                <View style={styles.detailIcon}>
                  <LocationIcon size={20} color="#1e1e1e" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Venue</Text>
                  <Text style={styles.detailValue}>{EventData?.data.venue.name}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.detailItem}>
                <View style={styles.detailIcon}>
                  <CalendarIcon size={20} color="#1e1e1e" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>
                    {EventData?.data.day === '1' ? '11th December' : '12th December'}
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <View style={styles.detailIcon}>
                  <ClockIcon size={20} color="#1e1e1e" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>
                    {getTime(startTime)} - {getTime(endTime)}
                  </Text>
                </View>
              </View>
            </View>

            {EventData?.data.speakers && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Speakers</Text>
                <View style={styles.speakersContainer}>
                  <Text style={styles.speakersText}>{EventData.data.speakers}</Text>
                </View>
              </View>
            )}

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>About Session</Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{EventData?.data.description}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.notifyButton} onPress={handleNotify}>
          <View style={styles.notifyIconContainer}>
            {isNotified ? (
              <BellOffIcon size={18} color="#1e1e1e" />
            ) : (
              <BellIcon size={18} color="#1e1e1e" />
            )}
          </View>
          <Text style={styles.notifyText}>
            {isNotified ? 'Notifications On' : 'Notify Me'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05020E',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 10,
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE100',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profileiconText: {
    fontFamily: 'ProximaBold',
    fontSize: 18,
    color: '#1e1e1e',
    textTransform: 'uppercase',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#161616',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  eventTitle: {
    fontSize: 28,
    fontFamily: 'ProximaBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 34,
  },
  actionContainer: {
    marginBottom: 32,
  },
  detailsContainer: {
    marginBottom: 32,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE100',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Proxima',
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'ProximaBold',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'ProximaBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  speakersContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  speakersText: {
    fontSize: 16,
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  descriptionContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE100',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  notifyIconContainer: {
    marginRight: 8,
  },
  notifyText: {
    fontSize: 14,
    fontFamily: 'ProximaBold',
    color: '#1e1e1e',
  },
});
