import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C, card } from '../theme';

export default function CompetitionCard({ c, t }) {
  const pct = Math.min(100, (c.registeredCount / c.maxSpots) * 100);
  return (
    <View style={card}>
      <View style={s.row}>
        <Text style={s.title}>{c.title}</Text>
        {c.isRegistered && <Text style={s.badge}>✔ {t.registered}</Text>}
      </View>
      <View style={s.row}>
        {c.tags.map((g) => <Text key={g} style={s.tag}>{g}</Text>)}
        <Text style={s.cert}>🏆 Winners get certificate</Text>
      </View>
      <View style={[s.row, { marginTop: 10, alignItems: 'flex-start' }]}>
        <View style={{ flex: 1 }}>
          <Text style={s.label}>{t.prizePool}</Text>
          <Text style={s.big}>₹ {c.prizePool.toLocaleString('en-IN')}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.label}>{t.entryFee}</Text>
          <Text style={s.big}>₹ {c.entryFee}</Text>
        </View>
        <View style={{ flex: 1.4 }}>
          <Text style={s.spots}>{c.spotsLeft > 0 ? t.spotsLeft(c.spotsLeft) : 'Sold out'}</Text>
          <View style={s.bar}><View style={[s.fill, { width: `${pct}%` }]} /></View>
          <Text style={s.label}>{t.booked(c.registeredCount, c.maxSpots)}</Text>
        </View>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' },
  title: { fontSize: 16, fontWeight: '700' },
  badge: { backgroundColor: C.primary, color: '#fff', fontSize: 11, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
  tag: { backgroundColor: C.light, fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 6, marginTop: 6 },
  cert: { fontSize: 11, color: C.primary, marginTop: 6 },
  label: { fontSize: 11, color: C.muted },
  big: { fontSize: 22, fontWeight: '700', color: C.primary },
  spots: { fontSize: 12, color: C.primary, fontWeight: '600', marginBottom: 4 },
  bar: { height: 5, backgroundColor: '#DDD', borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  fill: { height: 5, backgroundColor: C.primary },
});