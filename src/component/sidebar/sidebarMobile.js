import React, { useRef } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, Box, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactIcon from '@mui/icons-material/ContactMail';
import CloseIcon from '@mui/icons-material/Close'; 
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

const drawerWidth = 240;

function Sidebar({ open, onClose }) {
    const drawerRef = useRef(null); 

    const items = [
        { text: "Services", icon: <DashboardCustomizeOutlinedIcon />, slug: "services" },
        { text: "Contact", icon: <ContactIcon />, slug: "contact" },
        { text: "Add", icon: <LibraryAddIcon />, slug: "add-item" },
    ];

    const handleClick = (event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            onClose();
        }
    };

    return (
        <Drawer
            ref={drawerRef} 
            variant="temporary"
            anchor="left"
            open={open}
            onClose={onClose}
            onClick={handleClick} 
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
        >
            <Box p={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box display={'flex'} alignItems={'center'}>
                    <Avatar src='https://static2.hentai-img.com/upload/20160608/67/67954/p=700/6.jpg' />
                    <Box ml={2}>
                        <Typography variant='subtitle2'>Admin</Typography>
                        <Typography variant='body1'>Khánh</Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose}>
                    <LogoutIcon />
                </IconButton>
            </Box>
            <Divider />
            <List sx={{ flexGrow: 1 }}>
                {items.map((item, index) => (
                    <ListItem button key={index} component={Link} to={`/admin/${item.slug}`} onClick={onClose}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

function SidebarMobile() {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MyApp
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 2 }}
                        onClick={toggleSidebar}
                    >
                        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </React.Fragment>
    );
}

export default SidebarMobile;
