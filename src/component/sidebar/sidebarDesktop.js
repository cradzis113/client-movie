// SidebarDesktop.js
import { Divider, Drawer, List, ListItem, Box, ListItemText, Avatar, Typography, ListItemIcon, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactIcon from '@mui/icons-material/ContactMail';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

const drawerWidth = 240;

function SidebarDesktop() {
  const items = [
    { text: "Dashboard", icon: <DashboardCustomizeOutlinedIcon />, slug: "dashboard" },
    { text: "Catalog", icon: <ContactIcon />, slug: "catalog" },
    { text: "Add", icon: <LibraryAddIcon />, slug: "add-item" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      anchor="left"
    >
      <Box p={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'}>
          <Avatar src='https://static2.hentai-img.com/upload/20160608/67/67954/p=700/6.jpg' />
          <Box ml={2}>
            <Typography variant='subtitle2'>Admin</Typography>
            <Typography variant='body1'>Khánh</Typography>
          </Box>
        </Box>
        <LogoutIcon />
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} direction="column">
          {items.map((item, index) => (
            <Grid item key={index} xs={12}>
              <ListItem button component={Link} to={`/admin/${item.slug}`}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>
    </Drawer>
  );
}

export default SidebarDesktop;
