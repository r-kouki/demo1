const Navbar = ({ onChangeView }) => {
  return (
    <header className="navbar">
      <h1 className="navbar-title">GymTrack</h1>
      <nav className="navbar-links">
        <button onClick={() => onChangeView('members')}>Adhérents</button>
        <button onClick={() => onChangeView('plans')}>Plans</button>
        <button onClick={() => onChangeView('memberships')}>Abonnements</button>
        <button onClick={() => onChangeView('stats')}>Statistiques</button>
      </nav>
    </header>
  );
};

export default Navbar;
