import { InputBase, IconButton, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, CircularProgress } from '@mui/material';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import fetchData from '../../utils/fetchData';
import getRandomElements from '../../utils/randomElement';

const SearchDrawerInput = ({ toggleSearch }) => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('');

    const [loading, setLoading] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const recentData = useRef([])
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        const inputText = event.target.value;

        setSearchText(inputText);
        clearTimeout(timeoutId);

        const id = setTimeout(() => {
            if (inputText.trim() !== '') {
                handleSearchApi(inputText);
            }
        }, 300);

        if (inputText.trim() === '') {
            setSearchResults([])
        }

        setTimeoutId(id);
    };

    const handleSearchApi = async (inputText) => {
        try {
            const regex = /\s\s/;
            if (!regex.test(inputText)) {
                setLoading(true);

                const data = await fetchData('get', 'user', 'getdata');
                const dataFilter = data.filter(item => item.title.toLowerCase().includes(inputText.toLowerCase().trim()))
                const dataRandom = getRandomElements(dataFilter, 10, true)

                setSearchResults(dataRandom);
                recentData.current = dataRandom
            } else {
                setSearchResults(recentData.current)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const clearSearch = () => {
        setSearchText('');
        setSearchResults([]);
    };

    return (
        <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <InputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={handleSearchChange}
                fullWidth
                autoFocus
                endAdornment={
                    <Box sx={{ position: 'absolute', right: '4px', display: 'flex', alignItems: 'center' }}>
                        {loading ? (
                            <CircularProgress size={24} sx={{ marginRight: '8px' }} />
                        ) : (
                            searchText && (
                                <IconButton onClick={clearSearch} sx={{ p: '8px' }}>
                                    <CloseIcon sx={{ color: 'red' }} />
                                </IconButton>
                            )
                        )}
                    </Box>
                }
                startAdornment={
                    <IconButton sx={{ mr: 1 }} disabled={loading}>
                        <SearchIcon />
                    </IconButton>
                }
            />
            <Divider sx={{ mt: 2, mb: searchResults.length > 0 ? 0 : 2 }} />
            <List sx={{ flexGrow: 1 }}>
                {searchResults.map((item, index) => (
                    <ListItem button key={index} onClick={() => navigate(`/movie/${item.title}`)}>
                        <ListItemAvatar>
                            <Avatar
                                alt={String(index)}
                                src={item.imageInfo.url}
                                sx={{ width: 60, height: 60, mr: 2, mt: 1 }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.title}
                            primaryTypographyProps={{
                                style: {
                                    maxWidth: '80%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {searchResults.length === 0 && !loading && (
                    <Divider sx={{ flexGrow: 1 }} />
                )}
                <IconButton onClick={toggleSearch} sx={{ ml: 1 }}>
                    <CloseIcon sx={{ color: 'red' }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default SearchDrawerInput;
