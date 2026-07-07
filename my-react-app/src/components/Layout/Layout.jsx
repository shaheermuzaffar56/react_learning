import { Outlet } from 'react-router-dom'
import { AppProvider } from '../../context/AppContext'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import CartPanel from './CartPanel'

function Layout() {
  return (
    <AppProvider>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Navbar />
          <div style={{ padding: '16px' }}>
            <Outlet />
          </div>
        </div>
        <CartPanel />
      </div>
    </AppProvider>
  );
}
export default Layout;