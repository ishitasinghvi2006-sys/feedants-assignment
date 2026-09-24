import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { C } from '../theme';

const ENABLED = ['REGISTER', 'UPLOAD_SUBMISSION', 'VIEW_RESULTS'];
export default function CTAButton({ c, t, busy, onPress }) {
  const enabled = ENABLED.includes(c.ctaState) && !busy;
  const sub = c.ctaState === 'REGISTER' ? `₹${c.entryFee}` : c.isRegistered ? t.registered : null;
  return (
    <View style={s.wrap}>
      <TouchableOpacity disabled={!enabled} onPress={onPress} style={[s.btn, !enabled && s.off]}>
        {busy ? <ActivityIndicator color="#fff" /> : (
          <>
            <Text style={s.text}>{t.cta[c.ctaState]}</Text>
            {sub && <Text style={s.sub}>{sub}</Text>}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderColor: C.border },
  btn: { backgroundColor: C.primary, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  off: { backgroundColor: '#9AA5A5' },
  text: { color: '#fff', fontWeight: '700', fontSize: 14 },
  sub: { color: '#fff', fontSize: 10 },
});