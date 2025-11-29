import React from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import EventMenuSvg from '../svgs/events';
import MapsMenuSvg from '../svgs/maps';
import MoreMenuSvg from '../svgs/more';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useProfileStore } from '../../store/profile-store';
import { useFlowStore } from '../../store/flow-store';
import { FLOW_STAGES } from '../../contants';

export const GetEntry = ({ navigation }) => {
  const route = useRoute();
  const isSignedIn = useProfileStore(state => state.isSignedIn);
  const setFlow = useFlowStore(state => state.setFlow);

  const handleGetEntry = () => {
    if (isSignedIn) {
      navigation.navigate('ShowQr' as never);
    } else {
      // Redirect to login
      setFlow(FLOW_STAGES.AUTH);
      navigation.navigate('SignIn' as never);
    }
  };

  return (
    <View style={styles.containerx}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
         style={{ backgroundColor: '#05020E', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderWidth: 2, borderColor: '#E5BE52', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10 }} 
        onPress={handleGetEntry}>
          <Icon
            name="qr-code"
            size={20}
            style={{ paddingHorizontal: 5 }}
            color="#E5BE52"
          />
          <Text style={{ flexDirection: 'row', color: '#E5BE52', fontFamily: 'ProximaBold', alignItems: 'center', justifyContent: 'center' }}>
            {isSignedIn ? 'Get Entry' : 'Login for Entry'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerx: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0)',
    position: 'absolute',
    bottom: 100,
    zIndex: 200
  },
  
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 42,
    justifyContent: 'space-between',
    // height: 56,
    backgroundColor: '#222324',
    padding: 20,
    // backgroundColor: 'black',
    // borderWidth: 2,
    // borderColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
  },
  tabs: {
    alignSelf: 'center',
  },
  tabs2: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    transform: [
      { scale: 1.1 }
    ],
    borderRadius: 5,
    padding: 5
  },
  text: {
    color: '#fff',
    fontSize: 12,
    // lineHeight: 12,
    paddingTop: 4,
    fontFamily: 'Proxima',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
