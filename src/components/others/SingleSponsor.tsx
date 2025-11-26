import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';

interface ISingleSponsorProps {
  image: string;
  link: string;
  name: string;
}

export const SingleSponsor = (props: ISingleSponsorProps) => {
  const handleClick = () => {
    if (props.link) {
      Linking.openURL(props.link);
    }
  };
  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={styles.sectionItem}>
        <Image
          source={{ uri: props.image }}
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
          }}
        />
        <Text style={styles.sponsor}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionItem: {
    margin: 10,

    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sponsor: {
    fontSize: 14,
    lineHeight: 16,
    paddingTop: 4,
    color: '#D3D3D3',
    // fontFamily: 'Poppins',
    textTransform: 'uppercase',
    textAlign: 'center',
    flex: 1,
    width: 100,
  },
});
