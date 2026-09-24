import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { C, card } from '../theme';

export default function InfoTabs({ c, t }) {
  const [tab, setTab] = useState(0);
  const [more, setMore] = useState(false);
  const tabs = [t.about, t.judging, t.rules];
  const content = [c.about, c.judgingParameters.map((x) => `• ${x}`).join('\n'), c.rules.map((x) => `• ${x}`).join('\n')][tab];
  return (
    <View style={card}>
      <View style={s.tabs}>
        {tabs.map((label, i) => (
          <TouchableOpacity key={label} onPress={() => setTab(i)} style={[s.tab, tab === i && s.active]}>
            <Text style={[s.tabText, tab === i && { color: C.primary, fontWeight: '700' }]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={s.body} numberOfLines={more ? undefined : 3}>{content}</Text>
      <TouchableOpacity onPress={() => setMore(!more)}>
        <Text style={s.more}>{more ? t.viewLess : t.viewMore} {more ? '˄' : '˅'}</Text>
      </TouchableOpacity>
    </View>
  );
}
const s = StyleSheet.create({
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: C.border, marginBottom: 8 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  active: { borderBottomWidth: 2, borderColor: C.primary },
  tabText: { fontSize: 11, color: C.muted },
  body: { fontSize: 12, color: '#333', lineHeight: 18 },
  more: { textAlign: 'center', color: C.primary, fontSize: 12, marginTop: 6 },
});