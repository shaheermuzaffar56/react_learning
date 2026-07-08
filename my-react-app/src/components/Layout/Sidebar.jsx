import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { categories } from '../../features/products/data'

function Sidebar() {
  const { selectedCategory, setSelectedCategory } = useAppContext();

  return (
    <nav style={{ width: '200px', padding: '10px', backgroundColor: '#f0f0f0' }}>
      <p><strong>NAVIGATION</strong></p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">Admin Manager</Link></li>
        <li>Deals</li>
        <li>Profile</li>
        <li>Contact</li>
        <li>Settings</li>
      </ul>

      <p><strong>CATEGORIES</strong></p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <button onClick={() => setSelectedCategory(null)}>
            {selectedCategory === null ? '✅ ' : ''}All
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => setSelectedCategory(category.id)}>
              {selectedCategory === category.id ? '✅ ' : ''}{category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Sidebar;