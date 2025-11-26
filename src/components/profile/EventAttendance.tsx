import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Button } from 'react-native-paper';
import { useTagOfEventQuery } from '../../hooks/query/user-query';
import { useToast } from 'react-native-toast-notifications';
import { useMarkEventAttendanceMutation } from '../../hooks/mutation/user-action-mutation';

interface IEventAttendanceProps {
  email: string;
  event: string;
  close: any;
}

export const EventAttendance = (props: IEventAttendanceProps) => {
  const [actionPerformed, setActionPerformed] = useState(false);
  const { data: qrCode, isLoading } = useTagOfEventQuery(
    props.email,
    props.event,
  );

  const toast = useToast();
  const { mutateAsync } = useMarkEventAttendanceMutation();

  const handleClick = async () => {
    setActionPerformed(true);
    mutateAsync({ email: props.email, event: props.event }).then(res => {
      if (res.success) {
        toast.show('Updated', { type: 'success' });
      } else {
        toast.show('Failed. Try after sometime', { type: 'danger' });
      }
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="#FFE100" size="large" />
      ) : (
        <>
          {actionPerformed ? (
            <>
              <Avatar.Icon
                size={100}
                icon="check"
                style={{ backgroundColor: 'green' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Attendance Marked</Text>
            </>
          ) : qrCode?.success && qrCode?.data.tag === 'attended' ? (
            <>
              <Avatar.Icon
                size={100}
                icon="check-circle"
                style={{ backgroundColor: 'blue' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Already Attended</Text>
            </>
          ) : qrCode?.success && qrCode?.data.tag === 'going' ? (
            <>
              <Avatar.Icon
                size={100}
                icon="check"
                style={{ backgroundColor: 'green' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Allowed</Text>
            </>
          ) : qrCode?.success && qrCode?.data.tag === 'reserve a seat' ? (
            <>
              <Avatar.Icon
                size={100}
                icon="clock"
                style={{ backgroundColor: 'orange' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Seat Reserved</Text>
            </>
          ) : (
            <>
              <Avatar.Icon
                size={100}
                icon="close"
                style={{ backgroundColor: 'red' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                Seat Not Booked
              </Text>
            </>
          )}

          <Text style={{ color: '#FFFFFF', fontSize: 20 }}>{props.email}</Text>
          {qrCode?.success && (
            <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
              Tag: {qrCode?.data.tag}
            </Text>
          )}

          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
            <Button mode="contained" onPress={props.close}>
              {actionPerformed ? 'Scan Again' : 'Cancel'}
            </Button>
            {!actionPerformed && qrCode?.data.tag !== 'attended' && (
              <Button mode="contained" onPress={handleClick}>
                Mark Attendance
              </Button>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
});
