import axios from 'axios';

// Instance axios simple pour éviter de répéter l'URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Members
export const getMembers = async () => {
  const res = await api.get('/members');
  return res.data;
};

export const createMember = async (payload) => {
  const res = await api.post('/members', payload);
  return res.data;
};

export const updateMember = async (id, payload) => {
  const res = await api.put(`/members/${id}`, payload);
  return res.data;
};

export const deleteMember = async (id) => {
  const res = await api.delete(`/members/${id}`);
  return res.data;
};

// Plans
export const getPlans = async () => {
  const res = await api.get('/plans');
  return res.data;
};

export const createPlan = async (payload) => {
  const res = await api.post('/plans', payload);
  return res.data;
};

export const updatePlan = async (id, payload) => {
  const res = await api.put(`/plans/${id}`, payload);
  return res.data;
};

export const deletePlan = async (id) => {
  const res = await api.delete(`/plans/${id}`);
  return res.data;
};

// Memberships
export const getMemberships = async () => {
  const res = await api.get('/memberships');
  return res.data;
};

export const createMembership = async (payload) => {
  const res = await api.post('/memberships', payload);
  return res.data;
};

export const deleteMembership = async (id) => {
  const res = await api.delete(`/memberships/${id}`);
  return res.data;
};

// Stats
export const getOverviewStats = async () => {
  const res = await api.get('/stats/overview');
  return res.data;
};
