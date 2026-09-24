import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { C, card } from '../theme';

export default function JudgeCard({ judge, t }) {
  const avatar = judge.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(judge.name)}&background=0F7C7A&color=fff`;
  return (
    <View style={[card, s.row]}>
      <Image source={{ uri: avatar }} style={s.img} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={s.label}>{t.judge}</Text>
        <Text style={s.name}>{judge.name}</Text>
        <Text style={s.sub}>{judge.title}</Text>
        <Text style={s.sub}>{judge.experience}</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={s.play}><Text style={{ color: C.primary }}>▶</Text></View>
        <Text style={s.sub}>{t.intro}</Text>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  img: { width: 56, height: 56, borderRadius: 28 },
  label: { fontSize: 10, color: C.muted },
  name: { fontSize: 15, fontWeight: '700' },
  sub: { fontSize: 11, color: C.muted },
  play: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.light, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
});