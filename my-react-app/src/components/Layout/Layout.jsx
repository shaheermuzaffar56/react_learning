import { Outlet } from 'react-router-dom'
import { AppProvider } from '../../context/AppContext'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import CartPanel from './CartPanel'

function Layout() {
  return (
    <AppProvider>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <div style={{ overflowY: 'auto' }}>
          <Sidebar />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Navbar />
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <Outlet />
          </div>
        </div>

        <div style={{ overflowY: 'auto' }}>
          <CartPanel />
        </div>
      </div>
    </AppProvider>
  );
}
export default Layout;