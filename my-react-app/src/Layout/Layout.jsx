import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <div className="container">
      <nav>
        <Link to="/">Products</Link>
        <Link to="/students">Student Manager</Link>
      </nav>
      <Outlet />
    </div>
  );
}
export default Layout;