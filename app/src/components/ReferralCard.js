import React from 'react';
import { View, Text, TouchableOpacity, Share, Alert, StyleSheet } from 'react-native';
import { C } from '../theme';

const LINK = 'https://feedants.com/r/referral123';
export default function ReferralCard({ reward, t }) {
  return (
    <View style={s.box}>
      <Text style={s.head}>📢 {t.refer}</Text>
      <View style={s.row}>
        <Text style={s.link} numberOfLines={1}>{LINK}</Text>
        <TouchableOpacity onPress={() => Alert.alert('Copied', LINK)}><Text style={s.copy}>{t.copy}</Text></TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={() => Share.share({ message: `Join Feedants: ${LINK}` })}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>{t.referNow}</Text>
        </TouchableOpacity>
      </View>
      <Text style={s.earn}>You earn ₹{reward} for every signup</Text>
    </View>
  );
}
const s = StyleSheet.create({
  box: { backgroundColor: '#E8F7EE', borderRadius: 10, padding: 10, marginBottom: 10 },
  head: { fontSize: 12, fontWeight: '700', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center' },
  link: { flex: 1, fontSize: 10, backgroundColor: '#fff', padding: 6, borderRadius: 6, marginRight: 6 },
  copy: { fontSize: 11, marginRight: 8 },
  btn: { backgroundColor: C.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  earn: { fontSize: 10, color: C.primary, marginTop: 4, textAlign: 'right' },
});