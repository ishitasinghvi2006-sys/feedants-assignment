import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { C, card } from '../theme';

export default function PreviousWinners({ winners, t }) {
  if (!winners?.length) return null;
  return (
    <View style={card}>
      <Text style={s.head}>{t.prev}</Text>
      <FlatList
        horizontal showsHorizontalScrollIndicator={false} data={winners}
        keyExtractor={(w, i) => w.name + i}
        renderItem={({ item }) => (
          <View style={s.item}>
            <Image style={s.img} source={{ uri: item.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random` }} />
            <Text style={s.name} numberOfLines={1}>{item.name}</Text>
            <Text style={s.pos}>{item.position}</Text>
          </View>
        )}
      />
    </View>
  );
}
const s = StyleSheet.create({
  head: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  item: { marginRight: 12, alignItems: 'center', width: 72 },
  img: { width: 64, height: 64, borderRadius: 10 },
  name: { fontSize: 11, fontWeight: '600', marginTop: 4 },
  pos: { fontSize: 10, color: C.primary },
});