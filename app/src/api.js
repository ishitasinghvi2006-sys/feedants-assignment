import axios from 'axios';
import { API_URL, USER_ID } from './config';

export const getLatestId = async () => (await axios.get(`${API_URL}/latest/one`)).data.id;
export const getCompetition = async (id) =>
  (await axios.get(`${API_URL}/${id}`, { params: { userId: USER_ID } })).data;
export const register = (id) => axios.post(`${API_URL}/${id}/register`, { userId: USER_ID });
export const submit = (id) =>
  axios.post(`${API_URL}/${id}/submit`, { userId: USER_ID, submissionUrl: 'https://example.com/video.mp4' });