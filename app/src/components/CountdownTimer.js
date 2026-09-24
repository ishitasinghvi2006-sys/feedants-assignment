import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../theme';

const pad = (n) => String(n).padStart(2, '0');

export default function CountdownTimer({ deadline, serverTime, t, onExpire }) {
  // offset between server and device clock, so users can't cheat by changing their clock
  const [offset] = useState(() => new Date(serverTime).getTime() - Date.now());
  const [ms, setMs] = useState(() => new Date(deadline).getTime() - new Date(serverTime).getTime());

  useEffect(() => {
    const id = setInterval(() => {
      const left = new Date(deadline).getTime() - (Date.now() + offset);
      setMs(left);
      if (left <= 0) { clearInterval(id); onExpire && onExpire(); }
    }, 1000);
    return () => clearInterval(id);
  }, [deadline, offset]);

  const left = Math.max(ms, 0);
  const d = Math.floor(left / 86400000), h = Math.floor((left % 86400000) / 3600000);
  const m = Math.floor((left % 3600000) / 60000), sec = Math.floor((left % 60000) / 1000);

  return (
    <View style={s.box}>
      <Text style={s.label}>⏳ {t.closesIn}</Text>
      <Text style={s.time}>{left > 0 ? `${pad(d)}d : ${pad(h)}h : ${pad(m)}m : ${pad(sec)}s` : 'Closed'}</Text>
      {left > 0 && <Text style={s.hurry}>{t.hurry}</Text>}
    </View>
  );
}
const s = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: C.light, borderRadius: 10, padding: 10, marginBottom: 10 },
  label: { fontSize: 11, fontWeight: '600' },
  time: { fontSize: 14, fontWeight: '700', color: C.primary },
  hurry: { fontSize: 11, color: C.primary },
});