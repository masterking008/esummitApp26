import React from 'react';
import { Dimensions, Image, Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import { mapUrl } from '../../utils/helper';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { BlurView } from 'expo-blur';



interface ILocationProps {
  name: string;
  image: string;
  latitude: string;
  longitude: string;
}

export const Location = (props: ILocationProps) => {
  const url = mapUrl(props.latitude, props.longitude);
  return (
    <>

      <TouchableOpacity onPress={() => Linking.openURL(url as string)}>

        <View
          style={styles.container} >
          <Text style={styles.name}>{props.name.length > 11 ? `${props.name.slice(0, 11)}...` : props.name}</Text>
          <Image
            // source={require('../../assets/images/building.png')}
            source={{ uri: props.image }}
            style={styles.image}
            resizeMode="cover"
            blurRadius={0}
          />
          <Image
            source={require('../../assets/images/direction.png')}
            style={styles.icon}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1.13,
    width: (Dimensions.get('window').width - 60) / 2,
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.05)",
    borderWidth: 0.5,
    borderColor: "hsla(0, 0.00%, 100.00%, 0.1)",
    margin: 10,
    borderRadius: 25,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    height: 117,
    aspectRatio: 1,
    // position: 'absolute',
    bottom: 11,
    right: 18,
  },
  icon: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    right: 10,
    // bottom: 25,
    // right: -7,
  },
  name: {
    fontFamily: 'Proxima',
    fontSize: 18,
    color: '#fff',
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3D3C3C',
  },
});
