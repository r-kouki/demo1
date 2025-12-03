import { useState } from 'react';
import { createMember } from '../services/api';

const MemberForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMember({ firstName, lastName, phone, email });
      setMessage('Adhérent créé avec succès');
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      window.dispatchEvent(new Event('members:refresh'));
    } catch (error) {
      setMessage("Erreur lors de l'enregistrement");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Ajouter un adhérent</h3>
      {message && <p className="info">{message}</p>}
      <div className="form-group">
        <label>Prénom</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Nom</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Téléphone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit" className="btn-primary">
        Enregistrer
      </button>
    </form>
  );
};

export default MemberForm;
