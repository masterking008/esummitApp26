import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface FooterProps {
  navigation: any;
}

interface TabItem {
  name: string;
  route: string;
  icon: any;
  label: string;
}

export const Footer: React.FC<FooterProps> = ({ navigation }) => {
  const route = useRoute();

  const tabs: TabItem[] = [
    { name: 'Home', route: 'Home', icon: require('../../assets/images/homeicon.png'), label: 'HOME' },
    { name: 'ConnectMain', route: 'ConnectMain', icon: require('../../assets/images/networkicon.png'), label: 'NETWORK' },
    { name: 'Map', route: 'Map', icon: require('../../assets/images/mapicon.png'), label: 'MAPS' },
    { name: 'More', route: 'More', icon: require('../../assets/images/moreicon.png'), label: 'MORE' },
  ];

  const renderTab = (tab: TabItem) => {
    const isActive = route.name === tab.route;
    
    return (
      <TouchableOpacity
        key={tab.name}
        style={styles.tab}
        onPress={() => navigation.navigate(tab.route)}
        activeOpacity={0.7}
      >
        <Image 
          source={tab.icon} 
          style={[styles.icon, { tintColor: isActive ? '#000' : '#555' }]} 
        />
        <Text style={[styles.text, { color: isActive ? '#000' : '#555' }]}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {tabs.map(renderTab)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '94%',
    height: 70,
    backgroundColor: '#FED606',
    position: 'absolute',
    borderRadius: 60,
    bottom: 20,
    marginHorizontal: '3%',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  icon: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },
  text: {
    fontSize: 11,
    fontFamily: 'ProximaBold',
    fontWeight: '500',
    textAlign: 'center',
  },
});
