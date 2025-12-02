import { useEffect, useState } from 'react';
import { getMembers, deleteMember, updateMember } from '../services/api';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const data = await getMembers();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
    const refreshHandler = () => fetchMembers();
    window.addEventListener('members:refresh', refreshHandler);
    return () => window.removeEventListener('members:refresh', refreshHandler);
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Supprimer cet adhérent ?');
    if (!confirmDelete) return;
    await deleteMember(id);
    fetchMembers();
  };

  const handleEdit = async (member) => {
    // Edition très simple via prompt pour rester dans l'esprit TP
    const firstName = window.prompt('Prénom', member.firstName) || member.firstName;
    const lastName = window.prompt('Nom', member.lastName) || member.lastName;
    const phone = window.prompt('Téléphone', member.phone) || member.phone;
    const email = window.prompt('Email', member.email || '') || member.email;
    await updateMember(member._id, { firstName, lastName, phone, email });
    fetchMembers();
  };

  return (
    <div className="card">
      <h2 className="card-title">Liste des adhérents</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td>
                {m.firstName} {m.lastName}
              </td>
              <td>{m.phone}</td>
              <td>{m.email}</td>
              <td>
                <button className="btn-secondary" onClick={() => handleEdit(m)}>
                  Modifier
                </button>
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

export default MemberList;
