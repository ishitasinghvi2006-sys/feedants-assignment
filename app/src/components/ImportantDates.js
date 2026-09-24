import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C, card, fmt } from '../theme';

export default function ImportantDates({ c, t }) {
  const items = [
    [t.registerBefore, c.registrationDeadline, '🗓'], [t.subStarts, c.submissionStart, '✈'],
    [t.subEnds, c.submissionEnd, '⬆'], [t.resultDate, c.resultDate, '🏆'],
  ];
  return (
    <View style={card}>
      <Text style={s.head}>{t.dates}</Text>
      <View style={s.grid}>
        {items.map(([label, iso, icon]) => {
          const { date, time } = fmt(iso);
          return (
            <View key={label} style={s.cell}>
              <Text style={{ fontSize: 18, marginRight: 8 }}>{icon}</Text>
              <View>
                <Text style={s.label}>{label}</Text>
                <Text style={s.date}>{date}</Text>
                <Text style={s.time}>{time}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  head: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: C.border, borderRadius: 8 },
  cell: { width: '50%', flexDirection: 'row', alignItems: 'center', padding: 10, borderWidth: 0.5, borderColor: C.border },
  label: { fontSize: 10, color: C.muted },
  date: { fontSize: 13, fontWeight: '700', color: C.primary },
  time: { fontSize: 11, color: C.primary },
});