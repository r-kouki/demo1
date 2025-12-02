import { useEffect, useState } from 'react';
import { getOverviewStats } from '../services/api';

const StatsOverview = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getOverviewStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="card">
        <p>Chargement des statistiques...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Vue d&apos;ensemble</h2>
      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">Adhérents</span>
          <span className="stat-value">{stats.totalMembers}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Plans</span>
          <span className="stat-value">{stats.totalPlans}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Abonnements actifs</span>
          <span className="stat-value">{stats.activeMemberships}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Abonnements expirés</span>
          <span className="stat-value">{stats.expiredMemberships}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Revenu mensuel estimé (€)</span>
          <span className="stat-value">{stats.monthlyRevenue}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
