export const C = { primary: '#0F7C7A', light: '#E6F4F3', text: '#111', muted: '#777', border: '#E3E3E3', bg: '#F5F7F7' };
export const card = { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#E3E3E3', padding: 12, marginBottom: 10 };
export const fmt = (iso) => {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return { date, time };
};