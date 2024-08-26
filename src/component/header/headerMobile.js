import { AppBar, Toolbar, IconButton, Avatar, Drawer, List, ListItem, ListItemText, Box, Collapse, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import{ useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchDrawerInput from '../search/searchMobile';
import picture from '../../picture';

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState({});
    const navigate = useNavigate();

    const categories = {
        'Phim mới': [],
        'Phim lẻ': [],
        'Phim Bộ': [],
        'Thể loại': ['acbs', 'acb', 'acb', 'acb', 'acb', 's'],
    };

    const tiny = useMediaQuery('(max-width:375px)');

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSubMenuClick = (category) => {
        setOpenSubMenu(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    return (
        <>
            <AppBar position="fixed" sx={{ bgcolor: '#f68084' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 1 }}>
                            <MenuIcon />
                        </IconButton>
                        <Avatar alt="Logo" src={picture.pic1} sx={{ width: 35, height: 35, mr: 1 }} />
                        <Typography variant="body1" sx={{ fontSize: '30px', fontWeight: 'bold', background: 'linear-gradient(162deg, #42d392, #647eff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BPXX</Typography>
                    </Box>
                    <IconButton color="inherit" onClick={toggleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer}
                sx={{ '& .MuiDrawer-paper': { width: tiny ? '75%' : '60%' } }}
            >
                <List>
                    {Object.entries(categories).map(([category, subitems]) => (
                        <div key={category}>
                            <ListItem button onClick={() => handleSubMenuClick(category)} sx={{ transition: 'background-color 0.3s' }}>
                                <ListItemText
                                    primary={category}
                                    sx={{ fontWeight: 'bold' }}
                                    onClick={() => {
                                        if (subitems.length === 0) {
                                            switch (category) {
                                                case 'Phim lẻ':
                                                    navigate('/phim-le');
                                                    break;
                                                case 'Phim Bộ':
                                                    navigate('/phim-bo');
                                                    break;
                                                case 'Phim Rạp':
                                                    navigate('/phim-rap');
                                                    break;
                                                default:
                                                    navigate('/');
                                                    break;
                                            }
                                        }
                                    }}
                                />
                                {subitems.length > 0 ? (openSubMenu[category] ? <ExpandLess /> : <ExpandMore />) : null}
                            </ListItem>
                            {subitems.length > 0 && (
                                <Collapse in={openSubMenu[category]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {subitems.map((subitem, index) => (
                                            <ListItem button key={index} sx={{ pl: 4, transition: 'background-color 0.3s' }}>
                                                <ListItemText primary={subitem} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </div>
                    ))}
                </List>
            </Drawer>
            <Drawer
                anchor="right"
                open={isSearchOpen}
                onClose={toggleSearch}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{ '& .MuiDrawer-paper': { width: '100%' } }}
            >
                <SearchDrawerInput toggleSearch={toggleSearch} />
            </Drawer>
        </>
    );
};

export default Header;
