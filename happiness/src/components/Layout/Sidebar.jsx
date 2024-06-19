import { useTranslation } from 'react-i18next';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from 'react-router-dom';

const Sidebar = ({ open }) => {
  const {t} = useTranslation();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/" sx={{ px: 2.5 }}>
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={t('first_sidebarItem')} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/items" sx={{ px: 2.5 }}>
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto' }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary={t('second_sidebarItem')} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Sidebar;
