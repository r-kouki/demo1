import { useEffect, useState } from 'react';
import { getMemberships, deleteMembership } from '../services/api';

const MembershipList = () => {
  const [memberships, setMemberships] = useState([]);

  const fetchMemberships = async () => {
    const data = await getMemberships();
    setMemberships(data);
  };

  useEffect(() => {
    fetchMemberships();
    const refreshHandler = () => fetchMemberships();
    window.addEventListener('memberships:refresh', refreshHandler);
    return () => window.removeEventListener('memberships:refresh', refreshHandler);
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Supprimer cet abonnement ?');
    if (!confirmDelete) return;
    await deleteMembership(id);
    fetchMemberships();
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="card">
      <h2 className="card-title">Abonnements</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Adhérent</th>
            <th>Plan</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((m) => (
            <tr key={m._id}>
              <td>
                {m.member?.firstName} {m.member?.lastName}
              </td>
              <td>{m.plan?.name}</td>
              <td>{formatDate(m.startDate)}</td>
              <td>{formatDate(m.endDate)}</td>
              <td>
                <span className={m.status === 'ACTIVE' ? 'tag-active' : 'tag-expired'}>
                  {m.status}
                </span>
              </td>
              <td>
                <button className="btn-danger" onClick={() => handleDelete(m._id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembershipList;
