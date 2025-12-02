import { useState } from 'react';
import Navbar from './components/Navbar';
import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';
import PlanForm from './components/PlanForm';
import PlanList from './components/PlanList';
import MembershipForm from './components/MembershipForm';
import MembershipList from './components/MembershipList';
import StatsOverview from './components/StatsOverview';

function App() {
  const [view, setView] = useState('members');

  const renderView = () => {
    if (view === 'members') {
      return (
        <>
          <MemberForm />
          <MemberList />
        </>
      );
    }
    if (view === 'plans') {
      return (
        <>
          <PlanForm />
          <PlanList />
        </>
      );
    }
    if (view === 'memberships') {
      return (
        <>
          <MembershipForm />
          <MembershipList />
        </>
      );
    }
    if (view === 'stats') {
      return <StatsOverview />;
    }
    return <MemberList />;
  };

  return (
    <div>
      <Navbar onChangeView={setView} />
      <main className="container">{renderView()}</main>
    </div>
  );
}

export default App;
