import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { useSchedule } from '../../hooks/query/other-query';

interface IScheduleProps {
  open: any;
  setSchedule: any;
}

export const Schedule = (props: IScheduleProps) => {
  const { data: ScheduleData, isLoading } = useSchedule();

  const handleOpen = (url: string) => {
    props.setSchedule(url);
    props.open();
  };

  return (
    <View style={styles.content1}>
      <List.Accordion
        title="OVERALL SCHEDULE"
        style={styles.accordion1}
        titleStyle={styles.accordionTitle1}
        id={1}
        right={props => (
          <List.Icon
            {...props}
            icon={props.isExpanded ? 'chevron-up' : 'chevron-down'}
            color="#FFFFFF"
          />
        )}>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color="#FFE100"
            size="small"
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={{ backgroundColor: '#222324' }}>
            {ScheduleData?.data.map((schedule, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => handleOpen(schedule.file)}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}>
                  <Avatar.Icon icon="file" size={30} />
                  <Text style={styles.accordionAnswersText}>
                    {schedule.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  accordion1: {
    backgroundColor: '#161616',
  },
  content1: {
    backgroundColor: '#161616',
  },
  accordionTitle1: {
    color: '#FFFFFF',
    // fontFamily: 'Poppins',
    fontSize: 15,
    lineHeight: 18,
  },
  accordionAnswersText: {
    // fontFamily: 'Poppins',
    fontSize: 15,
    lineHeight: 18,
    paddingVertical: 9,
    paddingHorizontal: 22,
    textAlign: 'justify',
    color: '#D3D3D3',
    textTransform: 'capitalize',
  },
});
