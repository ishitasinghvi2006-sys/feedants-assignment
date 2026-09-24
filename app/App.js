import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, RefreshControl, Alert, StyleSheet } from 'react-native';
import { getLatestId, getCompetition, register, submit } from './src/api';
import { T } from './src/i18n';
import { C } from './src/theme';
import CompetitionCard from './src/components/CompetitionCard';
import JudgeCard from './src/components/JudgeCard';
import CountdownTimer from './src/components/CountdownTimer';
import ImportantDates from './src/components/ImportantDates';
import PreviousWinners from './src/components/PreviousWinners';
import InfoTabs from './src/components/InfoTabs';
import RewardsList from './src/components/RewardsList';
import ReferralCard from './src/components/ReferralCard';
import CTAButton from './src/components/CTAButton';

export default function App() {
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lang, setLang] = useState('en');
  const t = T[lang];

  const load = useCallback(async () => {
    try {
      setError(null);
      const cid = id || (await getLatestId());
      setId(cid);
      setData(await getCompetition(cid));
    } catch (e) {
      setError('Could not load competition. Check your connection.');
    } finally { setRefreshing(false); }
  }, [id]);

  useEffect(() => { load(); }, []);

  const onCta = async () => {
    setBusy(true);
    try {
      if (data.ctaState === 'REGISTER') {
        // Payment (Razorpay) is mocked in this assignment
        await register(id);
        Alert.alert('Success', 'You are registered!');
      } else if (data.ctaState === 'UPLOAD_SUBMISSION') {
        await submit(id);
        Alert.alert('Success', 'Submission uploaded!');
      }
    } catch (e) {
      Alert.alert('Oops', e.response?.data?.error || 'Something went wrong');
    } finally {
      setBusy(false);
      load(); // always re-sync with server
    }
  };

  if (error && !data) return (
    <View style={s.center}>
      <Text>{error}</Text>
      <TouchableOpacity onPress={load} style={s.retry}><Text style={{ color: '#fff' }}>Retry</Text></TouchableOpacity>
    </View>
  );
  if (!data) return <View style={s.center}><ActivityIndicator size="large" color={C.primary} /></View>;

  return (
    <SafeAreaView style={s.screen}>
      <View style={s.header}>
        <Text style={s.back}>← {t.goBack}</Text>
        <View style={s.toggle}>
          {['en', 'hi'].map((l) => (
            <TouchableOpacity key={l} onPress={() => setLang(l)} style={[s.pill, lang === l && s.pillOn]}>
              <Text style={{ color: lang === l ? '#fff' : '#333', fontSize: 11 }}>{l === 'en' ? 'ENG' : 'हिंदी'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ padding: 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}>
        <CompetitionCard c={data} t={t} />
        <JudgeCard judge={data.judge} t={t} />
        {data.phase === 'REGISTRATION_OPEN' || data.phase === 'SUBMISSION_OPEN' ? (
          new Date(data.registrationDeadline) > new Date(data.serverTime) && (
            <CountdownTimer deadline={data.registrationDeadline} serverTime={data.serverTime} t={t} onExpire={load} />
          )
        ) : null}
        <ImportantDates c={data} t={t} />
        <PreviousWinners winners={data.previousWinners} t={t} />
        <InfoTabs c={data} t={t} />
        <RewardsList rewards={data.rewards} t={t} />
        <ReferralCard reward={data.referralReward} t={t} />
      </ScrollView>
      <CTAButton c={data} t={t} busy={busy} onPress={onCta} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  retry: { backgroundColor: C.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, marginTop: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingTop: 36, paddingBottom: 6, backgroundColor: '#fff' },
  back: { fontSize: 14, fontWeight: '600' },
  toggle: { flexDirection: 'row', backgroundColor: '#EEE', borderRadius: 14 },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14 },
  pillOn: { backgroundColor: C.primary },
});