import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import LiveSvg from '../svgs/live';
import LocationSvg from '../svgs/location';
import { getTime } from '../../utils/helper';

interface IHighlightBoxProps {
  id: string;
  url: string;
  alt: string;
  index: number;
  length: number;
  venue: string;
  day: string;
  startTime: any;
  isLive?: boolean;
  navigation: any;
}

export const HighlightBox = (props: IHighlightBoxProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.navigate('Event', { id: props.id })}>
      <View style={styles.container2}>
        <View style={styles.backgroundContainer}>
          {props.url === null || props.url === undefined ? (
            <Image
              source={require('../../assets/images/user_image.jpg')}
              resizeMode={'cover'}
              style={styles.backgroundImage}
            />
          ) : (
            <Image
              source={{ uri: props.url }}
              resizeMode={'cover'}
              style={styles.backgroundImage}
            />
          )}
        </View>
        <View style={styles.filterOverlay} />
        <View style={styles.content2}>
          <Text style={styles.alt}>{props.alt}</Text>
          <Text style={styles.alt2}><LocationSvg width={15} height={15} /> {props.venue} </Text>
          <Text style={styles.alt3}>Day {props.day} | {getTime(props.startTime)}</Text>
          {props.isLive ? (<LiveSvg style={{ position: 'absolute', bottom: 10, right: 10 }} />) : (<></>)}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container2: {
    borderRadius: 25,
    margin: 10,
    height: 200,
    backgroundColor: '#232323',
    shadowColor: '#000',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  filterOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay for a dim effect
  },

  content2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  alt: {
    fontSize: 16,
    fontFamily: 'ProximaBold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  alt2: {
    fontFamily: 'Proxima',
    fontSize: 12,
    color: '#9D9D9D',
    marginBottom: 2,
  },
  alt3: {
    fontFamily: 'Proxima',
    fontWeight: '900',
    color: '#ffffff',
    fontSize: 14,
  },

});
