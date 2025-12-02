import { useState } from 'react';
import { createPlan } from '../services/api';

const PlanForm = () => {
  const [name, setName] = useState('');
  const [durationMonths, setDurationMonths] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlan({
        name,
        durationMonths: Number(durationMonths),
        price: Number(price),
        description,
      });
      setMessage('Plan créé avec succès');
      setName('');
      setDurationMonths('');
      setPrice('');
      setDescription('');
      window.dispatchEvent(new Event('plans:refresh'));
    } catch (error) {
      setMessage('Erreur lors de la création du plan');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Ajouter un plan</h3>
      {message && <p className="info">{message}</p>}
      <div className="form-group">
        <label>Nom</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Durée (mois)</label>
        <input
          type="number"
          value={durationMonths}
          onChange={(e) => setDurationMonths(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Prix (€)</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit" className="btn-primary">
        Enregistrer
      </button>
    </form>
  );
};

export default PlanForm;
