import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Avatar,
    Typography,
    Container,
    Menu,
    MenuItem,
    ListItemText,
    Box
} from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import picture from '../../picture';
import SearchInput from '../search/searchDesktop';

const categories = {
    'Phim mới': [],
    'Phim lẻ': [],
    'Phim Bộ': [],
    'Phim Rạp': [],
    'Thể loại': ['acbs', 'acb', 'acb', 'acb', 'acb', 's'],
};

const HeaderDesktop = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // Thêm state để theo dõi category đang được chọn
    const navigate = useNavigate();

    const handleClick = (event, category) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategory(category);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOutsideClick = (event) => {
        if (anchorEl && !anchorEl.contains(event.target)) {
            handleClose();
        }
    };

    const handleFindMovie = (category, items) => {
        if (items.length === 0) {
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
    }

    return (
        <AppBar position="fixed" sx={{ flexGrow: 1, backgroundColor: '#f68084' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} onClick={handleOutsideClick}>
                <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="Logo" src={picture.pic1} sx={{ width: 35, height: 35, mr: 1 }} />
                        <Typography variant="body1"
                            sx={{
                                fontSize: '30px',
                                fontWeight: 'bold',
                                background: 'linear-gradient(162deg, #42d392, #647eff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mr: 2
                            }}
                        >
                            BPXX
                        </Typography>
                        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            {Object.entries(categories).map(([category, items], index) => (
                                <div key={index} style={{ marginLeft: index !== 0 ? 8 : 0 }} onClick={(e) => handleClick(e, category)}>
                                    <Typography
                                        sx={{
                                            color: 'inherit',
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginRight: items.length === 0 ? '10px' : 0
                                        }}
                                        onClick={() => handleFindMovie(category, items)}
                                    >
                                        {category}
                                        {items.length > 0 && <ArrowDropDownIcon />}
                                    </Typography>
                                    {items.length > 0 && selectedCategory === category && ( // Chỉ hiển thị menu khi items không rỗng và category đang được chọn
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            getContentAnchorEl={null}
                                        >
                                            <MenuItem sx={{ padding: 0 }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        maxWidth: '500px',
                                                    }}
                                                >
                                                    {items.map((item, itemIndex) => (
                                                        <Box key={itemIndex} sx={{ width: '33.3%' }}>
                                                            <MenuItem>
                                                                <ListItemText
                                                                    onClick={() => console.log(item)}
                                                                    primary={item}
                                                                    primaryTypographyProps={{ style: { textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                                                />
                                                            </MenuItem>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </MenuItem>
                                        </Menu>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <SearchInput />
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderDesktop;
