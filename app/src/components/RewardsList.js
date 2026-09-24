import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C, card } from '../theme';

const icons = ['🏆', '🥈', '🥉'];
export default function RewardsList({ rewards, t }) {
  return (
    <>
      <View style={card}>
        <Text style={s.head}>{t.rewards}</Text>
        {[...rewards].sort((a, b) => a.position - b.position).map((r) => (
          <View key={r.position} style={s.row}>
            <Text style={s.label}>{icons[r.position - 1] || '☆'}  {r.label}</Text>
            <Text style={s.amt}>₹ {r.amount}</Text>
          </View>
        ))}
      </View>
      <View style={s.disc}><Text style={s.discText}>ⓘ {t.disclaimer}</Text></View>
    </>
  );
}
const s = StyleSheet.create({
  head: { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  label: { fontSize: 12, fontWeight: '600' },
  amt: { fontSize: 12, fontWeight: '700' },
  disc: { backgroundColor: C.light, borderRadius: 8, padding: 8, marginBottom: 10 },
  discText: { fontSize: 10, color: '#333' },
});