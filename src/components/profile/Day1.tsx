// import React, { useEffect } from 'react';
// import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Timetable from 'react-native-calendar-timetable';
// import { useProfileStore } from '../../store/profile-store';
// import { useGetTimetableQuery } from '../../hooks/query/user-query';
// import { useTimetableStore } from '../../store/timetable-store';
// import { ScheduleComponent } from './ScheduleComponent';
// import { ActivityIndicator } from 'react-native-paper';

// export const Day1 = () => {
//   const email = useProfileStore(state => state.email);
//   const {
//     data: timetableData,
//     isLoading,
//     refetch,
//   } = useGetTimetableQuery(email);
//   const timetable = useTimetableStore(state => state.timetable);
//   const setTimetable = useTimetableStore(state => state.setTimetable);

//   const date = new Date('2023-01-28');


//   useEffect(() => {
//     timetableData?.data.forEach(element => {
//       if (element.tag != 'not going') {
//         setTimetable(element.event, element.tag);
//       }
//     });
//   }, [timetableData]);

//   return (
//     <LinearGradient
//       colors={['#1F292F', '#000000']}
//       useAngle
//       angle={-128.06}
//       style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={isLoading} onRefresh={refetch} />
//         }>
//         {isLoading ? (
//           <ActivityIndicator
//             animating={true}
//             color="#FFE100"
//             size="small"
//             style={{ marginTop: 20 }}
//           />
//         ) : (
//           <Timetable
//             items={timetable}
//             renderItem={props => <ScheduleComponent {...props} />}
//             date={date}
//           />
//         )}
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//   },
// });
