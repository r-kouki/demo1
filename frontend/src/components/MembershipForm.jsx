import { useEffect, useState } from 'react';
import { getMembers, getPlans, createMembership } from '../services/api';

const MembershipForm = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [member, setMember] = useState('');
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const membersData = await getMembers();
      const plansData = await getPlans();
      setMembers(membersData);
      setPlans(plansData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMembership({ member, plan, startDate });
      setMessage('Abonnement créé');
      setMember('');
      setPlan('');
      setStartDate('');
      window.dispatchEvent(new Event('memberships:refresh'));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la création');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Créer un abonnement</h3>
      {message && <p className="info">{message}</p>}
      <div className="form-group">
        <label>Adhérent</label>
        <select value={member} onChange={(e) => setMember(e.target.value)}>
          <option value="">-- Choisir un adhérent --</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.firstName} {m.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Plan</label>
        <select value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="">-- Choisir un plan --</option>
          {plans.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.durationMonths} mois)
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Date de début</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <button type="submit" className="btn-primary">
        Enregistrer
      </button>
    </form>
  );
};

export default MembershipForm;
