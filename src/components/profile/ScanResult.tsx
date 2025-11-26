// import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { ActivityIndicator, Avatar, Button } from 'react-native-paper';
// import { useDistributeKitMutation } from '../../hooks/mutation/user-action-mutation';
// import { useMarkAttendaceQuery } from '../../hooks/query/user-query';
// import { useToast } from 'react-native-toast-notifications';
// import { useProfileStore } from '../../store/profile-store';
// import { Logs } from 'expo'

// Logs.enableExpoCliLogging()

// interface IScanResultProps {
//   email: string;
//   close: any;
// }

// export const ScanResult = (props: IScanResultProps) => {
//   const admin_email = useProfileStore(state => state.email)
//   const { data: qrCode, isLoading } = useMarkAttendaceQuery(props.email, admin_email);

//   const toast = useToast();
//   const { mutateAsync } = useDistributeKitMutation();

//   console.log(qrCode);
//   console.log(qrCode?.data);

//   const isReg: boolean = 
//     qrCode?.data.pass_name != 'No' && qrCode?.data.pass_name != '';

//   const handleDistributeKit = async () => {
//     mutateAsync({ attendanceId: qrCode?.data.id }).then(res => {
//       if (res.success) {
//         toast.show('Updated', { type: 'success' });
//         props.close();
//       } else {
//         toast.show('Failed. Try after sometime', { type: 'danger' });
//         props.close();
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {isLoading ? (
//         <ActivityIndicator animating={true} color="#FFE100" size="large" />
//       ) : (
//         <>
//           {qrCode?.data.isRegistered ? (
//             <>
//               <Avatar.Icon
//                 size={100}
//                 icon="check"
//                 style={{ backgroundColor: 'green' }}
//               />
//               <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Allowed</Text>
//             </>
//           ) : (
//             <>
//               <Avatar.Icon
//                 size={100}
//                 icon="close"
//                 style={{ backgroundColor: 'red' }}
//               />
//               <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
//                 Allowed Denied
//               </Text>
//             </>
//           )}
//         </>
//       )}
//       <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
//         {qrCode?.data.email}
//       </Text>
//       {qrCode?.data.pass_name == 'No' || qrCode?.data.pass_name == ''? (
//         <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
//         No Pass
//       </Text>
//       ): (
//         <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
//         {qrCode?.data.pass_name} Pass
//       </Text>
//       )}
//       <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
//         Kit Recived:
//         {qrCode?.data.isKitCollected ? (
//           <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold' }}>
//             YES
//           </Text>
//         ) : (
//           <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>
//             {' '}
//             NO
//           </Text>
//         )}
//       </Text>

//       <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
//         <Button mode="contained" onPress={props.close} style={{marginRight: 10}}>
//           Cancel
//         </Button>

//         {!qrCode?.data.isKitCollected && isReg && (
//           <Button mode="contained" onPress={handleDistributeKit}>
//             Give
//           </Button>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     padding: 10,
//   },
// });

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Button } from 'react-native-paper';
import { useDistributeKitMutation } from '../../hooks/mutation/user-action-mutation';
import { useMarkAttendaceQuery } from '../../hooks/query/user-query';
import { useToast } from 'react-native-toast-notifications';
import { useProfileStore } from '../../store/profile-store';
// import { Logs } from 'expo';

// Logs.enableExpoCliLogging();

interface IScanResultProps {
  email: string;
  close: () => void;
}

export const ScanResult = (props: IScanResultProps) => {
  const admin_email = useProfileStore((state) => state.email);
  const { data: qrCode, isLoading } = useMarkAttendaceQuery(props.email, admin_email);

  const toast = useToast();
  const { mutateAsync } = useDistributeKitMutation();

  console.log("QR Code Response:", qrCode);

  const isReg: boolean = !!qrCode?.data && 
    qrCode?.data.pass_name !== 'No' && 
    qrCode?.data.pass_name !== '';

  const handleDistributeKit = async () => {
    if (!qrCode?.data?.id) {
      toast.show('Invalid QR Code data.', { type: 'danger' });
      return;
    }

    try {
      const res = await mutateAsync({ attendanceId: qrCode?.data.id });
      if (res.success) {
        toast.show('Updated', { type: 'success' });
        props.close();
      } else {
        toast.show('Failed. Try after sometime', { type: 'danger' });
        props.close();
      }
    } catch (error) {
      console.error("Error distributing kit:", error);
      toast.show('An error occurred.', { type: 'danger' });
      props.close();
    }
  };

  // return (
  //   <View style={styles.container}>
  //     {isLoading ? (
  //       <ActivityIndicator animating={true} color="#FFE100" size="large" />
  //     ) : qrCode?.data ? (
  //       <>
  //         {qrCode.data.isRegistered ? (
  //           <>
  //             <Avatar.Icon size={100} icon="check" style={{ backgroundColor: 'green' }} />
  //             <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Allowed</Text>
  //           </>
  //         ) : (
  //           <>
  //             <Avatar.Icon size={100} icon="close" style={{ backgroundColor: 'red' }} />
  //             <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Denied</Text>
  //           </>
  //         )}
  //         <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
  //           {qrCode?.data.email || 'No Email Available'}
  //         </Text>
  //         {qrCode?.data.pass_name === 'No' || !qrCode?.data.pass_name ? (
  //           <Text style={{ color: '#FFFFFF', fontSize: 20 }}>No Pass</Text>
  //         ) : (
  //           <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
  //             {qrCode?.data.pass_name} Pass
  //           </Text>
  //         )}
  //         <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
  //           Kit Received:{' '}
  //           {qrCode?.data.isKitCollected ? (
  //             <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold' }}>YES</Text>
  //           ) : (
  //             <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>NO</Text>
  //           )}
  //         </Text>
  //         <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
  //           <Button mode="contained" onPress={props.close} style={{ marginRight: 10 }}>
  //             Cancel
  //           </Button>
  //           {!qrCode?.data.isKitCollected && isReg && (
  //             <Button mode="contained" onPress={handleDistributeKit}>
  //               Give
  //             </Button>
  //           )}
  //         </View>
  //       </>
  //     ) : (
  //       <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Invalid QR Code Data</Text>
  //     )}
  //   </View>
  // );
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="#FFE100" size="large" />
      ) : qrCode?.data ? (
        <>
          {qrCode.data.isRegistered ? (
            <>
              <Avatar.Icon size={100} icon="check" style={{ backgroundColor: 'green' }} />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Allowed</Text>
            </>
          ) : (
            <>
              <Avatar.Icon size={100} icon="close" style={{ backgroundColor: 'red' }} />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Allowed Denied</Text>
            </>
          )}
          <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
            {qrCode?.data.email || 'No Email Available'}
          </Text>
          {qrCode?.data.pass_name === 'No' || !qrCode?.data.pass_name ? (
            <Text style={{ color: '#FFFFFF', fontSize: 20 }}>No Pass</Text>
          ) : (
            <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
              Pass: 
              {(() => {
                switch (qrCode?.data.pass_name) {
                  case 'lvl1':
                    return 'Silver';
                  case 'lvl2':
                    return 'Gold';
                  case 'lvl3':
                    return 'Platinum';
                  case 'lvl4':
                    return 'Signature';
                  case 'none':
                    return 'none';
                  default:
                    return 'Unknown';
                }
              })()}
            </Text>
          )}
          <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
            Kit Received:{' '}
            {qrCode?.data.isKitCollected ? (
              <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold' }}>YES</Text>
            ) : (
              <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>NO</Text>
            )}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
            <Button mode="contained" onPress={props.close} style={{ marginRight: 10 }}>
              Cancel
            </Button>
            {!qrCode?.data.isKitCollected && isReg && (
              <Button mode="contained" onPress={handleDistributeKit}>
                Give
              </Button>
            )}
          </View>
        </>
      ) : (
        <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Invalid QR Code Data</Text>
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
