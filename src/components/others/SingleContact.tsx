import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { Avatar } from 'react-native-paper';

interface ISingleContactProps {
  name: string;
  phone: string;
  email: string;
  image: string;
}

export const SingleContact = (props: ISingleContactProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Avatar.Image
          size={45}
          source={{
            uri: props.image,
          }}
          style={styles.avatar}
        />
        <Text style={[styles.center, { paddingHorizontal: 10 }, styles.name]}>
          {props.name}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.center}
          onPress={() => Linking.openURL(`tel:${props.phone}`)}>
          <Avatar.Icon icon="phone" size={30} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.center}
          onPress={() => Linking.openURL(`mailto:${props.email}`)}>
          <Avatar.Icon icon="email" size={30} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  center: {
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  name: {
    // fontFamily: 'Poppins',
    fontSize: 15,
    lineHeight: 18,
    color: '#D3D3D3',
    textTransform: 'capitalize',
  },
  avatar: {
    backgroundColor: '#FED606',
    color: '#1e1e1e'
  }
});
