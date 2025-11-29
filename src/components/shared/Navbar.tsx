import { useRoute } from '@react-navigation/native';
import React from 'react';

import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import CrossSvg from '../svgs/cross';
import EcellSvg from '../svgs/ecell';
import UserSvg from '../svgs/user';
import { useProfileStore } from '../../store/profile-store';
import { useFlowStore } from '../../store/flow-store';
import { FLOW_STAGES } from '../../contants';
import { Button } from 'react-native-paper';

export const Navbar = ({ navigation }) => {
  const route = useRoute();
  const setFlow = useFlowStore(state => state.setFlow);

  const handleClick = () => {
    if (route.name === 'Profile') {
      navigation.goBack();
    } else if (isSignedIn) {
      navigation.navigate('Profile');
    } else {
      // Navigate to sign in when not authenticated
      setFlow(FLOW_STAGES.AUTH);
      navigation.navigate('SignIn');
    }
  };

  const name = useProfileStore(state => state.name);
  const isSignedIn = useProfileStore(state => state.isSignedIn);

  return (

    <View style={styles.header}>
      <View style={styles.headcont}>
        <TouchableOpacity onPress={handleClick}>
          {route.name == 'Profile' ? (
            <View style={{ width: 40 }}>
              <CrossSvg />
            </View>
          ) : isSignedIn ? (
            <View style={styles.profileIcon}>
              <LinearGradient
                colors={['#FED606', '#FFE100']}
                style={styles.profileIcon}
              >
                <Button onPress={handleClick}>
                  <Text style={styles.profileiconText}>{name?.[0] || 'U'}</Text>
                </Button>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.innerheadcont}>
          {/* {route.name == 'Profile'? (
                    <CrossSvg />
                  ):(
                    <EcellSvg width={60} height={60} />
                  )} */}
          <Image
            source={require('../../assets/images/logowhite.png')}
            style={[{ width: 150, height: 35 }]}
            resizeMode="cover"
          />
          {/* <EcellSvg width={60} height={60} /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingTop: 20,
    width: '100%',
    zIndex: 10,
  },
  headcont: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center'
  },
  innerheadcont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    width: '100%',
    marginRight: 10,
  },
  profileIcon: {
    borderRadius: 50,
    width: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileiconText: {
    fontFamily: 'ProximaBold',
    textTransform: 'uppercase',
    color: '#1e1e1e',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#FED606',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'ProximaBold',
    color: '#1e1e1e',
    fontSize: 14,
  },
});
