import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Button } from 'react-native-paper';
import { useGiveHospitalityKitMutation } from '../../hooks/mutation/user-action-mutation';
import { usecheckAccomodationQuery } from '../../hooks/query/user-query';
import { useToast } from 'react-native-toast-notifications';

interface IAccomodationResultProps {
  email: string;
  close: any;
}

export const AccomodationResult = (props: IAccomodationResultProps) => {
  const { data: qrCode, isLoading } = usecheckAccomodationQuery(props.email);
  const toast = useToast();
  const { mutateAsync } = useGiveHospitalityKitMutation();

  const handleDistributeKit = async () => {
    mutateAsync({ email: props.email }).then(res => {
      if (res.success) {
        toast.show('Updated', { type: 'success' });
        props.close();
      } else {
        toast.show('Failed. Try after sometime', { type: 'danger' });
        props.close();
      }
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="#FFE100" size="large" />
      ) : (
        <>
          {!qrCode?.success ? (
            <>
              <Avatar.Icon
                size={100}
                icon="alert"
                style={{ backgroundColor: 'orange' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                {qrCode?.message || 'Error occurred'}
              </Text>
            </>
          ) : qrCode?.data?.isAccomodationBooked ? (
            <>
              <Avatar.Icon
                size={100}
                icon="check"
                style={{ backgroundColor: 'green' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Allowed</Text>
            </>
          ) : (
            <>
              <Avatar.Icon
                size={100}
                icon="close"
                style={{ backgroundColor: 'red' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                Allowed Denied
              </Text>
            </>
          )}
        </>
      )}

      <Text style={{ color: '#FFFFFF', fontSize: 20 }}>{props.email}</Text>
      {qrCode?.success && (
        <>
          <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
            Accomodation Booked: {qrCode?.data?.isAccomodationBooked ? 'YES' : 'NO'}
          </Text>
          <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
            HospitalityKit Recived:
            {qrCode?.data?.isHospitalityKitCollected ? (
              <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold' }}>
                YES
              </Text>
            ) : (
              <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>
                {' '}
                NO
              </Text>
            )}
          </Text>
        </>
      )}

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Button mode="contained" onPress={props.close}>
          Cancel
        </Button>

        {qrCode?.success && !qrCode?.data?.isHospitalityKitCollected &&
          qrCode?.data?.isAccomodationBooked && (
            <Button mode="contained" onPress={handleDistributeKit}>
              Give
            </Button>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
});
