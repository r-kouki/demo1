import { useEffect, useState } from 'react';
import { getPlans, deletePlan, updatePlan } from '../services/api';

const PlanList = () => {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    const data = await getPlans();
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
    const refreshHandler = () => fetchPlans();
    window.addEventListener('plans:refresh', refreshHandler);
    return () => window.removeEventListener('plans:refresh', refreshHandler);
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Supprimer ce plan ?');
    if (!confirmDelete) return;
    try {
      await deletePlan(id);
      fetchPlans();
    } catch (error) {
      window.alert('Ce plan est utilisé par un abonnement.');
    }
  };

  const handleEdit = async (plan) => {
    const name = window.prompt('Nom', plan.name) || plan.name;
    const durationMonths =
      Number(window.prompt('Durée (mois)', plan.durationMonths)) || plan.durationMonths;
    const price = Number(window.prompt('Prix', plan.price)) || plan.price;
    const description = window.prompt('Description', plan.description || '') || plan.description;
    await updatePlan(plan._id, { name, durationMonths, price, description });
    fetchPlans();
  };

  return (
    <div className="card">
      <h2 className="card-title">Plans d&apos;abonnement</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Durée (mois)</th>
            <th>Prix (€)</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.durationMonths}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                <button className="btn-secondary" onClick={() => handleEdit(p)}>
                  Modifier
                </button>
                <button className="btn-danger" onClick={() => handleDelete(p._id)}>
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

export default PlanList;
