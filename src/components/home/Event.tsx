import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { getTime } from '../../utils/helper';
import { Button } from 'react-native-paper';
import LocationSvg from '../svgs/location';
import { mapUrl } from '../../utils/helper';
interface IEventBoxProps {
  id: string;
  url: string;
  event: string;
  venue: string;
  latitude: string;
  longitude: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
  description: string;
  navigation: any;
  tag: any;
}

export const EventBox = (props: IEventBoxProps) => {
  const ImageComponent = useMemo(() => {
    return (
      props.url === null || props.url === undefined ? (
        <Image
          source={require('../../assets/images/user_image.jpg')}
          resizeMode={'cover'}
          style={styles.image}
        />
      ) : (
        <Image
          source={{ uri: props.url }}
          resizeMode={'cover'}
          style={styles.image}
        />
      )
    );
  }, [props.url]);

  const url = mapUrl(props.latitude, props.longitude);
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Event', { id: props.id })} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {ImageComponent}
        </View>
        <View style={styles.contentContainer}>
          <Text numberOfLines={2} style={styles.eventTitle}>{props.event}</Text>
          <View style={styles.venueContainer}>
            <LocationSvg width={12} height={12} />
            <Text style={styles.venueText}>{props.venue}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>
              {props.tag === 'upcoming' ? 'Starts at' : props.tag === 'ongoing' ? 'Ends at' : 'Ended at'}
            </Text>
            <Text style={styles.timeValue}>
              {getTime(props.tag === 'upcoming' ? props.startTime : props.endTime)}
            </Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={[styles.statusBadge, { backgroundColor: props.tag === 'ongoing' ? '#4CAF50' : props.tag === 'upcoming' ? '#FF9800' : '#757575' }]}>
            <Text style={styles.statusText}>{props.tag.toUpperCase()}</Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(url as string)} style={styles.directionButton}>
            <Image
              source={require('../../assets/images/direction.png')}
              style={styles.directionIcon}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: Dimensions.get('window').width - 32,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 150,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    flex: 1,
    width: 150,
    height: '100%',
  },
  rightColumn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'ProximaBold',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontFamily: 'ProximaBold',
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  venueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  venueText: {
    fontFamily: 'Proxima',
    color: '#9D9D9D',
    fontSize: 12,
    marginLeft: 4,
  },
  timeContainer: {
    alignItems: 'flex-start',
  },
  timeLabel: {
    fontFamily: 'Proxima',
    color: '#9D9D9D',
    fontSize: 11,
  },
  timeValue: {
    fontFamily: 'ProximaBold',
    color: '#FFE100',
    fontSize: 14,
  },
  directionButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionIcon: {
    width: 36,
    height: 36,
  },
});
