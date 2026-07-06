import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <div className="container">
      <nav style={{backgroundColor:"skyblue",padding:"10px"}}>
        {/* <Link to="/">Products</Link> */}
        <Link to="/students">Student Manager</Link>
      </nav>
      <Outlet />
    </div>
  );
}
export default Layout;