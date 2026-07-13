import { useAppContext } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

function Navbar() {
  const { searchTerm, setSearchTerm, cartItems } = useAppContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <AppBar position="static" color="default" sx={{ bgcolor: '#e0e0e0' }}>
      <Toolbar sx={{ gap: 1.5 }}>
        <InputBase
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, bgcolor: 'white', px: 1.5, borderRadius: 1 }}
        />
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <Badge badgeContent={cartItems?.length || 0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        {user ? (
          <Button variant="outlined" size="small" onClick={handleLogout}>
            Logout ({user.displayName})
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;