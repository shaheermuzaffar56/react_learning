import { useAppContext } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { searchTerm, setSearchTerm } = useAppContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: '#e0e0e0' }}>
      <input
        className="search-bar"
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: 1 }}
      />
      <span>🔔</span>
      <span>🛒</span>
      {user ? (
        <button onClick={handleLogout}>Logout ({user.displayName})</button>
      ) : (
        <span>👤</span>
      )}
    </div>
  );
}
export default Navbar;