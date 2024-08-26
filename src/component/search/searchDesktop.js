import { InputBase, Popper, Paper, MenuItem, ListItemText, ClickAwayListener, Grow, CircularProgress, ButtonBase } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import fetchData from '../../utils/fetchData';
import getRandomElements from '../../utils/randomElement';

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchValue, setSearchValue] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const [loading, setLoading] = useState(false);
    const [searchResultsOpen, setSearchResultsOpen] = useState(false);

    const navigate = useNavigate()
    const recentData = useRef([])

    const handleSearchInputChange = (event) => {
        const inputText = event.target.value;
        setSearchQuery(inputText);

        clearTimeout(typingTimeout);

        if (inputText.trim() !== '') {
            if (!/\s\s/.test(inputText)) {
                setLoading(true);
            }
            
            const timeoutId = setTimeout(() => {
                handleSearchApi(inputText);
            }, 300);
            setTypingTimeout(timeoutId);
        } else {
            setSearchResultsOpen(false);
            setLoading(false);
            setSearchValue([]);
        }

        setSearchResultsOpen(!!inputText);
        setAnchorEl(event.currentTarget);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResultsOpen(false);
    };

    const handleSearchResultsClose = () => {
        setSearchResultsOpen(false);
    };

    const handleShowSearchWhenClick = (event) => {
        const inputText = event.target.value;
        if (inputText?.trim() !== '') {
            setSearchResultsOpen(true);
        }
    }

    const handleSearchApi = async (inputText) => {
        const regex = /\s\s/;
        try {
            if (!regex.test(inputText)) {
                const data = await fetchData('get', 'user', 'getdata');
                const dataFilter = data.filter(item => item.title.toLowerCase().includes(inputText.toLowerCase().trim()))
                const dataRandom = getRandomElements(dataFilter, 10, true)
                setSearchValue(dataRandom);
                recentData.current = dataRandom
                setLoading(false);
            } else {
                setSearchValue(recentData.current)
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleFindMovie = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/movie-search/${searchQuery}`, { state: searchValue })
        }
    }

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <SearchIcon
                sx={{ color: 'text.secondary', fontSize: '1.4rem', position: 'relative', right: '-28px', top: '7px', zIndex: 1, cursor: 'pointer' }}
                onClick={handleFindMovie}
            />
            <InputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                sx={{
                    pl: '2rem',
                    pr: '10px',
                    bgcolor: 'white',
                    border: 'none',
                    borderRadius: 1,
                    '& input': {
                        px: 0,
                        bgcolor: 'transparent',
                        border: 'none',
                        width: '100%',
                        py: '0.5rem',
                        pr: 4
                    },
                }}
                value={searchQuery}
                onChange={handleSearchInputChange}
                onClick={handleShowSearchWhenClick}
            />
            {searchQuery && (
                <div style={{ position: 'absolute', right: 10, top: 8.5, color: 'black' }}>
                    {loading ? ( // Kiểm tra trạng thái loading để hiển thị biểu tượng loading hoặc biểu tượng X
                        <CircularProgress size={20} sx={{ marginTop: 0.2 }} />
                    ) : (
                        <ClearIcon onClick={handleClearSearch} />
                    )}
                </div>
            )}
            <Popper
                open={searchResultsOpen}
                anchorEl={anchorEl}
                role={undefined}
                transition
                disablePortal
                style={{
                    width: '91.5%',
                    zIndex: 2,
                }}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [10, 5],
                        },
                    },
                ]}
                placement="bottom-end"
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleSearchResultsClose}>
                        <Grow {...TransitionProps}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                                {searchValue.map((item, index) => (
                                    <MenuItem key={index} onClick={handleSearchResultsClose}>
                                        <ListItemText components={ButtonBase}
                                            primary={item.title}
                                            primaryTypographyProps={{ style: { textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                            onClick={() => navigate(`/movie/${item.title}`)}
                                        />
                                    </MenuItem>
                                ))}
                            </Paper>
                        </Grow>
                    </ClickAwayListener>
                )}
            </Popper>
        </div>
    );
};

export default SearchInput;
