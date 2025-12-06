import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Avatar, Button, Divider } from 'react-native-paper';
import { usecheckAccomodationQuery } from '../../hooks/query/user-query';
import { useToast } from 'react-native-toast-notifications';
import * as AccoAPI from '../../api/user';

interface IAccomodationResultProps {
  email: string;
  close: any;
}

export const AccomodationResult = (props: IAccomodationResultProps) => {
  const { data: qrCode, isLoading, refetch } = usecheckAccomodationQuery(props.email);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleAction = async (apiCall: (email: string) => Promise<any>, successMsg: string) => {
    setLoading(true);
    try {
      const res = await apiCall(props.email);
      toast.show(res.success ? successMsg : res.message || 'Failed', { type: res.success ? 'success' : 'danger' });
      if (res.success) refetch();
    } catch {
      toast.show('Action failed', { type: 'danger' });
    }
    setLoading(false);
  };

  const userData = qrCode?.data;
  const isGroup = userData?.accommodation_group;

  const isPaid = userData?.accommodation_status === 'paid';
  const notBought = userData?.accommodation_status === 'not_bought';

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="#FFE100" size="large" style={{ marginTop: 20 }} />
      ) : (
        <>
          <View style={styles.header}>
            <Avatar.Icon size={80} icon={qrCode?.success && isPaid ? 'check' : 'alert'} style={{ backgroundColor: qrCode?.success && isPaid ? 'green' : notBought ? 'red' : 'orange' }} />
            <Text style={styles.headerText}>{qrCode?.success ? (isPaid ? 'Allowed' : 'Accommodation Not Bought') : qrCode?.message || 'Error'}</Text>
          </View>

          {qrCode?.success && userData && (
            <>
              <View style={styles.infoCard}>
                <Text style={styles.infoText}>Name: {userData.name}</Text>
                <Text style={styles.infoText}>Email: {userData.email}</Text>
                <Text style={styles.infoText}>Summit ID: {userData.summit_id}</Text>
                {isPaid ? (
                  <>
                    <Text style={styles.infoText}>Hostel: {userData.hostel_allotted || 'Not assigned'}</Text>
                    <Text style={styles.infoText}>Room: {userData.room_number || 'Not assigned'}</Text>
                    {userData.pin_code && <Text style={styles.infoText}>Pin Code: {userData.pin_code}</Text>}
                    {isGroup && (
                      <View style={styles.groupInfo}>
                        <Text style={styles.groupText}>Group: {userData.accommodation_group}</Text>
                        <Text style={styles.groupText}>Paid Members: {userData.total_males}M + {userData.total_females}F</Text>
                      </View>
                    )}
                  </>
                ) : (
                  <Text style={[styles.infoText, { color: '#F44336', fontWeight: 'bold' }]}>Status: Accommodation Not Bought</Text>
                )}
              </View>

              {isPaid && (
                <>
                  {userData.group_members && userData.group_members.length > 0 && (
                    <View style={styles.membersCard}>
                      <Text style={styles.sectionTitle}>Group Members (Paid: {userData.total_males}M + {userData.total_females}F)</Text>
                      {userData.group_members.map((member: any, idx: number) => (
                        <View key={idx} style={[styles.memberItem, !member.is_paid && styles.memberUnpaid]}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.memberText}>{member.name} ({member.gender})</Text>
                            <Text style={[styles.paymentBadge, member.is_paid ? styles.statusYes : styles.statusNo]}>{member.is_paid ? 'PAID' : 'UNPAID'}</Text>
                          </View>
                          <Text style={styles.memberSubText}>{member.email}</Text>
                          <Text style={styles.memberSubText}>{member.contact}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  <Text style={styles.sectionTitle}>{isGroup ? 'Individual Toggles' : 'Status Toggles'}</Text>
                  <View style={styles.statusCard}>
                    <TouchableOpacity onPress={() => handleAction(AccoAPI.toggleSummitKit, 'Summit kit toggled')} disabled={loading}>
                      <Text style={[styles.statusBadge, userData.kit_collected ? styles.statusYes : styles.statusNo]}>Summit Kit: {userData.kit_collected ? '✓' : '✗'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAction(AccoAPI.toggleHospiKit, 'Hospi kit toggled')} disabled={loading}>
                      <Text style={[styles.statusBadge, userData.hospitality_kit_given ? styles.statusYes : styles.statusNo]}>Hospi Kit: {userData.hospitality_kit_given ? '✓' : '✗'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAction(AccoAPI.toggleHospiAttendance, 'Attendance toggled')} disabled={loading}>
                      <Text style={[styles.statusBadge, userData.hospi_attendance ? styles.statusYes : styles.statusNo]}>Hospi Attendance: {userData.hospi_attendance ? '✓' : '✗'}</Text>
                    </TouchableOpacity>
                  </View>
                  {userData.is_room_pre_alloted === false && (
                    <View style={styles.warningCard}>
                      <Text style={styles.warningText}>⚠️ Manual Room Allotment Required</Text>
                    </View>
                  )}

                  {isGroup && (
                    <>
                      <Text style={styles.sectionTitle}>Group Toggles (All Members)</Text>
                      <View style={styles.statusCard}>
                        <TouchableOpacity onPress={() => handleAction(AccoAPI.toggleGroupSummitKit, 'Group summit kit toggled')} disabled={loading}>
                          <Text style={[styles.statusBadge, styles.btnPrimary]}>Toggle All Summit Kits</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAction(AccoAPI.toggleGroupHospiKit, 'Group hospi kit toggled')} disabled={loading}>
                          <Text style={[styles.statusBadge, styles.btnPrimary]}>Toggle All Hospi Kits</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAction(AccoAPI.toggleGroupHospiAttendance, 'Group attendance toggled')} disabled={loading}>
                          <Text style={[styles.statusBadge, styles.btnPrimary]}>Toggle All Attendance</Text>
                        </TouchableOpacity>
                      </View>
                      <Button mode="contained" onPress={() => handleAction(AccoAPI.completeGroupProcess, 'All group processes completed')} disabled={loading} style={[styles.btn, styles.btnPrimary, { width: '100%', marginBottom: 8 }]}>Complete All Group</Button>
                      <Divider style={styles.divider} />
                    </>
                  )}

                  <View style={styles.btnRow}>
                    <Button mode="contained" onPress={() => handleAction(AccoAPI.manualRoomAllotment, 'Room cleared for manual allotment')} disabled={loading} style={[styles.btn, styles.btnDanger]}>Manual Room Allotment</Button>
                  </View>
                  <Button mode="contained" onPress={() => handleAction(AccoAPI.completeIndividualProcess, 'All processes completed')} disabled={loading} style={[styles.btn, styles.btnPrimary, { width: '100%' }]}>Complete All</Button>
                </>
              )}
            </>
          )}

          <Button mode="outlined" onPress={props.close} style={styles.closeBtn}>Close</Button>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  header: { alignItems: 'center', marginBottom: 15 },
  headerText: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  infoCard: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 15, borderRadius: 8, marginBottom: 10 },
  infoText: { color: '#FFF', fontSize: 16, marginBottom: 5 },
  groupInfo: { backgroundColor: 'rgba(33,150,243,0.2)', padding: 10, borderRadius: 5, marginTop: 10 },
  groupText: { color: '#64B5F6', fontSize: 14, fontWeight: 'bold' },
  statusCard: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  statusBadge: { padding: 8, borderRadius: 5, fontSize: 14, fontWeight: 'bold' },
  statusYes: { backgroundColor: '#4CAF50', color: '#FFF' },
  statusNo: { backgroundColor: '#F44336', color: '#FFF' },
  sectionTitle: { color: '#FFE100', fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  btn: { flex: 1, marginHorizontal: 4 },
  btnPrimary: { backgroundColor: '#2196F3' },
  btnDanger: { backgroundColor: '#F44336' },
  divider: { marginVertical: 15, backgroundColor: '#555' },
  closeBtn: { marginTop: 15, borderColor: '#FFF' },
  membersCard: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8, marginBottom: 10 },
  memberItem: { backgroundColor: 'rgba(100,181,246,0.15)', padding: 10, borderRadius: 5, marginBottom: 8 },
  memberUnpaid: { backgroundColor: 'rgba(244,67,54,0.15)', borderWidth: 1, borderColor: 'rgba(244,67,54,0.3)' },
  memberText: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 3 },
  memberSubText: { color: '#AAA', fontSize: 13 },
  paymentBadge: { fontSize: 10, fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3 },
  warningCard: { backgroundColor: 'rgba(255,152,0,0.2)', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#FF9800' },
  warningText: { color: '#FFB74D', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
});
