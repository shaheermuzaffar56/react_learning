import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { categories } from '../../features/products/data'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

function Sidebar() {
  const { selectedCategory, setSelectedCategory } = useAppContext();
  const location = useLocation();

  return (
    <Box sx={{ width: 200, p: 1.5, bgcolor: '#f0f0f0' }}>
      <Typography variant="overline" fontWeight="bold">Navigation</Typography>
      <List dense>
        <ListItemButton component={Link} to="/" selected={location.pathname === '/'}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin" selected={location.pathname === '/admin'}>
          <ListItemText primary="Admin Manager" />
        </ListItemButton>
        <ListItemButton component={Link} to="/students" selected={location.pathname === '/students'}>
          <ListItemText primary="Students Manager" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Contact" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>

      <Divider sx={{ my: 1.5 }} />

      <Typography variant="overline" fontWeight="bold">Categories</Typography>
      <List dense>
        <ListItemButton
          selected={selectedCategory === null}
          onClick={() => setSelectedCategory(null)}
        >
          <ListItemText primary="All" />
        </ListItemButton>
        {categories.map((category) => (
          <ListItemButton
            key={category.id}
            selected={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            <ListItemText primary={category.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
export default Sidebar;