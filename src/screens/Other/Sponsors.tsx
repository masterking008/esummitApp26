import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { SingleSponsor } from '../../components/others';
import { Footer } from '../../components/shared';
import { useSponsors } from '../../hooks/query/other-query';

export const Sponsors = () => {
  const { data, isLoading, refetch } = useSponsors();
  const navigation = useNavigation();

  const uniqueTag = useMemo(() => {
    return [...new Set(data?.map(item => item.tag))];
  }, [data]);

  return (
    <>
      <LinearGradient
        colors={['#1F292F', '#000000']}
        // useAngle
        // angle={-128.06}
        style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color="#FFE100"
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : (
          <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                refetch();
              }}
            />
          }>
            {uniqueTag?.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.heading}>{item}</Text>
                  <View style={styles.section}>
                    {data
                      ?.filter(e => e.tag === item)
                      .map((i, ind) => {
                        return (
                          <SingleSponsor
                            key={ind}
                            name={i.name}
                            link={i.link}
                            image={i.image}
                          />
                        );
                      })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </LinearGradient>
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 20,
    paddingBottom: 45,
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    color: '#FFFFFF',
    // fontFamily: 'Poppins',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
